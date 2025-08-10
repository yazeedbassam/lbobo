import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

interface BrushSizeSelectorProps {
  selectedSize: number;
  onSizeSelect: (size: number) => void;
}

const BRUSH_SIZES = [
  {size: 10, name: 'صغير'},
  {size: 20, name: 'متوسط'},
  {size: 30, name: 'كبير'},
  {size: 40, name: 'كبير جداً'},
];

const BrushSizeSelector: React.FC<BrushSizeSelectorProps> = ({
  selectedSize,
  onSizeSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>حجم الفرشاة</Text>
      <View style={styles.brushContainer}>
        {BRUSH_SIZES.map((brush) => (
          <TouchableOpacity
            key={brush.size}
            style={[
              styles.brushButton,
              selectedSize === brush.size && styles.selectedBrush,
            ]}
            onPress={() => onSizeSelect(brush.size)}
            activeOpacity={0.7}>
            <View
              style={[
                styles.brushPreview,
                {
                  width: brush.size,
                  height: brush.size,
                },
              ]}
            />
            <Text style={[
              styles.brushText,
              selectedSize === brush.size && styles.selectedBrushText,
            ]}>
              {brush.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
    marginBottom: 15,
    textAlign: 'center',
  },
  brushContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  brushButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    minWidth: 70,
  },
  selectedBrush: {
    borderColor: '#FF6B9D',
    backgroundColor: '#FFE5F0',
  },
  brushPreview: {
    backgroundColor: '#333',
    borderRadius: 50,
    marginBottom: 5,
  },
  brushText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  selectedBrushText: {
    color: '#FF6B9D',
    fontWeight: '600',
  },
});

export default BrushSizeSelector; 