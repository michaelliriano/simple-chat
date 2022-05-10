import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Page from '.';
import { BrowserRouter } from 'react-router-dom';
import dark from '../../theme/dark';
import { ThemeProvider } from '@emotion/react';

test('renders chat page', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={dark}>
        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );
  const btn = screen.getByText(/Send/i);
  expect(btn).toBeInTheDocument();
});
