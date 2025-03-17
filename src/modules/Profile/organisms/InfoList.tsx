import React from 'react';
import InfoItem from '../molecules/InfoItem';
import { View, StyleSheet } from 'react-native';

interface InfoListProps {
  items: Array<{
    icon: string;
    label: string;
    value: string;
  }>;
}

const InfoList: React.FC<InfoListProps> = ({ items }) => {
  return (
    <View style={styles.infoContainer}>
      {items.map((item, index) => (
        <InfoItem
          key={index}
          icon={item.icon}
          label={item.label}
          value={item.value}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginVertical: 20,
  },
});

export default InfoList;
