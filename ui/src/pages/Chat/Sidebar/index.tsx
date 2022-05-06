import Rooms from './Rooms';
import DisplayUser from './DisplayUser';
import { StyledSidebar } from './styles';
import SidebarFooter from './SidebarFooter';

type User = {
  id: string;
  username: string;
};

type SidebarPropTypes = {
  users: User[];
  usersTyping: string[];
  rooms: string[];
  currentRoom: String;
};

export default function Sidebar(props: SidebarPropTypes) {
  return (
    <StyledSidebar>
      <DisplayUser users={props.users} typing={props.usersTyping} />
      <Rooms rooms={props.rooms} currentRoom={props.currentRoom} />
      <SidebarFooter />
    </StyledSidebar>
  );
}
