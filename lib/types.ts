import type { GestureResponderEvent, ViewProps } from 'react-native';

export type InputKeyboardProps = {
  enabled?: boolean;
  offset?: number;
  onPress?: (event: GestureResponderEvent) => void;
} & Omit<ViewProps, 'onStartShouldSetResponder' | 'onResponderGrant'>;
