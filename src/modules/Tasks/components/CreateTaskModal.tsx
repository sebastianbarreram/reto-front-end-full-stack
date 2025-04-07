import React from 'react';
import ModalView from '../atoms/ModalView';
import ModalContainer from '../atoms/ModalContainer';
import ModalInstruction from '../atoms/ModalInstruction';
import CustomPicker from './CustomPicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../shared/atoms/CustomButton';
import { priorityItems } from '../../../config/priorityItems';
import InputTextContainer from '../../../shared/atoms/InputTextContainer';
import { Modal, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  description: string;
  setDescription: (text: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  onCreateTask: () => void;
}

const CreateTaskModal: React.FC<TaskModalProps> = ({
  visible,
  onClose,
  description,
  setDescription,
  priority,
  setPriority,
  onCreateTask,
}) => {
  // Handle clean close
  const handleClose = () => {
    setDescription('');
    setPriority('');
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}>
      <ModalContainer>
        <ModalView>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ModalInstruction>
            Please fill out the form to create a new task:
          </ModalInstruction>
          <InputTextContainer
            style={styles.input}
            iconName="description"
            placeHolder="Description"
            handleOnChange={setDescription}
            value={description}
          />
          <CustomPicker
            selectedValue={priority}
            onValueChange={setPriority}
            items={priorityItems}
          />
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Create Task"
              onPress={onCreateTask}
              disabled={!description || !priority}
              toggleTestID="create-task-button"
              />
            <CustomButton
              title="Cancel"
              onPress={handleClose}
              style={styles.cancelButton}
              textStyle={styles.cancelButtonText}
              toggleTestID="cancel-task-button"
            />
          </View>
        </ModalView>
      </ModalContainer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  pickerContainer: {
    marginVertical: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  createButton: {
    marginVertical: 5,
    backgroundColor: '#00ced1',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ff0000',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#ff0000',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'System',
  },
  closeButton: {
    padding: 5,
  },
});

export default CreateTaskModal;
