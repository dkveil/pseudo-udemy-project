import { styled } from '@mui/system'
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import { InputBase } from '@mui/material';
import { Link } from 'react-router-dom';

export const AppBar = styled(MuiAppBar)`
    background-color: white;
    height: 75px;
    z-index: 4;
`

export const Toolbar = styled(MuiToolbar)`
    display: flex;
    align-items: center;
    height: inherit;
`

export const Search = styled('div')(({theme}) =>`
    position: relative;
    border-radius: 20px;
    border: 1px solid black;
    margin-right: ${theme.spacing(2)};
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: rgba(115,115,115,.05);
    flex-grow: 1;
    height: 45px;

    :hover{
        background-color: rgba(115,115,115,.1);
    }

    ${theme.breakpoints.up("sm")} {
        margin-left: ${theme.spacing(5)};
        width: auto;
    }
`)

export const StyledInputBase = styled(InputBase)(({theme}) =>`
    height: 100%;

    .MuiInputBase-input {
        padding: ${theme.spacing(1,1,1,0)}
        padding-left: calc(1em + ${theme.spacing(0, 1)});
        width: 100%;

        ${theme.breakpoints.up('md')}{
            width: '20ch';
        }
    }
`)

export const SearchIconWrapper = styled('div')(({theme}) => `
    padding: ${theme.spacing(0,2)};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    pointer-events: none;
`)

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;