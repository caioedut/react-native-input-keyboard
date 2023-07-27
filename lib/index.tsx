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
  offset,
  onPress,
  children,
  ...rest
}: ReactNativeInputKeyboardProps) {
  return (
    <KeyboardAvoidingView
      {...rest}
      keyboardVerticalOffset={offset}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      onStartShouldSetResponder={() => true}
      onResponderGrant={(e) => {
        typeof onPress === 'function' ? onPress(e) : Keyboard.dismiss();
      }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
