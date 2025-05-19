import {StyleProp, ViewStyle} from 'react-native';

export type BottomTabParamList = {
  Home: undefined;
  Tasks: undefined;
  Report: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
};

export type StackParamList = {
  RootStack: undefined;
  TaskDetail: undefined;
};

export interface TouchableProps {
  onPress?: () => void;
  children: React.ReactNode;
  containerStyle: StyleProp<ViewStyle>;
}

export interface ImportButtonProps {
  onPress?: () => void;
  icon: string;
  label: string;
}

export interface LoadingModalProps {
  visible: boolean;
}

export interface TaskHeaderProps {
  branchLocation: string;
  date: string;
  currency: string;
}

export interface TaskItemProps {
  onPress?: () => void;
  item: {
    id: number;
    no: number;
    accountId: string;
    name: string;
    price: number;
    total: number;
  };
}

export interface FlexibleTextInputProps {
  value: string;
  placeholder?: string;
  onValueChange: (text: string) => void;
  error?: string;
}
