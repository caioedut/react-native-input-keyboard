import { Component } from 'react';
import { NativeMethods } from 'react-native';

export default async function measure($element: Component & NativeMethods): Promise<{
  x: number;
  y: number;
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    if (!$element) {
      return reject('Unable to find the element');
    }

    $element.measureInWindow((x, y, width, height) => {
      return resolve({ x, y, width, height });
    });
  });
}
