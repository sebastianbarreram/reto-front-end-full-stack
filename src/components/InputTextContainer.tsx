import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextInput,
  Pressable,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import usePasswordVisibility from '../hooks/usePasswordVisibility';

interface Props {
  style?: StyleProp<ViewStyle>;
  placeHolder: string;
  iconName: string;
  type?: string;
  handleOnChange: (value: string) => void;
  validateInput?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  value: string;
}

const InputTextContainer = ({
  style,
  placeHolder,
  iconName,
  type = 'text',
  handleOnChange,
  validateInput,
  value,
}: Props) => {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    usePasswordVisibility();
  const [password, setPassword] = useState('');
  let textInput;
  if (type === 'text') {
    textInput = (
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        placeholderTextColor="#rgba(0, 0, 0, 0.6)"
        onChangeText={handleOnChange}
        value={value}
        onEndEditing={validateInput}
      />
    );
  } else if (type === 'password') {
    textInput = (
      <>
        <TextInput
          style={styles.input}
          placeholder={placeHolder}
          placeholderTextColor="#rgba(0, 0, 0, 0.6)"
          autoCapitalize="none"
          secureTextEntry={passwordVisibility}
          textContentType={'password'}
          onChangeText={text => setPassword(text)}
        />
        <Pressable onPress={handlePasswordVisibility}>
          <IconComunity name={rightIcon} size={22} color="#232323" />
        </Pressable>
      </>
    );
  }

  return (
    <View style={style}>
      <View style={styles.icon}>
        <Icon name={iconName} size={24} color="rgba(0, 0, 0, 0.6)" />
      </View>

      <View style={styles.inputContainer}>{textInput}</View>
    </View>
  );
};

export default InputTextContainer;

const styles = StyleSheet.create({
  icon: {
    height: 56,
    width: 48,
    justifyContent: 'flex-end',
    padding: 10,
  },

  inputContainer: {
    height: 56,
    width: 330,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderStyle: 'solid',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderColor: 'rgba(0, 0, 0, 0.38)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    textAlignVertical: 'center',
    marginLeft: 12,
    color: 'black',
    fontSize: 16,
    width: '82%',
  },
});
