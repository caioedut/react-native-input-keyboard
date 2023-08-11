import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  EmitterSubscription,
  GestureResponderEvent,
  Keyboard,
  Platform,
  TextInput,
  useWindowDimensions,
  ViewProps,
} from 'react-native';

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

    const listeners: EmitterSubscription[] = [];

    if (Platform.OS === 'ios') {
      listeners.push(
        Keyboard.addListener('keyboardWillChangeFrame', (e) => {
          setKbHeight(0);
          setTimeout(() => setKbHeight(e.endCoordinates.height), 0);
        }),
      );
    } else {
      listeners.push(
        Keyboard.addListener('keyboardDidShow', (e) => setKbHeight(e.endCoordinates.height)),
        Keyboard.addListener('keyboardDidHide', () => setKbHeight(0)),
      );
    }

    return () => {
      listeners.forEach((listener) => listener.remove());
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
        const osPadding = Platform.OS === 'android' ? 24 : 0;

        if (inputY > winHeight) {
          newOffsetY = winHeight - containerY - inputY - osPadding - (offset || 0);
        }
      }

      Animated.timing(offsetAnim, {
        toValue: newOffsetY,
        duration: 200,
        useNativeDriver: true,
      }).start();
    })();
  }, [enabled, dimensions, containerY, kbHeight]);

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
