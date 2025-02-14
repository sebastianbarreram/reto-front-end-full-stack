import React from 'react';
import { Image } from 'react-native';
import { styles } from '../../themes/GlobalTheme';

interface Props {
  size?: number;
}

const Logo = ({ size }: Props) => {
  return (
    <Image
      style={{
        ...(size
          ? {
              ...styles({}).logo,
              width: size,
              height: size,
            }
          : styles({}).logo),
      }}
      source={require('../../assets/images/LogoWallet.png')}
    />
  );
};

export default Logo;
