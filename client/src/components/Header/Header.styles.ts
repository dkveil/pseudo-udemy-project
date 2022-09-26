import { styled } from '@mui/system'
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import { InputBase } from '@mui/material';

export const AppBar = styled(MuiAppBar)`
    background-color: white;
    height: 80px;
`

export const Toolbar = styled(MuiToolbar)`
    display: flex;
    align-items: center;
    height: inherit;
`

export const Search = styled('div')(({theme}) =>`
    position: relative;
    border-radius: 10px;
    margin-right: ${theme.spacing(2)};
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: rgba(115,115,115,.2);
    flex-grow: 1;

    :hover{
        background-color: rgba(115,115,115,.3);
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