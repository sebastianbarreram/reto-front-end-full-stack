import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface UserAvatarProps {
  size: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ size }) => {
  return <Icon name="account-circle" size={size} color="#00ced1" />;
};

export default UserAvatar;
