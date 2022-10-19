import { styled, Box, IconButton } from '@mui/material/'
import { size } from '../../utils/media'

export interface IContentWrapper {
    width?: string;
    height?: string;
}

export const ContentWrapper = styled(Box)<IContentWrapper>`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    box-shadow: 24;
    overflow-y: scroll;
    padding: 4rem;
    background-color: white;
    outline: none;

    ${({theme}) => theme.breakpoints.up(size.DESKTOP)}{
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: ${({width}) => width ? width : '500px'};
        height: ${({height}) => height ? height : 'fit-content'};
        max-height: 90%;
    }
`

export const CloseIconButton = styled(IconButton)`
    position: absolute;
    top: 0;
    right: 0;
`