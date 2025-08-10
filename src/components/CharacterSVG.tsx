import React from 'react';
import Svg, {Path, Circle, Rect, Ellipse} from 'react-native-svg';

interface CharacterSVGProps {
  characterId: number;
  width: number;
  height: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
}

const CharacterSVG: React.FC<CharacterSVGProps> = ({
  characterId,
  width,
  height,
  strokeColor = '#FF6B9D',
  strokeWidth = 2,
  fillColor = 'transparent',
}) => {
  const renderCharacter = () => {
    switch (characterId) {
      case 1: // لابوبو السعيد
        return (
          <Svg width={width} height={height} viewBox="0 0 200 200">
            {/* Head */}
            <Circle cx="100" cy="80" r="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Eyes */}
            <Circle cx="85" cy="75" r="5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            <Circle cx="115" cy="75" r="5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Happy mouth */}
            <Path d="M 85 95 Q 100 105 115 95" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Body */}
            <Ellipse cx="100" cy="140" rx="30" ry="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Arms */}
            <Path d="M 70 120 Q 60 130 70 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 130 120 Q 140 130 130 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Legs */}
            <Path d="M 85 180 L 85 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 115 180 L 115 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
          </Svg>
        );
        
      case 2: // لابوبو النائم
        return (
          <Svg width={width} height={height} viewBox="0 0 200 200">
            {/* Head */}
            <Circle cx="100" cy="80" r="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Closed eyes */}
            <Path d="M 80 75 L 90 75" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 110 75 L 120 75" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Sleeping mouth */}
            <Path d="M 95 95 L 105 95" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Z's for sleep */}
            <Path d="M 130 60 L 135 65 L 130 70" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 135 65 L 140 70 L 135 75" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Body */}
            <Ellipse cx="100" cy="140" rx="30" ry="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Arms */}
            <Path d="M 70 120 Q 60 130 70 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 130 120 Q 140 130 130 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Legs */}
            <Path d="M 85 180 L 85 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 115 180 L 115 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
          </Svg>
        );
        
      case 3: // لابوبو المشاكس
        return (
          <Svg width={width} height={height} viewBox="0 0 200 200">
            {/* Head */}
            <Circle cx="100" cy="80" r="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Mischievous eyes */}
            <Path d="M 85 75 Q 90 70 95 75" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 105 75 Q 110 70 115 75" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Mischievous smile */}
            <Path d="M 85 95 Q 100 105 115 95" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Tongue sticking out */}
            <Path d="M 95 95 L 95 105" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Body */}
            <Ellipse cx="100" cy="140" rx="30" ry="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Arms */}
            <Path d="M 70 120 Q 60 130 70 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 130 120 Q 140 130 130 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Legs */}
            <Path d="M 85 180 L 85 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 115 180 L 115 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
          </Svg>
        );
        
      case 4: // لابوبو الفضولي
        return (
          <Svg width={width} height={height} viewBox="0 0 200 200">
            {/* Head */}
            <Circle cx="100" cy="80" r="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Curious eyes */}
            <Circle cx="85" cy="75" r="6" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            <Circle cx="115" cy="75" r="6" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Question mark expression */}
            <Path d="M 95 95 Q 100 100 105 95" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Question mark */}
            <Path d="M 130 60 Q 135 65 130 70 L 130 75" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Circle cx="130" cy="80" r="3" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Body */}
            <Ellipse cx="100" cy="140" rx="30" ry="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Arms */}
            <Path d="M 70 120 Q 60 130 70 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 130 120 Q 140 130 130 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Legs */}
            <Path d="M 85 180 L 85 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 115 180 L 115 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
          </Svg>
        );
        
      case 5: // لابوبو اللطيف
        return (
          <Svg width={width} height={height} viewBox="0 0 200 200">
            {/* Head */}
            <Circle cx="100" cy="80" r="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Cute eyes */}
            <Circle cx="85" cy="75" r="4" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            <Circle cx="115" cy="75" r="4" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Cute blush */}
            <Circle cx="75" cy="85" r="8" fill="#FFB6C1" stroke={strokeColor} strokeWidth={1} />
            <Circle cx="125" cy="85" r="8" fill="#FFB6C1" stroke={strokeColor} strokeWidth={1} />
            
            {/* Sweet smile */}
            <Path d="M 85 95 Q 100 105 115 95" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Body */}
            <Ellipse cx="100" cy="140" rx="30" ry="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Arms */}
            <Path d="M 70 120 Q 60 130 70 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 130 120 Q 140 130 130 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            
            {/* Legs */}
            <Path d="M 85 180 L 85 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 115 180 L 115 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
          </Svg>
        );
        
      default:
        return (
          <Svg width={width} height={height} viewBox="0 0 200 200">
            {/* Default character */}
            <Circle cx="100" cy="80" r="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            <Circle cx="85" cy="75" r="5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            <Circle cx="115" cy="75" r="5" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 85 95 Q 100 105 115 95" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Ellipse cx="100" cy="140" rx="30" ry="40" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 70 120 Q 60 130 70 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 130 120 Q 140 130 130 140" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 85 180 L 85 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <Path d="M 115 180 L 115 200" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
          </Svg>
        );
    }
  };

  return renderCharacter();
};

export default CharacterSVG; 