import React, { useEffect, useRef, useState } from 'react';
import { Animated, GestureResponderEvent, Keyboard, TextInput, useWindowDimensions, ViewProps } from 'react-native';

import measure from './measure';

const { State: TextInputState } = TextInput;

export type InputKeyboardProps = {
  enabled?: boolean;
  offset?: number;
  onPress?: (event: GestureResponderEvent) => void;
} & Omit<ViewProps, 'onStartShouldSetResponder' | 'onResponderGrant'>;

export default function InputKeyboard({
  enabled = true,
  offset,
  onPress,
  style,
  children,
  ...rest
}: InputKeyboardProps) {
  const dimensions = useWindowDimensions();

  const offsetAnim = useRef(new Animated.Value(0)).current;
  const [containerY, setContainerY] = useState(0);
  const [kbHeight, setKbHeight] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const showListener = Keyboard.addListener('keyboardDidShow', ({ endCoordinates }) => {
      setKbHeight(endCoordinates.height);
    });

    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKbHeight(0);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    (async () => {
      let newOffsetY = 0;

      const $input = TextInputState.currentlyFocusedInput();

      if ($input) {
        const { y, height } = await measure($input);
        const winHeight = dimensions.height - kbHeight;
        const inputY = y + height;

        if (inputY > winHeight) {
          newOffsetY = winHeight - containerY - inputY - height - (offset || 0);
        }
      }

      Animated.timing(offsetAnim, {
        toValue: newOffsetY,
        duration: 200,
        useNativeDriver: true,
      }).start();
    })();
  }, [dimensions, kbHeight, enabled]);

  return (
    <Animated.View
      onLayout={({ nativeEvent }) => {
        setContainerY(nativeEvent.layout.y);
      }}
      onStartShouldSetResponder={() => {
        return enabled;
      }}
      onResponderGrant={(e) => {
        typeof onPress === 'function' ? onPress(e) : Keyboard.dismiss();
      }}
      {...rest}
      style={[
        { flex: 1 },
        ...(Array.isArray(style) ? style : [style]),
        { transform: [{ translateY: enabled ? offsetAnim : 0 }] },
      ]}
    >
      {children}
    </Animated.View>
  );
}
