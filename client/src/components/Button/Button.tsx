import { styled } from '@mui/system'
import Button from '@mui/material/Button'

export default styled(Button)`

    ${({theme}) => theme.breakpoints.up(0)} {
        border-radius: 0;
        border: 1px solid black;
        background-color: ${(props) => props.variant === "contained" ? 'black' : 'white'};
        color: ${(props) => props.variant === "contained" ? 'white' : 'black'};

        &:hover{
            border-color: black;
            background-color: ${(props) => props.variant === "contained" ? 'black' : 'white'};
            color: ${(props) => props.variant === "contained" ? 'white' : 'black'};
        }
    }
`
