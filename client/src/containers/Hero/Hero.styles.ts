import { styled } from '@mui/system'
import { Box, BoxProps } from '@mui/material'
import { size } from './../../utils/media';

interface IWrapper extends BoxProps{
    background: string;
}

export const Wrapper = styled(Box)<IWrapper>`
    position: relative;
    background: url(${({background}) => background && background});
    background-position: contain;
    height: 400px;
    width: 100vw;
    margin: auto;
    overflow: hidden;
    margin-top: 75px;
`

export const ContentWrapper = styled(Box)`
    width: 100%;
    z-index: 1;
    color: white;
    text-shadow: 0 0px 3px black;
    ${({theme}) => theme.breakpoints.up(size.DESKTOP)}{
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(255,255,255,0.8);
        width: 30%;
        color: black;
        text-shadow: none;
        margin: 4rem;
        padding: 2rem;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
    }
`