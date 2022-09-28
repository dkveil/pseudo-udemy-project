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
import Badge from '@mui/material/Badge'

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
            <Container maxWidth="xl" sx={{height: 'inherit'}}>
                <Toolbar disableGutters>
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
                    <Box sx={{minWidth: '300px', display: 'flex', justifyContent: 'flex-end'}}>

                        {Boolean(user) ? (
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
                            <>
                                <Badge badgeContent={2}>
                                    <IconButton sx={{padding: 0}}>
                                        <ShoppingCartIcon sx={{color: 'black'}}/>
                                    </IconButton>
                                </Badge>
                                <Button variant="outlined" sx={{ml: 2}}>Login</Button>
                                <Button variant="contained" sx={{ml: 2}}>Register</Button>
                            </>
                        )}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;