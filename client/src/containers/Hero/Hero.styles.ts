import { styled } from '@mui/system'
import { Box, BoxProps } from '@mui/material'
import { size } from './../../utils/media';

interface IWrapper extends BoxProps{
    backgroundColor: string;
}

export const Wrapper = styled(Box)<IWrapper>`
    position: relative;
    background-color: ${({backgroundColor}) => backgroundColor};
    height: 350px;
    width: 100vw;
    margin: auto;
    overflow: hidden;
    margin-top: 80px;
`

export const ContentWrapper = styled(Box)`
    width: 100%;
    z-index: 1;

${({theme}) => theme.breakpoints.up(size.DESKTOP)}{
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: white;
        width: 50%;
        margin: 4rem;
        padding: 2rem;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
    }
`