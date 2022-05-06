import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Signup from '.';
import { BrowserRouter } from 'react-router-dom';

test('renders signup form', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    </Provider>,
  );
  const btn = screen.getByText(/join/i);
  expect(btn).toBeInTheDocument();
});
