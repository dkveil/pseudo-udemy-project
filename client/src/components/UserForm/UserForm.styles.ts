import {styled} from '@mui/material/'

export interface IFormWrapper {
    padding?: string
}

export const FormWrapper = styled('form')<IFormWrapper>`
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding-top: ${({padding}) => padding ? padding : null};
`