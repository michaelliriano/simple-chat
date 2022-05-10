import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

test('renders app', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const nav = screen.getByText(/get a room/i);
  expect(nav).toBeInTheDocument();
});
