import { styled } from '@mui/system'
import Badge from '@mui/material/Badge'

export default styled(Badge)`

    ${({theme}) => theme.breakpoints.up(0)} {

        .MuiBadge-badge{
            background-color: #a435f0;
        }
    }
`
