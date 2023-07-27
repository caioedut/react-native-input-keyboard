# React Native Input Keyboard

[![npm version](https://badge.fury.io/js/react-native-input-keyboard.svg)](https://badge.fury.io/js/react-native-input-keyboard)

This component will automatically the screen to remain the focused input visible while the virtual keyboard is displayed.

---

## Installation

`yarn add react-native-input-keyboard`

OR

`npm install react-native-input-keyboard`

---

## Expo

Expo is fully supported.

---

## Usage

```js
import { TextInput } from 'react-native';
import ReactNativeInputKeyboard from 'react-native-input-keyboard';

function Screen() {
    return (
      <ReactNativeInputKeyboard>
        {/* ... */}
        <TextInput />
        {/* ... */}
      </ReactNativeInputKeyboard>
    )
}
```

---

## Props

Inherits [View Props](https://reactnative.dev/docs/view#props).

| Prop      | Type       | Default            | Description                                                                                                           |
|-----------|------------|--------------------|-----------------------------------------------------------------------------------------------------------------------|
| `enabled` | `boolean`  | `true`             | Enabled or disabled interation.                                                                                       |
| `offset`  | `number`   | `0`                | This is the distance between the top of the user screen and the react native view, may be non-zero in some use cases. |
| `onPress` | `function` | `Keyboard.dismiss` | The behavior when users press outside the input.                                                                      |
