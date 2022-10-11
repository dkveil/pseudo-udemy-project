import { styled } from '@mui/system';
import { LoadingButton } from '@mui/lab';

export default styled(LoadingButton)`
    ${({ theme }) => theme.breakpoints.up(0)} {
        border-radius: 0;
        border: 1px solid black;
        background-color: ${(props) => (props.variant === 'contained' ? 'black' : 'white')};
        color: ${(props) => (props.variant === 'contained' ? 'white' : 'black')};

        &:hover {
            border-color: black;
            background-color: ${(props) => (props.variant === 'contained' ? 'black' : 'white')};
            color: ${(props) => (props.variant === 'contained' ? 'white' : 'black')};
        }
    }
`;
