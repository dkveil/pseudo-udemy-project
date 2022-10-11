import React from 'react';
import { Container, Typography, IconButton, Box, Avatar, Tooltip, Divider } from '@mui/material';
import { useStoreContext } from '../../context/StoreProvider';
import { AppBar, Toolbar, Search, StyledInputBase, SearchIconWrapper, StyledLink } from './Header.styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SearchIcon from '@mui/icons-material/Search';
import Button from '../Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '../Badge';
import useWindowDimensions from './../../hooks/useWindowDimensions.hook';
import { size } from '../../utils/media';
import MenuIcon from '@mui/icons-material/Menu';
import UserForm from '../UserForm';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import { formatCurrency } from '../../utils/formatCurrency';
import SettingsIcon from '@mui/icons-material/Settings';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { USER_TYPE } from '../../utils/userTypes';
import { useShoppingCartContext } from './../../context/ShopingCartProvider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const links = {
    profile: '/',
    usersettings: '/',
    courses: '/my-courses',
    shoppingcart: '/',
    wishlist: '/wish-list',
    adminpanel: '/',
};

const Header = () => {
    const { openCart, products } = useShoppingCartContext();

    const [openModal, setOpenModal] = React.useState<boolean>(true);
    const [userFormType, setUserFormType] = React.useState<'register' | 'login' | null>(null);

    const handleOpenModal = (type: typeof userFormType) => {
        setUserFormType(type);
        setOpenModal(true);
    };

    const handleFormType = (type: typeof userFormType) => {
        setUserFormType(type);
    };

    const handleCloseModal = () => setOpenModal(false);

    const { user, setUser } = useStoreContext();
    const { width: windowWidth } = useWindowDimensions();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const userMenu = user ? (
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
            PaperProps={{
                style: {
                    minWidth: 280,
                },
            }}
        >
            <StyledLink to={links.profile}>
                <MenuItem sx={{ display: 'flex', gap: 1 }} onClick={handleCloseUserMenu}>
                    {user.avatar ? (
                        <Avatar alt="Remy Sharp" src={user.avatar} sx={{ height: 44, width: 44 }} />
                    ) : (
                        <Avatar sx={{ bgcolor: 'black', height: 44, width: 44 }}>{user.login.charAt(0).toUpperCase()}</Avatar>
                    )}
                    <Box>
                        <Typography textAlign="center" fontWeight="bold">
                            {user.login.charAt(0).toUpperCase() + user.login.slice(1)}
                        </Typography>
                        <Typography variant="caption" textAlign="center" sx={{ position: 'absolute', bottom: 7, fontSize: 8.5 }}>
                            Budget: {formatCurrency(user?.budget, 'EUR')}
                        </Typography>
                    </Box>
                </MenuItem>
            </StyledLink>
            <Divider />
            <StyledLink to={links.profile}>
                <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>My profile</ListItemText>
                </MenuItem>
            </StyledLink>
            <StyledLink to={links.courses}>
                <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                        <SchoolIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>My courses</ListItemText>
                </MenuItem>
            </StyledLink>
            <MenuItem
                onClick={() => {
                    handleCloseUserMenu();
                    openCart();
                }}
            >
                <ListItemIcon>
                    <ShoppingCartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Shopping cart</ListItemText>
            </MenuItem>
            <StyledLink to={links.wishlist}>
                <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                        <ListIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Wish list</ListItemText>
                </MenuItem>
            </StyledLink>
            <Divider />
            {user.accessLevel === USER_TYPE.ADMIN && (
                <StyledLink to={links.adminpanel}>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                            <AdminPanelSettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Admin panel</ListItemText>
                    </MenuItem>
                </StyledLink>
            )}
            <StyledLink to={links.usersettings}>
                <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Account settings</ListItemText>
                </MenuItem>
            </StyledLink>
            <MenuItem
                onClick={() => {
                    setUser(null);
                    handleCloseUserMenu();
                }}
            >
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Log out</ListItemText>
            </MenuItem>
        </Menu>
    ) : (
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
            <MenuItem
                onClick={() => {
                    handleOpenModal('login');
                    handleCloseUserMenu();
                }}
            >
                <Typography textAlign="center">Log in</Typography>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    handleOpenModal('register');
                    handleCloseUserMenu();
                }}
            >
                <Typography textAlign="center">Register</Typography>
            </MenuItem>
        </Menu>
    );

    const desktopToolbar = (
        <>
            <Typography
                variant="h6"
                noWrap
                color="black"
                component="a"
                href="/"
                sx={{
                    display: {
                        sm: 'block',
                    },
                    textDecoration: 'none',
                    color: 'black',
                    fontSize: {
                        sm: '24px',
                    },
                    mr: { md: 4 },
                }}
            >
                fakeUdemy
            </Typography>
            <Search sx={{ flexGrow: 1 }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search a course..." inputProps={{ 'aria-label': 'search' }} />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ minWidth: '300px', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                {user ? (
                    <>
                        <Tooltip title="Wish list">
                            <StyledLink to={links.wishlist}>
                                <IconButton>
                                    <FavoriteBorderIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </StyledLink>
                        </Tooltip>
                        <Badge badgeContent={products.length} color="primary" sx={{ mr: 2 }}>
                            <IconButton sx={{ padding: 0 }} size="large" onClick={openCart}>
                                <ShoppingCartIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </Badge>
                        <Tooltip title="Open settings">
                            <IconButton sx={{ padding: 0 }} onClick={handleOpenUserMenu}>
                                {user?.avatar ? (
                                    <Avatar alt="Remy Sharp" src={user.avatar} />
                                ) : (
                                    <Avatar sx={{ bgcolor: 'black' }}>{user?.login.charAt(0).toUpperCase()}</Avatar>
                                )}
                            </IconButton>
                        </Tooltip>
                        {userMenu}
                    </>
                ) : (
                    <>
                        <Badge badgeContent={products.length} color="primary">
                            <IconButton sx={{ padding: 0 }} size="large" onClick={openCart}>
                                <ShoppingCartIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </Badge>
                        <Button variant="outlined" sx={{ ml: 2 }} onClick={() => handleOpenModal('login')}>
                            Login
                        </Button>
                        <Button variant="contained" onClick={() => handleOpenModal('register')}>
                            Register
                        </Button>
                    </>
                )}
            </Box>
        </>
    );

    const mobileToolbar = (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <IconButton size="medium" onClick={handleOpenUserMenu}>
                    <MenuIcon sx={{ color: 'black' }} />
                </IconButton>
                {userMenu}
            </Box>
            <Typography
                variant="h6"
                noWrap
                color="black"
                component="a"
                href="/"
                sx={{
                    display: 'block',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'black',
                    fontSize: '28px',
                    flexGrow: 2,
                }}
            >
                fakeUdemy
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <IconButton sx={{ padding: 0 }} size="medium">
                    <SearchIcon sx={{ color: 'black' }} />
                </IconButton>
                <Badge badgeContent={products.length} color="primary">
                    <IconButton sx={{ padding: 0 }} size="large" onClick={openCart}>
                        <ShoppingCartIcon sx={{ color: 'black' }} />
                    </IconButton>
                </Badge>
            </Box>
        </>
    );

    return (
        <>
            <AppBar position="fixed">
                <Container maxWidth="xl" sx={{ height: 'inherit' }}>
                    <Toolbar disableGutters>{windowWidth > size.DESKTOP ? desktopToolbar : mobileToolbar}</Toolbar>
                </Container>
            </AppBar>
            <UserForm open={openModal} handleClose={handleCloseModal} type={userFormType} handleFormType={handleFormType} />
        </>
    );
};

export default Header;
