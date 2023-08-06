import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import TimerIcon from '@mui/icons-material/Timer';
import {
  AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar,
  Icon,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItemButton,
  ListItem,
} from '@mui/material';
import * as React from 'react';
import { useMemo, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContext } from './common/context/ToastContextProvider';
import { arrayBufferToBase64, base64Flag } from './Profile/AvatarUpload';
import AironLogo from '../assets/design/LogoTanIcon.png';
import { logout, resetAuth } from '../reducers/Auth';
import { logoutUserProfile } from '../reducers/UserProfile';
import { resetScheduleState } from '../reducers/WorkoutAndMealSchedule';
import theme from '../theme';

const pages = [
  ['HOME', '/app', <HomeIcon fontSize="small" />],
  ['ABOUT', 'about', <InfoIcon fontSize="small" />],
  ['PROFILE', 'profile', <PersonIcon fontSize="small" />],
  ['WORKOUT', 'workout', <TimerIcon fontSize="small" />],
];

function ResponsiveAppBar() {
  const [openNavDrawer, setOpenNavDrawer] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const openToast = useContext(ToastContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = useMemo(() => [
    ['PROFILE', () => navigate('/app/profile'), <PersonIcon fontSize="small" />],
    ['LOGOUT', () => {
      dispatch(logout());
      dispatch(resetAuth());
      dispatch(logoutUserProfile());
      dispatch(resetScheduleState());
      navigate('/');
      openToast('success', 'You have been logged out');
    }, <LogoutIcon fontSize="small" />],
  ], [navigate, dispatch]);
  const { profile } = useSelector((state) => state.userProfile);
  const profileImage = base64Flag + arrayBufferToBase64(profile?.profileImage?.data?.data);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const styles = {
    logo: {
      display: 'block',
      maxWidth: '50px',
      maxHeight: '50px',
      width: 'auto',
      height: 'auto',
    },
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown'
        && (event.key === 'Tab'
          || event.key === 'Shift')
    ) {
      return;
    }

    setOpenNavDrawer(open);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.secondary.dark, minHeight: '5vh' }}>
      <Container maxWidth="auto" sx={{ ml: 0 }}>
        <Toolbar disableGutters>
          {/* DESKTOP */}
          <Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={AironLogo} alt="Airon Icon" style={styles.logo} />
          </Icon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: theme.typography.fontFamily,
              fontWeight: 300,
              letterSpacing: '.3rem',
              color: theme.palette.secondary.main,
              textDecoration: 'none',
            }}
          >
            AIRON
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none', md: 'flex', mr: 'auto', ml: 'auto',
              },
            }}
          >
            {pages.map((page) => (
              <Link
                style={{
                  textDecoration: 'none',
                  color: theme.palette.secondary.main,
                  display: 'block',
                  '&:hover': {
                    color: 'white',
                    transition: 'background-color 1.0s ease-in-out',
                  },
                  my: 2,
                }}
                to={page[1]}
                key={page[0]}
              >
                <Button
                  sx={{
                    color: 'inherit',
                  }}
                >
                  {page[0]}
                </Button>
              </Link>
            ))}
          </Box>

          {/* MOBILE */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpenNavDrawer(true)}
              color="inherit"
              sx={{
                color: theme.palette.secondary.main,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={openNavDrawer}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  backgroundColor: theme.palette.secondary.dark,
                  color: theme.palette.secondary.main,
                },
              }}
            >
              <Box
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {pages.map((page) => (
                    <ListItem key={page[0]} disablePadding>
                      <ListItemButton component={Link} to={page[1]}>
                        <ListItemIcon
                          sx={{
                            color: theme.palette.secondary.main,
                            // make the spacing between icon and text smaller
                            minWidth: '30px',
                          }}
                        >
                          {page[2]}
                        </ListItemIcon>
                        <ListItemText primary={page[0]} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>
          <Icon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img src={AironLogo} alt="Airon Icon" style={styles.logo} />
          </Icon>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: theme.typography.fontFamily,
              fontWeight: 300,
              letterSpacing: '.3rem',
              color: '#B5936B',
              textDecoration: 'none',
            }}
          >
            AIRON
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={profile?.firstName ?? '?'}
                  src={profileImage ?? '/static/images/avatar/2.jpg'}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: '45px',
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                },
              }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting[0]}
                  onClick={() => {
                    setting[1]();
                    handleCloseUserMenu();
                  }}
                  sx={{
                    color: theme.palette.secondary.main,

                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {setting[2]}
                  </ListItemIcon>
                  <ListItemText>{setting[0]}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
