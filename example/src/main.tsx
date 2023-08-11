import { Text, TextInput, useWindowDimensions, View } from 'react-native';
import InputKeyboard from 'react-native-input-keyboard';

export default function Main() {
  const { height } = useWindowDimensions();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: height - 160,
        }}
      >
        <Text>Press anywhere to hide the Keyboard!</Text>
      </View>

      <View>
        <TextInput
          placeholder="Focus/blur this input"
          style={{ borderWidth: 0, backgroundColor: '#dddddd', padding: 8 }}
        />
      </View>
    </View>
  );
}
