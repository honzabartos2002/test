import { Avatar, Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorization } from '../Hooks/useAuthorization';

export interface ITopMenuProps {
}

export default function TopMenu(props: ITopMenuProps) {
  const navigate = useNavigate();
  const { logout } = useAuthorization();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    handleClose();
    navigate('settings');
  };

  return (
    <Stack
      direction={'row'}
      sx={{
        width: "100%",
        height: "50px",
        backgroundColor: "#f0f0f0",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={1}>
        <Button onClick={() => navigate('home')}>Domů</Button>
      </Stack>

      <Box sx={{ p: 2}}>
        <Avatar
          onClick={handleAvatarClick}
          sx={{ cursor: 'pointer', }}
        >

        </Avatar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('profile')}>
          <Typography>Profil</Typography>
        </MenuItem>
        <MenuItem onClick={handleSettingsClick}>
          <Typography>Nastavení</Typography>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Typography>Odhlásit se</Typography>
        </MenuItem>
      </Menu>
    </Stack>
  );
}
