import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LaboboCharacter} from '../App';

const {width} = Dimensions.get('window');

interface CharacterCardProps {
  character: LaboboCharacter;
  isUnlocked: boolean;
  onPress: (character: LaboboCharacter) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isUnlocked,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, !isUnlocked && styles.lockedCard]}
      onPress={() => onPress(character)}
      activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Text style={styles.characterNumber}>{character.id}</Text>
        </View>
        {!isUnlocked && (
          <View style={styles.lockOverlay}>
            <Icon name="lock" size={24} color="#fff" />
          </View>
        )}
      </View>
      <Text style={styles.characterName}>{character.name}</Text>
      {!isUnlocked && (
        <Text style={styles.lockedText}>مقفل</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  image: {
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
});

export default CharacterCard; 