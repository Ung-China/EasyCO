import {StyleProp, ViewStyle} from 'react-native';

export type BottomTabParamList = {
  Home: undefined;
  Task: undefined;
  Report: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
};

export type StackParamList = {
  RootStack: undefined;
};

export interface TouchableProps {
  onPress?: () => void;
  children: React.ReactNode;
  containerStyle: StyleProp<ViewStyle>;
}
