import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {LABOBO_CHARACTERS, LaboboCharacter, User} from '../App';
import CharacterCard from '../components/CharacterCard';
import {triggerButtonHaptic, playButtonSound} from '../utils/FeedbackUtils';

const {width} = Dimensions.get('window');

interface HomeScreenProps {
  route: {
    params: {
      user: User | null;
      setUser: (user: User | null) => void;
      isCharacterUnlocked: (id: number) => boolean;
      updateUnlockedCharacters: (id: number) => void;
    };
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({route}) => {
  const navigation = useNavigation();
  const {user, setUser, isCharacterUnlocked, updateUnlockedCharacters} = route.params;
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleCharacterPress = async (character: LaboboCharacter) => {
    triggerButtonHaptic();
    playButtonSound();
    
    if (!user) {
      Alert.alert(
        'تسجيل الدخول مطلوب',
        'يجب تسجيل الدخول أولاً للوصول إلى شخصيات لابوبو',
        [
          {
            text: 'إلغاء',
            style: 'cancel',
          },
          {
            text: 'تسجيل الدخول',
            onPress: () => signInWithGoogle(),
          },
        ],
      );
      return;
    }

    if (isCharacterUnlocked(character.id)) {
      // Navigate to coloring screen
      navigation.navigate('Coloring', {character, user});
    } else {
      // Navigate to payment screen
      navigation.navigate('Payment', {character, user});
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsSigningIn(true);
      triggerButtonHaptic();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      const userData: User = {
        id: userInfo.user.id,
        name: userInfo.user.name || 'مستخدم',
        email: userInfo.user.email,
      };

      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      
      playSuccessSound();
      Alert.alert('تم تسجيل الدخول بنجاح', `مرحباً ${userData.name}!`);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('خطأ', 'فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOut = async () => {
    try {
      triggerButtonHaptic();
      await GoogleSignin.signOut();
      setUser(null);
      await AsyncStorage.removeItem('user');
      Alert.alert('تم تسجيل الخروج بنجاح');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const renderCharacterCard = (character: LaboboCharacter) => {
    const isUnlocked = isCharacterUnlocked(character.id);
    
    return (
      <CharacterCard
        key={character.id}
        character={character}
        isUnlocked={isUnlocked}
        onPress={handleCharacterPress}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>تلوين لابوبو</Text>
        <View style={styles.userSection}>
          {user ? (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>مرحباً {user.name}</Text>
              <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
                <Icon name="logout" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.signInButton}
              onPress={signInWithGoogle}
              disabled={isSigningIn}>
              <Icon name="login" size={20} color="#fff" />
              <Text style={styles.signInText}>
                {isSigningIn ? 'جاري التسجيل...' : 'تسجيل الدخول'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Characters Grid */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.charactersGrid}>
          {LABOBO_CHARACTERS.map(renderCharacterCard)}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          اختر شخصية لابوبو المفضلة لديك وابدأ التلوين!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  header: {
    backgroundColor: '#FF6B9D',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  userSection: {
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  signOutButton: {
    padding: 5,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  charactersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  characterCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lockedCard: {
    opacity: 0.7,
  },
  characterImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  characterImage: {
    width: 80,
    height: 80,
    backgroundColor: '#FFE5F0',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF6B9D',
  },
  characterNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B9D',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  lockedText: {
    fontSize: 12,
    color: '#FF6B9D',
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#FF6B9D',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen; 