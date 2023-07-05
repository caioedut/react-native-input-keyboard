import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';

export type ReactNativeInputKeyboardProps = {
  children?: any;
} ;

export default function ReactNativeInputKeyboard({ children, ...rest }: ReactNativeInputKeyboardProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      {...rest}
      onResponderGrant={Keyboard.dismiss}
      onStartShouldSetResponder={() => true}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

