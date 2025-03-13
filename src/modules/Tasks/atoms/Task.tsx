import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useDateFormat from '../../../shared/hooks/useDateFormat';
import { priorityItems } from '../../../config/priorityItems';

interface Props {
  id: number;
  description: string;
  priority: string;
  date: string;
}

const Task = ({ description, date, priority }: Props) => {
  const { dateFormat } = useDateFormat();

  const getPriorityData = () => {
    const item = priorityItems.find(
      itemElement => itemElement.value === priority,
    );
    return {
      color: item?.color || '#000000',
      icon: item?.icon || 'help',
    };
  };

  const priorityData = getPriorityData();

  return (
    <View style={taskStyles.container}>
      <View style={taskStyles.content}>
        <Text style={taskStyles.description} numberOfLines={1}>
          {description}
        </Text>
        <Text style={taskStyles.date}>{dateFormat(date)}</Text>
      </View>

      <View style={taskStyles.priorityContainer}>
        <Icon name={priorityData.icon} size={24} color={priorityData.color} />
        <Text style={[taskStyles.priority, { color: priorityData.color }]}>
          {priority}
        </Text>
      </View>
    </View>
  );
};

const taskStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priority: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
});

export default Task;
