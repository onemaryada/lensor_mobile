import 'react-native';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../src/App';

test('renders without crashing', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
