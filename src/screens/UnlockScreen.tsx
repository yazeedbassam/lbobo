import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
  Linking,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {LaboboCharacter, User} from '../App';

interface UnlockScreenProps {
  route: {
    params: {
      character: LaboboCharacter;
      user: User;
    };
  };
}

const UnlockScreen: React.FC<UnlockScreenProps> = ({route}) => {
  const navigation = useNavigation();
  const {character, user} = route.params;
  const [unlockCode, setUnlockCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const WHATSAPP_NUMBER = '00962776619258';

  const generateExpectedCode = (): string => {
    // الكود المتوقع: اسم المستخدم + رقم الشخصية + 11
    return `${user.name}${character.id}11`;
  };

  const verifyUnlockCode = () => {
    if (!unlockCode.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال رمز فك القفل');
      return;
    }

    setIsVerifying(true);

    // محاكاة عملية التحقق
    setTimeout(() => {
      const expectedCode = generateExpectedCode();
      
      if (unlockCode.trim() === expectedCode) {
        Alert.alert(
          'تم فك القفل بنجاح!',
          `يمكنك الآن تلوين شخصية ${character.name}`,
          [
            {
              text: 'ابدأ التلوين',
              onPress: () => {
                // هنا يتم تحديث حالة الشخصية كـ مفتوحة
                navigation.navigate('Coloring', {character, user});
              },
            },
          ],
        );
      } else {
        Alert.alert(
          'رمز غير صحيح',
          'الرمز المدخل غير صحيح. يرجى التحقق من الرمز والمحاولة مرة أخرى.',
          [
            {
              text: 'إعادة المحاولة',
              onPress: () => setUnlockCode(''),
            },
            {
              text: 'تواصل معنا',
              onPress: () => openWhatsApp(),
            },
          ],
        );
      }
      setIsVerifying(false);
    }, 1000);
  };

  const openWhatsApp = () => {
    const message = `مرحباً، أحتاج مساعدة في فك قفل شخصية لابوبو رقم ${character.id} (${character.name}) للمستخدم ${user.name}. الرمز المدخل: ${unlockCode}`;
    const whatsappUrl = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          Alert.alert('خطأ', 'تطبيق واتساب غير مثبت على الجهاز');
        }
      })
      .catch((err) => {
        console.error('Error opening WhatsApp:', err);
        Alert.alert('خطأ', 'فشل في فتح واتساب');
      });
  };

  const renderCharacterInfo = () => (
    <View style={styles.characterInfo}>
      <View style={styles.characterImage}>
        <Text style={styles.characterNumber}>{character.id}</Text>
      </View>
      <Text style={styles.characterName}>{character.name}</Text>
      <Text style={styles.characterStatus}>في انتظار فك القفل</Text>
    </View>
  );

  const renderUnlockForm = () => (
    <View style={styles.unlockForm}>
      <Text style={styles.formTitle}>أدخل رمز فك القفل</Text>
      <Text style={styles.formSubtitle}>
        تم إرسال الرمز عبر واتساب بعد إتمام عملية الدفع
      </Text>
      
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#FF6B9D" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          value={unlockCode}
          onChangeText={setUnlockCode}
          placeholder="أدخل الرمز هنا..."
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={50}
        />
      </View>

      <TouchableOpacity
        style={[styles.verifyButton, isVerifying && styles.verifyButtonDisabled]}
        onPress={verifyUnlockCode}
        disabled={isVerifying}>
        <Icon name="lock-open" size={24} color="#fff" />
        <Text style={styles.verifyButtonText}>
          {isVerifying ? 'جاري التحقق...' : 'فك القفل'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderHelpSection = () => (
    <View style={styles.helpSection}>
      <Text style={styles.helpTitle}>هل تحتاج مساعدة؟</Text>
      
      <View style={styles.helpCard}>
        <Icon name="info" size={24} color="#FF6B9D" />
        <Text style={styles.helpText}>
          تأكد من أنك قمت بإتمام عملية الدفع وإرسال صورة الإيصال عبر واتساب
        </Text>
      </View>

      <View style={styles.helpCard}>
        <Icon name="whatsapp" size={24} color="#25D366" />
        <Text style={styles.helpText}>
          الرمز يتم إرساله عبر واتساب بعد التأكد من عملية الدفع
        </Text>
      </View>

      <TouchableOpacity style={styles.contactButton} onPress={openWhatsApp}>
        <Icon name="whatsapp" size={20} color="#fff" />
        <Text style={styles.contactButtonText}>تواصل معنا عبر واتساب</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>فك قفل {character.name}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderCharacterInfo()}
        {renderUnlockForm()}
        {renderHelpSection()}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  characterInfo: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
    marginBottom: 15,
  },
  characterNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B9D',
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  characterStatus: {
    fontSize: 14,
    color: '#FF6B9D',
    fontWeight: '600',
  },
  unlockForm: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 15,
  },
  verifyButton: {
    backgroundColor: '#FF6B9D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
  },
  verifyButtonDisabled: {
    backgroundColor: '#ccc',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  helpSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  helpText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginLeft: 10,
  },
  contactButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default UnlockScreen; 