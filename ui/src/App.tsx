import { ThemeProvider } from '@emotion/react';
import { useEffect } from 'react';
import { socket, SocketContext } from './context/socket';
import { useSelector } from 'react-redux';
import Router from './router';
import dark from './theme/dark';
import light from './theme/light';
import CssBaseline from '@mui/material/CssBaseline';
import { RootState } from './app/store';

function App() {
  const theme = useSelector((state: RootState) => state.themeControlSlice.mode);
  const isDarkMode = theme === 'dark';
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <ThemeProvider theme={isDarkMode ? dark : light}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
