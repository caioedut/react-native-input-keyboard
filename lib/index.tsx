import React from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from 'react-native';

export type ReactNativeInputKeyboardProps = {
  offset?: number;
  onPress?: (event: GestureResponderEvent) => void;
} & Omit<
  KeyboardAvoidingViewProps,
  'behavior' | 'keyboardVerticalOffset' | 'contentContainerStyle' | 'onStartShouldSetResponder' | 'onResponderGrant'
>;

export default function ReactNativeInputKeyboard({
  enabled = true,
  offset,
  onPress,
  children,
  ...rest
}: ReactNativeInputKeyboardProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      {...rest}
      enabled={enabled}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={offset}
      onStartShouldSetResponder={() => enabled}
      onResponderGrant={(e) => {
        typeof onPress === 'function' ? onPress(e) : Keyboard.dismiss();
      }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
