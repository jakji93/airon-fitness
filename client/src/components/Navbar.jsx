import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar,
  Icon,
} from '@mui/material';
import * as React from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContext } from './common/context/ToastContextProvider';
import { arrayBufferToBase64, base64Flag } from './Profile/AvatarUpload';
import AironLogo from '../assets/design/LogoTanIcon.png';
import { logout, resetAuth } from '../reducers/Auth';
import { logoutUserProfile } from '../reducers/UserProfile';
import { resetScheduleState } from '../reducers/WorkoutAndMealSchedule';
import theme from '../theme';

const pages = [['HOME', '/app'], ['ABOUT', '../about'], ['PROFILE', 'profile'], ['WORKOUT', 'workout']];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const openToast = React.useContext(ToastContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = useMemo(() => [
    ['PROFILE', () => navigate('/app/profile')],
    ['LOGOUT', () => {
      navigate('/login');
      dispatch(logout());
      dispatch(resetAuth());
      dispatch(logoutUserProfile());
      dispatch(resetScheduleState());
      openToast('success', 'You have been logged out');
    }],
  ], [navigate, dispatch]);
  const { profile } = useSelector((state) => state.userProfile);
  const profileImage = base64Flag + arrayBufferToBase64(profile?.profileImage?.data?.data);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.secondary.dark, minHeight: '10vh' }}>
      <Container maxWidth="auto" sx={{ ml: 0 }}>
        <Toolbar disableGutters>
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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                color: theme.palette.secondary.main,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page[0]} onClick={handleCloseNavMenu} component={Link} to={page[1]}>
                  <Typography textAlign="center">
                    {page[0]}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
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
          <Box sx={{
            flexGrow: 1,
            display: {
              xs: 'none', md: 'flex', mr: 'auto', ml: 'auto',
            },
          }}
          >
            {pages.map((page) => (
              <Button
                key={page[0]}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: theme.palette.secondary.main,
                  display: 'block',
                  '&:hover': {
                    color: 'white',
                    transition: 'background-color 1.0s ease-in-out',
                  },
                }}
              >
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={page[1]}>{page[0]}</Link>
              </Button>
            ))}
          </Box>

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
              sx={{ mt: '45px' }}
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
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting[0]}
                  onClick={() => {
                    setting[1]();
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting[0]}</Typography>
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
