import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

import {LaboboCharacter, User} from '../App';
import CharacterSVG from '../components/CharacterSVG';
import ColorPalette from '../components/ColorPalette';
import BrushSizeSelector from '../components/BrushSizeSelector';
import {triggerColorHaptic, playColorSound, triggerButtonHaptic, playButtonSound} from '../utils/FeedbackUtils';

const {width, height} = Dimensions.get('window');

interface ColoringScreenProps {
  route: {
    params: {
      character: LaboboCharacter;
      user: User;
    };
  };
}

const COLORS = [
  '#FF6B9D', '#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493',
  '#FFD700', '#FFA500', '#FF8C00', '#FF6347', '#FF4500',
  '#32CD32', '#00FF00', '#00FA9A', '#00CED1', '#00BFFF',
  '#4169E1', '#8A2BE2', '#9370DB', '#DDA0DD', '#FFB6C1',
  '#F5F5DC', '#DEB887', '#D2691E', '#8B4513', '#654321',
  '#FFFFFF', '#F0F0F0', '#D3D3D3', '#A9A9A9', '#696969',
];

const ColoringScreen: React.FC<ColoringScreenProps> = ({route}) => {
  const navigation = useNavigation();
  const {character, user} = route.params;
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(20);
  const [isColoring, setIsColoring] = useState(false);
  const [coloredAreas, setColoredAreas] = useState<{[key: string]: string}>({});
  const [coloringHistory, setColoringHistory] = useState<{[key: string]: string}[]>([]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      // Handle coloring logic here
      runOnJS(handleColoring)();
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  const handleColoring = () => {
    if (isColoring) {
      const areaKey = `${Math.floor(translateX.value)}_${Math.floor(translateY.value)}`;
      setColoredAreas(prev => ({
        ...prev,
        [areaKey]: selectedColor,
      }));
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    triggerColorHaptic();
    playColorSound();
  };

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size);
    triggerButtonHaptic();
  };

  const handleUndo = () => {
    triggerButtonHaptic();
    if (coloringHistory.length > 0) {
      const newHistory = [...coloringHistory];
      const lastAction = newHistory.pop();
      setColoringHistory(newHistory);
      setColoredAreas(lastAction || {});
    }
  };

  const handleSave = () => {
    triggerButtonHaptic();
    playSuccessSound();
    Alert.alert('حفظ', 'هل تريد حفظ عملك؟', [
      {text: 'إلغاء', style: 'cancel'},
      {
        text: 'حفظ',
        onPress: () => {
          Alert.alert('تم الحفظ بنجاح!', 'سيتم حفظ عملك في المعرض');
        },
      },
    ]);
  };

  const handleReset = () => {
    triggerButtonHaptic();
    Alert.alert('إعادة تعيين', 'هل تريد إعادة تعيين التلوين؟', [
      {text: 'إلغاء', style: 'cancel'},
      {
        text: 'إعادة تعيين',
        style: 'destructive',
        onPress: () => {
          setColoredAreas({});
          setColoringHistory([]);
          Alert.alert('تم إعادة التعيين');
        },
      },
    ]);
  };

  const renderColorPalette = () => (
    <ColorPalette
      selectedColor={selectedColor}
      onColorSelect={handleColorSelect}
    />
  );

  const renderBrushSizes = () => (
    <BrushSizeSelector
      selectedSize={brushSize}
      onSizeSelect={handleBrushSizeChange}
    />
  );

  const renderTools = () => (
    <View style={styles.tools}>
      <TouchableOpacity style={styles.toolButton} onPress={handleUndo}>
        <Icon name="undo" size={24} color="#FF6B9D" />
        <Text style={styles.toolText}>تراجع</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.toolButton} onPress={handleReset}>
        <Icon name="refresh" size={24} color="#FF6B9D" />
        <Text style={styles.toolText}>إعادة تعيين</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.toolButton} onPress={handleSave}>
        <Icon name="save" size={24} color="#FF6B9D" />
        <Text style={styles.toolText}>حفظ</Text>
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
        <Text style={styles.headerTitle}>{character.name}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Coloring Area */}
      <View style={styles.coloringArea}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.canvas, animatedStyle]}>
            <View style={styles.characterOutline}>
              <CharacterSVG
                characterId={character.id}
                width={200}
                height={200}
                strokeColor="#FF6B9D"
                strokeWidth={3}
                fillColor="transparent"
              />
              <Text style={styles.characterName}>{character.name}</Text>
            </View>
            {/* Colored areas would be rendered here */}
            {Object.entries(coloredAreas).map(([key, color]) => (
              <View
                key={key}
                style={[
                  styles.coloredArea,
                  {
                    backgroundColor: color,
                    left: parseInt(key.split('_')[0]),
                    top: parseInt(key.split('_')[1]),
                    width: brushSize,
                    height: brushSize,
                  },
                ]}
              />
            ))}
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* Color Palette */}
      {renderColorPalette()}

      {/* Brush Sizes */}
      {renderBrushSizes()}

      {/* Tools */}
      {renderTools()}
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
  coloringArea: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#fff',
  },
  characterOutline: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B9D',
    borderStyle: 'dashed',
    margin: 20,
    borderRadius: 10,
  },
  characterNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 10,
  },
  characterName: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  coloredArea: {
    position: 'absolute',
    borderRadius: 50,
  },
  colorPalette: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedColor: {
    borderColor: '#FF6B9D',
    borderWidth: 3,
  },
  brushSizes: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brushTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  brushButtons: {
    flexDirection: 'row',
  },
  brushButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedBrush: {
    borderColor: '#FF6B9D',
    backgroundColor: '#FFE5F0',
  },
  brushPreview: {
    backgroundColor: '#333',
    borderRadius: 50,
  },
  tools: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  toolButton: {
    alignItems: 'center',
    padding: 10,
  },
  toolText: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
});

export default ColoringScreen; 