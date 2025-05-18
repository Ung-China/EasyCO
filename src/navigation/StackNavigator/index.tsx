import {StackParamList} from '../../types';
import BottomTabNavigator from '../BottomTabNavigator';
import {TaskDetailScreen} from '../../screens';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RootStack"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{
          headerBackTitle: '',
          headerTitleAlign: 'center',
          headerTintColor: 'black',
          title: 'Task',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
