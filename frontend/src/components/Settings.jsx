import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


const Settings = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Email = localStorage.getItem("token1");
  console.log(Email);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenId");
    localStorage.removeItem("token1");
    window.location = "/signin"

  };
  return (
    <div >
      <Tooltip >
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src={Email} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
          backgroundColor:"white",
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
          backgroundColor:"white",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >

        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
        </MenuItem>

      </Menu>
    </div>

  );
};
export default Settings;
