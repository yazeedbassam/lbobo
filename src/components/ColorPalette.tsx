import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const COLORS = [
  // Pink/Red Colors
  {name: 'وردي فاتح', value: '#FFB6C1'},
  {name: 'وردي', value: '#FFC0CB'},
  {name: 'وردي غامق', value: '#FF6B9D'},
  {name: 'أحمر وردي', value: '#FF69B4'},
  {name: 'أحمر غامق', value: '#FF1493'},
  
  // Orange/Yellow Colors
  {name: 'أصفر ذهبي', value: '#FFD700'},
  {name: 'برتقالي', value: '#FFA500'},
  {name: 'برتقالي غامق', value: '#FF8C00'},
  {name: 'أحمر برتقالي', value: '#FF6347'},
  {name: 'أحمر برتقالي غامق', value: '#FF4500'},
  
  // Green Colors
  {name: 'أخضر فاتح', value: '#32CD32'},
  {name: 'أخضر', value: '#00FF00'},
  {name: 'أخضر متوسط', value: '#00FA9A'},
  {name: 'أخضر مائل للأزرق', value: '#00CED1'},
  {name: 'أزرق فاتح', value: '#00BFFF'},
  
  // Blue/Purple Colors
  {name: 'أزرق ملكي', value: '#4169E1'},
  {name: 'بنفسجي', value: '#8A2BE2'},
  {name: 'بنفسجي متوسط', value: '#9370DB'},
  {name: 'بنفسجي فاتح', value: '#DDA0DD'},
  {name: 'وردي فاتح', value: '#FFB6C1'},
  
  // Brown Colors
  {name: 'بيج', value: '#F5F5DC'},
  {name: 'بني فاتح', value: '#DEB887'},
  {name: 'بني', value: '#D2691E'},
  {name: 'بني غامق', value: '#8B4513'},
  {name: 'بني داكن', value: '#654321'},
  
  // Gray/White Colors
  {name: 'أبيض', value: '#FFFFFF'},
  {name: 'رمادي فاتح', value: '#F0F0F0'},
  {name: 'رمادي', value: '#D3D3D3'},
  {name: 'رمادي غامق', value: '#A9A9A9'},
  {name: 'رمادي داكن', value: '#696969'},
];

const ColorPalette: React.FC<ColorPaletteProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>اختر اللون</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {COLORS.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorButton,
              {backgroundColor: color.value},
              selectedColor === color.value && styles.selectedColor,
            ]}
            onPress={() => onColorSelect(color.value)}
            activeOpacity={0.7}>
            {selectedColor === color.value && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  colorButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  selectedColor: {
    borderColor: '#FF6B9D',
    borderWidth: 3,
    transform: [{scale: 1.1}],
  },
  checkmark: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FF6B9D',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ColorPalette; 