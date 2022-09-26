import React from 'react'
import { Container, Typography, IconButton, Box, Avatar, Tooltip } from '@mui/material'
import { useStoreContext } from '../../context/StoreProvider';
import { AppBar, Toolbar, Search, StyledInputBase, SearchIconWrapper } from './Header.styles';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import SearchIcon from '@mui/icons-material/Search';
import TestAvatar from '../../assets/images/avatar.jpg'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = () => {

    const { user } = useStoreContext()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position='static'>
            <Container maxWidth="lg" sx={{height: 'inherit'}}>
                <Toolbar disableGutters>
                    <IconButton
                        size="large"
                        edge="start"
                        sx={{
                            mr: {xs: 1, md: 0},
                            color: "black"
                        }}
                    >
                        <AddToHomeScreenIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        color="black"
                        component="a"
                        href="/"
                        sx={{
                            display: {
                                xs: 'none',
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
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder='Search a course...'
                        inputProps={{ 'aria-label': 'search'}}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1}}/>
                    <Box sx={{flexGrow: 0}}>
                        {user ? (
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
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Log out</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button sx={{color: 'black'}}>Login</Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;