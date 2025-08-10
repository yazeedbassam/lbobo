import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';

import {LaboboCharacter, User} from '../App';

interface PaymentScreenProps {
  route: {
    params: {
      character: LaboboCharacter;
      user: User;
    };
  };
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({route}) => {
  const navigation = useNavigation();
  const {character, user} = route.params;
  const [isCopied, setIsCopied] = useState(false);

  const IBAN = 'JO52ARAB1940000000194402309601';
  const WHATSAPP_NUMBER = '00962776619258';
  const AMOUNT = '10';

  const copyToClipboard = (text: string, type: string) => {
    Clipboard.setString(text);
    setIsCopied(true);
    Alert.alert('تم النسخ', `تم نسخ ${type} إلى الحافظة`);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const openWhatsApp = () => {
    const message = `مرحباً، أريد شراء شخصية لابوبو رقم ${character.id} (${character.name}) للمستخدم ${user.name}`;
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

  const handlePaymentComplete = () => {
    Alert.alert(
      'تم إرسال طلب الدفع',
      'بعد إتمام عملية الدفع، سيتم إرسال رمز فك القفل عبر واتساب',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'فك القفل',
          onPress: () => navigation.navigate('Unlock', {character, user}),
        },
      ],
    );
  };

  const renderPaymentInfo = () => (
    <View style={styles.paymentInfo}>
      <View style={styles.infoCard}>
        <Icon name="account-balance" size={32} color="#FF6B9D" />
        <Text style={styles.infoTitle}>معلومات الحساب البنكي</Text>
        <Text style={styles.infoText}>اسم الحساب: كليك</Text>
        <Text style={styles.infoText}>رقم الحساب: {IBAN}</Text>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => copyToClipboard(IBAN, 'رقم الحساب')}>
          <Icon name="content-copy" size={20} color="#fff" />
          <Text style={styles.copyButtonText}>نسخ رقم الحساب</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Icon name="attach-money" size={32} color="#FF6B9D" />
        <Text style={styles.infoTitle}>المبلغ المطلوب</Text>
        <Text style={styles.amountText}>{AMOUNT} دولار أمريكي</Text>
        <Text style={styles.infoText}>
          مقابل فك قفل شخصية {character.name}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Icon name="whatsapp" size={32} color="#25D366" />
        <Text style={styles.infoTitle}>التواصل عبر واتساب</Text>
        <Text style={styles.infoText}>رقم الواتساب: {WHATSAPP_NUMBER}</Text>
        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={openWhatsApp}>
          <Icon name="whatsapp" size={20} color="#fff" />
          <Text style={styles.whatsappButtonText}>فتح واتساب</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderInstructions = () => (
    <View style={styles.instructions}>
      <Text style={styles.instructionsTitle}>خطوات الدفع:</Text>
      <View style={styles.step}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>1</Text>
        </View>
        <Text style={styles.stepText}>
          قم بتحويل {AMOUNT} دولار إلى الحساب البنكي المذكور أعلاه
        </Text>
      </View>
      
      <View style={styles.step}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>2</Text>
        </View>
        <Text style={styles.stepText}>
          التقط صورة من إيصال التحويل
        </Text>
      </View>
      
      <View style={styles.step}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>3</Text>
        </View>
        <Text style={styles.stepText}>
          أرسل الصورة عبر واتساب مع اسم المستخدم: {user.name}
        </Text>
      </View>
      
      <View style={styles.step}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>4</Text>
        </View>
        <Text style={styles.stepText}>
          ستستلم رمز فك القفل عبر واتساب
        </Text>
      </View>
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
        <Text style={styles.headerTitle}>شراء {character.name}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Character Preview */}
        <View style={styles.characterPreview}>
          <View style={styles.characterImage}>
            <Text style={styles.characterNumber}>{character.id}</Text>
          </View>
          <Text style={styles.characterName}>{character.name}</Text>
          <Text style={styles.characterStatus}>شخصية مدفوعة</Text>
        </View>

        {/* Payment Information */}
        {renderPaymentInfo()}

        {/* Instructions */}
        {renderInstructions()}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handlePaymentComplete}>
            <Icon name="check-circle" size={24} color="#fff" />
            <Text style={styles.completeButtonText}>تم إتمام الدفع</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.unlockButton}
            onPress={() => navigation.navigate('Unlock', {character, user})}>
            <Icon name="lock-open" size={24} color="#fff" />
            <Text style={styles.unlockButtonText}>فك القفل</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  characterPreview: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 15,
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
  characterImage: {
    width: 80,
    height: 80,
    backgroundColor: '#FFE5F0',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF6B9D',
    marginBottom: 10,
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
  paymentInfo: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
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
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 5,
  },
  copyButton: {
    backgroundColor: '#FF6B9D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  instructions: {
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
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  completeButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 10,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  unlockButton: {
    flex: 1,
    backgroundColor: '#FF6B9D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    marginLeft: 10,
  },
  unlockButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default PaymentScreen; 