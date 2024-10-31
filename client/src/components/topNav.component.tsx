import React, { useState } from 'react';
import { Box, Tabs, Tab, Popover, MenuItem, Paper } from '@mui/material';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FillDataCurrentUser } from '../redux/userAction.ts';
import { useSelector } from 'react-redux';

export default function TopNav() {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const isAdmin: boolean = useSelector((state: any) => (state.userReducer.currentUser.isAdmin));

  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (token && user) {
      dispatch(FillDataCurrentUser(user));
    }
  }, [dispatch]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ marginBottom: '20px', marginLeft: '8px', display: 'flex', alignItems: 'center', width: '100%', bgcolor: 'background.paper', '& .MuiTab-root': { '&:focus': { outline: 'none' }, '&.Mui-selected': { outline: 'none' } } }}>
      <img src={logo} alt="Logo" style={{ marginLeft: '30px', marginRight: '5px', height: '50px' }} />
      <Tabs value={value} onChange={handleChange}>
        <Tab label="home" component={Link} to="/home" />
        <Tab label="gallery" component={Link} to="/gallery" />
        <Tab label="orders" component={Link} to="/order" />
        {isAdmin && <Tab label="manager" onClick={handleOpenMenu} />}
      </Tabs>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper>
          <MenuItem component={Link} to="/admin/businessDetails" onClick={handleCloseMenu}>business details</MenuItem>
          <MenuItem component={Link} to="/admin/photographyPackages" onClick={handleCloseMenu}>photography packages</MenuItem>
          <MenuItem component={Link} to="/admin/orders" onClick={handleCloseMenu}>orders</MenuItem>
          <MenuItem component={Link} to="/admin/customers" onClick={handleCloseMenu}>customers</MenuItem>
        </Paper>
      </Popover>
    </Box>
  );
}