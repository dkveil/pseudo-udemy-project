import { styled, Box } from '@mui/material/'
import { size } from '../../utils/media'

export const ContentWrapper = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 24;
    padding: 4;
    background-color: white;
    outline: none;

    ${({theme}) => theme.breakpoints.up(size.DESKTOP)}{
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 500px;
        height: 70vh;
        min-height: fit-content;
    }
`