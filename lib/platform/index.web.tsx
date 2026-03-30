import { useMemo } from 'react';
import { View } from 'react-native';
import type { InputKeyboardProps } from '../types';

export { InputKeyboardProps };

export default function InputKeyboard({
  enabled, // ignored on web
  offset, // ignored on web
  onPress, // ignored on web
  style,
  children,
  ...rest
}: InputKeyboardProps) {
  const extendedStyle = useMemo(() => [{ flex: 1 }, ...(Array.isArray(style) ? style : [style])], [style]);

  return (
    <View {...rest} style={extendedStyle}>
      {children}
    </View>
  );
}
