import { useRef } from 'react';
import { Text, TextInput, useWindowDimensions, View } from 'react-native';
import InputKeyboard from 'react-native-input-keyboard';

export default function Main() {
  const { height } = useWindowDimensions();

  const firstRef = useRef<any>();
  const secondRef = useRef<any>();

  return (
    <InputKeyboard>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: height - 160,
        }}
      >
        <Text style={{ fontSize: 16 }}>Press anywhere to hide the Keyboard!</Text>
      </View>

      <TextInput
        ref={firstRef}
        placeholder="Focus/blur this input"
        style={styles.input}
        onSubmitEditing={() => secondRef.current.focus()}
      />

      <TextInput
        ref={secondRef}
        placeholder="Focus/blur this input"
        style={styles.input}
        onSubmitEditing={() => firstRef.current.focus()}
      />
    </InputKeyboard>
  );
}

const styles = {
  input: {
    borderWidth: 2,
    borderColor: '#5D54A0',
    borderRadius: 8,
    backgroundColor: '#efefef',
    padding: 8,
    marginTop: 16,
    marginHorizontal: 16,
  },
};
