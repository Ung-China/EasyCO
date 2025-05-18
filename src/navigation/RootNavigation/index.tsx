import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from '../../types';
import StackNavigator from '../StackNavigator';
import {StatusBar} from 'react-native';

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen name="MainTabs" component={StackNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigation;
