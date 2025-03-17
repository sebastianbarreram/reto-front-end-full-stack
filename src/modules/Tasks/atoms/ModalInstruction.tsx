import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ModalInstructionProps {
  children: React.ReactNode;
}

const ModalInstruction: React.FC<ModalInstructionProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Icon name="tips-and-updates" size={24} color="#00ced1" />
        </View>
        <Text style={styles.modalInstruction}>{children}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f9fa',
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#00ced1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: '#00ced1',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#00ced1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  modalInstruction: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'System',
    flex: 1,
    lineHeight: 22,
  },
});

export default ModalInstruction;
