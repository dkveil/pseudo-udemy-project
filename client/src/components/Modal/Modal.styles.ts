import { styled, Box, IconButton } from '@mui/material/'
import { size } from '../../utils/media'

export interface IContentWrapper {
    width?: string;
    height?: string;
}

export const ContentWrapper = styled(Box)<IContentWrapper>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    box-shadow: 24;
    padding: 4rem;
    background-color: white;
    outline: none;

    ${({theme}) => theme.breakpoints.up(size.DESKTOP)}{
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        overflow-y: scroll;
        width: ${({width}) => width ? width : '500px'};
        height: ${({height}) => height ? height : '70vh'};
        max-height: 90%;
        min-height: fit-content;
    }
`

export const CloseIconButton = styled(IconButton)`
    position: absolute;
    top: 0;
    right: 0;
`