import React from 'react'
import { Container, Typography, IconButton, Box, Avatar, Tooltip } from '@mui/material'
import { useStoreContext } from '../../context/StoreProvider';
import { AppBar, Toolbar, Search, StyledInputBase, SearchIconWrapper } from './Header.styles';
import SearchIcon from '@mui/icons-material/Search';
import TestAvatar from '../../assets/images/avatar.jpg'
import Button from '../Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '../Badge'
import useWindowDimensions from './../../hooks/useWindowDimensions.hook';
import { size } from '../../utils/media';
import MenuIcon from '@mui/icons-material/Menu';
import UserForm from '../UserForm';

const Header = () => {

    const [openModal, setOpenModal] = React.useState<boolean>(true);
    const [userFormType, setUserFormType] = React.useState<"register" | "login" | null>(null)

    const handleOpenModal = (type: typeof userFormType) => {
        setUserFormType(type)
        setOpenModal(true)
    };

    const handleFormType = (type: typeof userFormType) => {
        setUserFormType(type)
    }

    const handleCloseModal = () => setOpenModal(false)

    const { user, setUser } = useStoreContext()
    const { width: windowWidth } = useWindowDimensions()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                        sm: 'block'
                    },
                    textDecoration: 'none',
                    color: 'black',
                    fontSize: {
                        sm: '24px'
                    },
                    mr: {md: 4}
                }}
            >
                fakeUdemy
            </Typography>
            <Search sx={{flexGrow: 1}}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder='Search a course...'
                inputProps={{ 'aria-label': 'search'}}
                />
            </Search>
            <Box sx={{flexGrow: 1}} />
            <Box sx={{minWidth: '300px', display: 'flex', justifyContent: 'flex-end', gap: 1}}>
            {Boolean(user) ?
            (
                <>
                    <Tooltip title="Open settings">
                    <IconButton sx={{padding: 0}} onClick={handleOpenUserMenu}>
                        <Avatar alt="Remy Sharp" src={TestAvatar}/>
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
                        <MenuItem onClick={() => { setUser(null); handleCloseUserMenu()}}>
                            <Typography textAlign="center">Log out</Typography>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <>
                    <Badge badgeContent={2} color='primary'>
                        <IconButton sx={{padding: 0}} size="large">
                            <ShoppingCartIcon sx={{color: 'black'}}/>
                        </IconButton>
                    </Badge>
                    <Button variant="outlined" sx={{ml: 2}} onClick={() => handleOpenModal('login')}>Login</Button>
                    <Button variant="contained" onClick={() => handleOpenModal('register')}>Register</Button>
                </>
            )}
            </Box>
        </>
    )

    const mobileToolbar = (
        <>
            <Box sx={{flexGrow: 1}}>
                <IconButton size="medium" onClick={handleOpenUserMenu}>
                    <MenuIcon sx={{color: 'black'}}/>
                </IconButton>
                    {Boolean(user) ? (
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
                            <MenuItem onClick={() => { setUser(null); handleCloseUserMenu()}}>
                                <Typography textAlign="center">Log out</Typography>
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
                            <MenuItem onClick={() => { handleOpenModal('login'); handleCloseUserMenu()}}>
                                <Typography textAlign="center">Log in</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { handleOpenModal('register'); handleCloseUserMenu()}}>
                                <Typography textAlign="center">Register</Typography>
                            </MenuItem>
                        </Menu>
                    )}

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
                    flexGrow: 2
                }}
            >
                fakeUdemy
            </Typography>
            <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end', gap: 1}}>
                <IconButton sx={{padding: 0}} size="medium">
                    <SearchIcon sx={{color: 'black'}}/>
                </IconButton>
                <Badge badgeContent={3} color='primary'>
                    <IconButton sx={{padding: 0}} size="large">
                        <ShoppingCartIcon sx={{color: 'black'}}/>
                    </IconButton>
                </Badge>
            </Box>

        </>
    )

    return (
        <>
            <AppBar position='static'>
                <Container maxWidth="xl" sx={{height: 'inherit'}}>
                    <Toolbar disableGutters>
                        {windowWidth > size.DESKTOP ? desktopToolbar : mobileToolbar}
                    </Toolbar>
                </Container>
            </AppBar>
            <UserForm open={openModal} handleClose={handleCloseModal} type={userFormType} handleFormType={handleFormType}/>
        </>
    );
}

export default Header;