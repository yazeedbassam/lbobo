import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Screens
import HomeScreen from './screens/HomeScreen';
import ColoringScreen from './screens/ColoringScreen';
import PaymentScreen from './screens/PaymentScreen';
import UnlockScreen from './screens/UnlockScreen';

// Utils
import {initializeSounds, cleanupSounds} from './utils/FeedbackUtils';

// Components
import LoadingSpinner from './components/LoadingSpinner';

// Types
export interface LaboboCharacter {
  id: number;
  name: string;
  isLocked: boolean;
  imageUrl: string;
  previewUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

const Stack = createStackNavigator();

// Labobo Characters Data
export const LABOBO_CHARACTERS: LaboboCharacter[] = [
  {
    id: 1,
    name: 'لابوبو السعيد',
    isLocked: false,
    imageUrl: 'labobo_happy',
    previewUrl: 'labobo_happy_preview',
  },
  {
    id: 2,
    name: 'لابوبو النائم',
    isLocked: false,
    imageUrl: 'labobo_sleepy',
    previewUrl: 'labobo_sleepy_preview',
  },
  {
    id: 3,
    name: 'لابوبو المشاكس',
    isLocked: false,
    imageUrl: 'labobo_mischievous',
    previewUrl: 'labobo_mischievous_preview',
  },
  {
    id: 4,
    name: 'لابوبو الفضولي',
    isLocked: false,
    imageUrl: 'labobo_curious',
    previewUrl: 'labobo_curious_preview',
  },
  {
    id: 5,
    name: 'لابوبو اللطيف',
    isLocked: false,
    imageUrl: 'labobo_cute',
    previewUrl: 'labobo_cute_preview',
  },
  {
    id: 6,
    name: 'لابوبو البطل',
    isLocked: true,
    imageUrl: 'labobo_hero',
    previewUrl: 'labobo_hero_preview',
  },
  {
    id: 7,
    name: 'لابوبو المغامر',
    isLocked: true,
    imageUrl: 'labobo_adventurer',
    previewUrl: 'labobo_adventurer_preview',
  },
  {
    id: 8,
    name: 'لابوبو الساحر',
    isLocked: true,
    imageUrl: 'labobo_magician',
    previewUrl: 'labobo_magician_preview',
  },
  {
    id: 9,
    name: 'لابوبو الطيار',
    isLocked: true,
    imageUrl: 'labobo_pilot',
    previewUrl: 'labobo_pilot_preview',
  },
  {
    id: 10,
    name: 'لابوبو الملك',
    isLocked: true,
    imageUrl: 'labobo_king',
    previewUrl: 'labobo_king_preview',
  },
];

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [unlockedCharacters, setUnlockedCharacters] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeApp();
    initializeSounds();
    
    return () => {
      cleanupSounds();
    };
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize Google Sign-In
      GoogleSignin.configure({
        webClientId: 'YOUR_WEB_CLIENT_ID', // سيتم تحديثه لاحقاً
        offlineAccess: true,
      });

      // Load user data from storage
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }

      // Load unlocked characters
      const unlocked = await AsyncStorage.getItem('unlockedCharacters');
      if (unlocked) {
        setUnlockedCharacters(JSON.parse(unlocked));
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing app:', error);
      setIsLoading(false);
    }
  };

  const updateUnlockedCharacters = async (characterId: number) => {
    try {
      const newUnlocked = [...unlockedCharacters, characterId];
      setUnlockedCharacters(newUnlocked);
      await AsyncStorage.setItem('unlockedCharacters', JSON.stringify(newUnlocked));
    } catch (error) {
      console.error('Error updating unlocked characters:', error);
    }
  };

  const isCharacterUnlocked = (characterId: number): boolean => {
    return !LABOBO_CHARACTERS.find(char => char.id === characterId)?.isLocked || 
           unlockedCharacters.includes(characterId);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <LoadingSpinner message="جاري تحميل تطبيق تلوين لابوبو..." />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF6B9D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'تلوين لابوبو',
            headerShown: false,
          }}
          initialParams={{
            user,
            setUser,
            isCharacterUnlocked,
            updateUnlockedCharacters,
          }}
        />
        <Stack.Screen
          name="Coloring"
          component={ColoringScreen}
          options={{
            title: 'التلوين',
            headerBackTitle: 'رجوع',
          }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            title: 'شراء الشخصية',
            headerBackTitle: 'رجوع',
          }}
        />
        <Stack.Screen
          name="Unlock"
          component={UnlockScreen}
          options={{
            title: 'فك القفل',
            headerBackTitle: 'رجوع',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FF6B9D',
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App; 