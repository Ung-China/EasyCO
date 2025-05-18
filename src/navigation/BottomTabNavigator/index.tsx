import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, ReportScreen, TaskScreen} from '../../screens';
import {BottomTabParamList} from '../../types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TaskScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
