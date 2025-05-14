import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList} from '../../types';
import BottomTabNavigator from '../BottomTabNavigator';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RootStack"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
