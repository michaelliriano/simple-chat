import Navbar from './components/common/Navbar';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Box } from '@mui/material';

export default function Router() {
  const user = useSelector((state: RootState) => state.userSlice);

  return (
    <BrowserRouter>
      <Navbar title="Get a Room" />

      {!!user.error && (
        <Box sx={{ p: 1 }}>
          <Alert severity="error">{user.error}</Alert>
        </Box>
      )}

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route
          path="/joined"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
