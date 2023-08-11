# React Native Input Keyboard

This component will automatically adjust the screen to remain the focused input visible while the virtual keyboard is displayed.

[![npm version](https://badge.fury.io/js/react-native-input-keyboard.svg)](https://badge.fury.io/js/react-native-input-keyboard)

## Installation

### Expo

```shell
expo install react-native-input-keyboard
```

### Other

```shell
npm install react-native-input-keyboard
# OR
yarn add react-native-input-keyboard
# OR
pnpm add react-native-input-keyboard
```

## Usage

```js
import { TextInput } from 'react-native';
import InputKeyboard from 'react-native-input-keyboard';

function Screen() {
    return (
      <InputKeyboard>
        {/* ... */}
        <TextInput />
        {/* ... */}
      </InputKeyboard>
    )
}
```

## Props

Inherits [View Props](https://reactnative.dev/docs/view#props).

| Prop      | Type       | Default            | Description                                              |
|-----------|------------|--------------------|----------------------------------------------------------|
| `enabled` | `boolean`  | `true`             | Enable or disable the component behaviors.               |
| `offset`  | `number`   | `0`                | This is the distance between the input and the keyboard. |
| `onPress` | `function` | `Keyboard.dismiss` | The behavior when users press outside the input.         |
