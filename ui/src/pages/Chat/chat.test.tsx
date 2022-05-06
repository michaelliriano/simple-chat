import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Page from '.';
import { BrowserRouter } from 'react-router-dom';

test('renders chat page', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </Provider>,
  );
  const btn = screen.getByText(/Chat/i);
  expect(btn).toBeInTheDocument();
});
