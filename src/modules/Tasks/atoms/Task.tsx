import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../../themes/GlobalTheme';
import useDateFormat from '../../../shared/hooks/useDateFormat';

interface Props {
  id: number;
  description: string;
  priority: string;
  date: string;
}

const Task = ({ description, date, priority }: Props) => {
  const { dateFormat } = useDateFormat();
  return (
    <View style={styles().task}>
      <View>
        <Text numberOfLines={1}>{description}</Text>
        <Text>{dateFormat(date)}</Text>
      </View>

      <Text>{priority}</Text>
    </View>
  );
};

export default Task;
