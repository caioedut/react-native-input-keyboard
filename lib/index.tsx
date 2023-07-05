import React from 'react'
import {GestureResponderEvent, Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform} from 'react-native';

export type ReactNativeInputKeyboardProps = {
  onPress?: (event: GestureResponderEvent) => void
} & Omit<KeyboardAvoidingViewProps, 'behavior'| 'contentContainerStyle' | 'onStartShouldSetResponder' | 'onResponderGrant'>;

export default function ReactNativeInputKeyboard({children, onPress, ...rest}: ReactNativeInputKeyboardProps) {
  return (
    <KeyboardAvoidingView
      {...rest}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      onStartShouldSetResponder={() => true}
      onResponderGrant={(e) => {
        typeof onPress === "function" ? onPress(e) : Keyboard.dismiss()
      }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

