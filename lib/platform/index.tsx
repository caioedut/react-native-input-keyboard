import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  EmitterSubscription,
  GestureResponderEvent,
  Keyboard,
  Platform,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import measure from '../measure';
import type { InputKeyboardProps } from '../types';

const { State: TextInputState } = TextInput;

export { InputKeyboardProps };

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
  const [kbHeight, setKbHeight] = useState<number>(0);

  // Monitor keyboard height while handling iOS-specific AutoFill frame glitches
  useEffect(() => {
    if (!enabled) return;

    const listeners: EmitterSubscription[] = [];

    if (Platform.OS === 'ios') {
      listeners.push(
        Keyboard.addListener('keyboardWillChangeFrame', (e) => {
          const nextHeight = e.endCoordinates.height;

          // CRITICAL FIX: If iOS sends a 0 height frame during typing
          // while the keyboard should remain open, ignore this ghost frame.
          if (nextHeight === 0) return;

          setKbHeight((current) => (current !== nextHeight ? nextHeight : current));
        }),

        // Solely responsible for resetting the keyboard height on iOS
        Keyboard.addListener('keyboardWillHide', () => {
          setKbHeight(0);
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

    let isMounted = true;

    // If the keyboard is closed, reset the offset layout immediately
    if (kbHeight === 0) {
      Animated.timing(offsetAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      return;
    }

    // Add a slight delay to wait for iOS to finish text selection
    // or autofill layouts before measuring the input window coordinates
    setTimeout(async () => {
      const $input = TextInputState.currentlyFocusedInput();
      if (!$input || !isMounted) return;

      const { y, height } = await measure($input);

      // Double-check in case the focus changed or the component unmounted during the async await bridge call
      if (!isMounted || $input !== TextInputState.currentlyFocusedInput()) return;

      const inputBottom = y + height;
      const availableSpace = dimensions.height - kbHeight;
      const osPadding = Platform.OS === 'android' ? 24 : 0;
      const totalOffset = (offset || 0) + osPadding;

      if (inputBottom > availableSpace) {
        const targetOffset = availableSpace - inputBottom - totalOffset;

        Animated.timing(offsetAnim, {
          toValue: targetOffset,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }, 20); // 20ms delay perfectly avoids race conditions with iOS keychain/selection tooltips

    return () => {
      isMounted = false;
    };
  }, [enabled, kbHeight, offset, dimensions.height]);

  const extendedStyle = useMemo(
    () => [
      { flex: 1 },
      ...(Array.isArray(style) ? style : [style]),
      { transform: [{ translateY: enabled ? offsetAnim : 0 }] },
    ],
    [style, enabled, offsetAnim],
  );

  const handleStartShouldSetResponder = useCallback(
    () => Boolean(enabled && TextInputState.currentlyFocusedInput()),
    [enabled],
  );

  const handleResponderGrant = useCallback(
    (event: GestureResponderEvent) => (typeof onPress === 'function' ? onPress(event) : Keyboard.dismiss()),
    [onPress],
  );

  return (
    <Animated.View
      onStartShouldSetResponder={handleStartShouldSetResponder}
      onResponderGrant={handleResponderGrant}
      {...rest}
      style={extendedStyle}
    >
      {children}
    </Animated.View>
  );
}
