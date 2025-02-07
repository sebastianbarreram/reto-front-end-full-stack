import React from 'react';
import CustomPicker from './CustomPicker';
import CustomButton from './CustomButton';
import ModalView from './atoms/ModalView';
import { Modal, StyleSheet } from 'react-native';
import ModalContainer from './atoms/ModalContainer';
import { priorityItems } from '../config/priorityItems';
import InputTextContainer from './InputTextContainer';
import ModalInstruction from './atoms/ModalInstruction';

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
}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}>
    <ModalContainer>
      <ModalView>
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
        <CustomButton
          title="Create Task"
          onPress={onCreateTask}
          disabled={!description || !priority}
          style={styles.button}
        />
        <CustomButton title="Cancel" onPress={onClose} />
      </ModalView>
    </ModalContainer>
  </Modal>
);

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    margin: 8,
  },
  button: {
    marginVertical: 2,
  },
  buttonText: {
    color: 'white',
    height: 48,
    textAlignVertical: 'center',
    fontWeight: '500',
  },
  buttonDisabled: {
    backgroundColor: '#b0e0e6',
  },
});

export default CreateTaskModal;
