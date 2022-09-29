import { styled, Box, IconButton } from '@mui/material/'
import { size } from '../../utils/media'

export const ContentWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 24;
    padding: 4rem;
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

export const CloseIconButton = styled(IconButton)`
    position: absolute;
    top: 0;
    right: 0;
`