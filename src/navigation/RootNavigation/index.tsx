import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import StackNavigator from '../StackNavigator';
import {StatusBar} from 'react-native';

const RootStack = createNativeStackNavigator<RootStackParamList>();

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
