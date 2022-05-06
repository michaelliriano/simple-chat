import User from '../../../../types/user.types';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box, Typography } from '@mui/material';

type DisplayUserType = {
  users: User[];
  typing: string[];
};
export default function DisplayUser(props: DisplayUserType) {
  return (
    <>
      <Typography variant="h6">Online ({props.users.length})</Typography>
      <Box style={{ maxHeight: 150, overflowY: 'scroll' }}>
        {props.users.map((user: User) => (
          <List key={user.username} component="nav" aria-label="online-users">
            <ListItemButton
              style={{ margin: 0, paddingTop: 0, paddingBottom: 0 }}
            >
              <ListItemText
                primary={
                  !!user.username && props.typing.includes(user.username)
                    ? user.username + ' 💬'
                    : user.username
                }
              />
            </ListItemButton>
          </List>
        ))}
      </Box>
    </>
  );
}
