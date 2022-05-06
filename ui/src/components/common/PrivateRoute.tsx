import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute(props: any) {
  const user = useSelector((state: RootState) => state.userSlice);
  const isUserInitialized = user.room?.length;
  return isUserInitialized ? props.children : <Navigate to="/" />;
}
