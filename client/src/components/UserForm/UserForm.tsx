import React from 'react'
import { Formik } from "formik";
import * as Yup from 'yup'
import Modal from '../Modal'
import { ICustomModal } from './../Modal/Modal';
import { TextField, Box, Typography, FormHelperText} from '@mui/material'
import { FormWrapper} from './UserForm.styles'
import Button from '../Button';
import request from '../../helpers/request'
import { useStoreContext } from '../../context/StoreProvider'

interface FormModel {
    login: string;
    password: string;
    passwordConfirmation?: string;
}

interface IUserForm extends Omit<ICustomModal, "children"> {
    type: "login" | "register" | null,
    handleFormType: (type: "login" | "register" | null) => void;
}

const loginValidationSchema= Yup.object({
    login: Yup.string()
        .min(4, 'Your login is too short')
        .max(50, 'Your login is too long')
        .required('Field is required!'),
    password: Yup.string()
        .min(4, 'Your password is too short')
        .max(50, 'Your password is too long')
        .required('Field is required!')
})

const registerValidationSchema= Yup.object({
    login: Yup.string()
        .min(4, 'Your login is too short')
        .max(50, 'Your login is too long')
        .required('Field is required!'),
    password: Yup.string()
        .min(4, 'Your password is too short')
        .max(50, 'Your password is too long')
        .required('Field is required!'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const UserForm = ({type, open, handleClose, handleFormType}: IUserForm) => {

    const { setUser } = useStoreContext()
    const [validateMessage, setValidateMessage ] = React.useState<string | null>(null)

    const initValues = {
        login: '',
        password: '',
        passwordConfirmation: ''
    };

    if(type && open){
        return (
            <Modal open={open} handleClose={() => {setValidateMessage(null); handleClose()}}>
                <Formik<FormModel>
                    initialValues={initValues}
                    validationSchema={type === "login" ? loginValidationSchema : registerValidationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit = {async (values, {resetForm}) => {
                        if(type === "login"){
                            const { login, password } = values;
                            await request.post(
                                '/users',
                                { login, password })
                            .then((res) => {
                                const { data, status } = res
                                if(status === 200){
                                    setUser(data.user)
                                    handleClose()
                                    resetForm()
                                }
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const { message } = error.response.data
                                    setValidateMessage(message);
                                }
                            })
                        }

                        if(type === "register"){
                            const { login, password} = values;
                            await request.put(
                                '/users',
                                { login, password })
                            .then(({data, status}) => {
                                if(status === 201){
                                    setUser(data.user)
                                    handleClose()
                                    resetForm()
                                }
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const { message } = error.response.data
                                    setValidateMessage(message);
                                }
                            })
                        }
                    }}
                >
                    {({
                        handleSubmit,
                        resetForm,
                        values,
                        handleChange,
                        errors
                    }) => {
                        if(type === "login"){
                            return (
                                <>
                                    <Typography
                                        variant="h3"
                                        component="div"
                                        sx={{
                                            fontSize: '42px',
                                            mb: 4
                                        }}
                                    >
                                        Login to your account
                                    </Typography>
                                    <FormWrapper onSubmit={handleSubmit}>
                                        {validateMessage && (
                                            <FormHelperText sx={{display: {xs: 'block'},position: 'absolute', top: '-20%', color: 'error.main', fontWeight: 'bold', lineHeight: 1}}>{validateMessage}</FormHelperText>
                                        )}
                                        <TextField
                                            error={errors.login ? true : false}
                                            id="login"
                                            label={errors.login ? errors.login : "Your login"}
                                            variant="filled"
                                            color="secondary"
                                            name="login"
                                            value={values.login}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            error={errors.password ? true : false}
                                            id="password"
                                            label={errors.password ? errors.password : "Your password"}
                                            variant="filled"
                                            color="secondary"
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                    </FormWrapper>
                                    <Button variant="contained" sx={{mt: 2, mb: 2}} onClick={() => handleSubmit()}>Login</Button>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            component="span"
                                            sx={{
                                                mt: 10,
                                                fontSize: '14px',
                                                b: {
                                                    fontWeight: 'bold',
                                                    color: '#a435f0',
                                                    cursor: 'pointer'
                                                }
                                            }}
                                        >
                                            Don't have account yet? <b onClick={() => { resetForm(); setValidateMessage(null); handleFormType('register')}}>Register now.</b>
                                        </Typography>
                                    </Box>
                                </>
                            )
                        }
                        if(type === "register"){
                            return (
                                <>
                                    <Typography
                                        variant="h3"
                                        component="div"
                                        sx={{
                                            fontSize: '38px',
                                            mb: 4
                                        }}
                                    >
                                        Register new account
                                    </Typography>
                                    <FormWrapper onSubmit={handleSubmit}>
                                        {validateMessage && (
                                            <FormHelperText sx={{position: 'absolute', top: '-15%', color: 'error.main', fontWeight: 'bold', lineHeight: 1}}>{validateMessage}</FormHelperText>
                                        )}
                                        <TextField
                                            error={errors.login ? true : false}
                                            id="login"
                                            label={errors.login ? errors.login : "Your login"}
                                            variant="filled"
                                            color="secondary"
                                            name="login"
                                            value={values.login}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            error={errors.password ? true : false}
                                            id="password"
                                            label={errors.password ? errors.password : "Your password"}
                                            variant="filled"
                                            color="secondary"
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            error={errors.passwordConfirmation ? true : false}
                                            id="password confirmation"
                                            label={errors.passwordConfirmation ? errors.passwordConfirmation : "Repeat your password"}
                                            variant="filled"
                                            color="secondary"
                                            type="password"
                                            name="passwordConfirmation"
                                            value={values.passwordConfirmation}
                                            onChange={handleChange}
                                        />
                                    </FormWrapper>
                                    <Button variant="contained" sx={{mt: 2, mb: 2}} onClick={() => handleSubmit()}>Register</Button>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            component="span"
                                            sx={{
                                                mt: 10,
                                                fontSize: '14px',
                                                b: {
                                                    fontWeight: 'bold',
                                                    color: '#a435f0',
                                                    cursor: 'pointer'
                                                }
                                            }}
                                        >
                                            Have you already created an account? <b onClick={() =>{ resetForm(); setValidateMessage(null); handleFormType('login')}}>Login now.</b>
                                        </Typography>
                                    </Box>
                                </>
                            )
                        }
                    }}
                </Formik>
            </Modal>
        );
    }

    else return null

}

export default UserForm;