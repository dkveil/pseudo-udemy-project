import React from 'react';
import { Formik } from 'formik';
import Modal from '../Modal';
import { ICustomModal } from './../Modal/Modal';
import { TextField, Box, Typography, FormHelperText } from '@mui/material';
import { FormWrapper } from './UserForm.styles';
import Button from '../Button';
import request from '../../helpers/request';
import { useStoreContext } from '../../context/StoreProvider';
import {
    loginValidationSchema,
    registerValidationSchema,
    addFundsValidationSchema,
    changeProfilePictureValidationSchema,
    changeUsernameValidationSchema,
    changePasswordValidationSchema,
} from './validateSchemas';
import { initValues } from './initValues';

export type IUserForm = Omit<ICustomModal, 'children'> & {
    type: 'login' | 'register' | 'change username' | 'change password' | 'change of profile picture' | 'add funds' | null;
    handleFormType: (type: IUserForm['type']) => void;
};

interface FormModel {
    login: string;
    password: string;
    passwordConfirmation?: string;
    funds: number | undefined;
    newPassword?: string;
    img?: string;
}

const UserForm = ({ type, open, handleClose, handleFormType }: IUserForm) => {
    const { setUser, user } = useStoreContext();
    const [validateMessage, setValidateMessage] = React.useState<string | null>(null);

    const returnValidation = (type: IUserForm['type']) => {
        if (type !== null) {
            const validations = {
                login: loginValidationSchema,
                register: registerValidationSchema,
                'change username': changeUsernameValidationSchema,
                'change password': changePasswordValidationSchema,
                'change of profile picture': changeProfilePictureValidationSchema,
                'add funds': addFundsValidationSchema,
            };

            return validations[type];
        }
    };

    if (type && open) {
        return (
            <Modal
                open={open}
                handleClose={() => {
                    setValidateMessage(null);
                    handleClose();
                }}
            >
                <Formik<FormModel>
                    initialValues={initValues}
                    validationSchema={returnValidation(type)}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={async (values, { resetForm }) => {
                        if (type === 'login') {
                            const { login, password } = values;
                            await request
                                .post('/users', { login, password })
                                .then((res) => {
                                    const { data, status } = res;
                                    if (status === 200) {
                                        setUser(data.user);
                                        handleClose();
                                        resetForm();
                                    }
                                })
                                .catch((error) => {
                                    if (error.response) {
                                        const { message } = error.response.data;
                                        setValidateMessage(message);
                                    }
                                });
                        }

                        if (type === 'register') {
                            const { login, password } = values;
                            await request
                                .put('/users', { login, password })
                                .then(({ data, status }) => {
                                    if (status === 201) {
                                        setUser(data.user);
                                        handleClose();
                                        resetForm();
                                    }
                                })
                                .catch((error) => {
                                    if (error.response) {
                                        const { message } = error.response.data;
                                        setValidateMessage(message);
                                    }
                                });
                        }

                        if (type === 'add funds') {
                            const { funds } = values;
                            await request
                                .patch('/users', {
                                    login: user?.login,
                                    addedFunds: funds,
                                    action: 'adding funds',
                                })
                                .then(({ data, status }) => {
                                    if (status === 202) {
                                        setUser(data.user);
                                        handleClose();
                                        resetForm();
                                    }
                                })
                                .catch((error) => {
                                    if (error.response) {
                                        const { message } = error.response.data;
                                        setValidateMessage(message);
                                    }
                                });
                        }

                        if (type === 'change username') {
                            const { login } = values;
                            await request
                                .patch('/users', {
                                    login: user?.login,
                                    newLogin: login,
                                    action: 'changing username',
                                })
                                .then(({ data, status }) => {
                                    if (status === 202) {
                                        setUser(data.user);
                                        handleClose();
                                        resetForm();
                                    }
                                })
                                .catch((error) => {
                                    if (error.response) {
                                        const { message } = error.response.data;
                                        setValidateMessage(message);
                                    }
                                });
                        }
                        if (type === 'change password') {
                            const { password, newPassword } = values;
                            await request
                                .patch('/users', {
                                    login: user?.login,
                                    checkedPassword: password,
                                    newPassword,
                                    action: 'changing password',
                                })
                                .then(({ data, status }) => {
                                    if (status === 202) {
                                        setUser(data.user);
                                        handleClose();
                                        resetForm();
                                    }
                                })
                                .catch((error) => {
                                    if (error.response) {
                                        const { message } = error.response.data;
                                        setValidateMessage(message);
                                    }
                                });
                        }
                        if (type === 'change of profile picture') {
                            const { img } = values;
                            console.log(img);
                            console.log(user);
                            await request
                                .patch('/users', {
                                    login: user?.login,
                                    img,
                                    action: 'changing profile picture',
                                })
                                .then(({ data, status }) => {
                                    if (status === 202) {
                                        setUser(data.user);
                                        handleClose();
                                        resetForm();
                                    }
                                })
                                .catch((error) => {
                                    if (error.response) {
                                        const { message } = error.response.data;
                                        setValidateMessage(message);
                                    }
                                });
                        }
                    }}
                >
                    {({ handleSubmit, resetForm, values, handleChange, errors }) => {
                        if (type === 'login') {
                            return (
                                <>
                                    <Typography
                                        variant="h3"
                                        component="div"
                                        sx={{
                                            fontSize: '42px',
                                            mb: 4,
                                        }}
                                    >
                                        Login to your account
                                    </Typography>
                                    <FormWrapper onSubmit={handleSubmit}>
                                        {validateMessage && (
                                            <FormHelperText
                                                sx={{
                                                    display: { xs: 'block' },
                                                    position: 'absolute',
                                                    top: '-15%',
                                                    color: 'error.main',
                                                    fontWeight: 'bold',
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {validateMessage}
                                            </FormHelperText>
                                        )}
                                        <TextField
                                            error={errors.login ? true : false}
                                            id="login"
                                            label={errors.login ? errors.login : 'Your login'}
                                            variant="filled"
                                            color="secondary"
                                            name="login"
                                            value={values.login}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            error={errors.password ? true : false}
                                            id="password"
                                            label={errors.password ? errors.password : 'Your password'}
                                            variant="filled"
                                            color="secondary"
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                    </FormWrapper>
                                    <Button variant="contained" sx={{ mt: 2, mb: 2 }} onClick={() => handleSubmit()}>
                                        Login
                                    </Button>
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
                                                    cursor: 'pointer',
                                                },
                                            }}
                                        >
                                            Don't have account yet?{' '}
                                            <b
                                                onClick={() => {
                                                    resetForm();
                                                    setValidateMessage(null);
                                                    handleFormType('register');
                                                }}
                                            >
                                                Register now.
                                            </b>
                                        </Typography>
                                    </Box>
                                </>
                            );
                        }
                        if (type === 'register') {
                            return (
                                <>
                                    <Typography
                                        variant="h3"
                                        component="div"
                                        sx={{
                                            fontSize: '38px',
                                            mb: 4,
                                        }}
                                    >
                                        Register new account
                                    </Typography>
                                    <FormWrapper onSubmit={handleSubmit}>
                                        {validateMessage && (
                                            <FormHelperText
                                                sx={{
                                                    position: 'absolute',
                                                    top: '-10%',
                                                    color: 'error.main',
                                                    fontWeight: 'bold',
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {validateMessage}
                                            </FormHelperText>
                                        )}
                                        <TextField
                                            error={errors.login ? true : false}
                                            id="login"
                                            label={errors.login ? errors.login : 'Your login'}
                                            variant="filled"
                                            color="secondary"
                                            name="login"
                                            value={values.login}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            error={errors.password ? true : false}
                                            id="password"
                                            label={errors.password ? errors.password : 'Your password'}
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
                                            label={errors.passwordConfirmation ? errors.passwordConfirmation : 'Repeat your password'}
                                            variant="filled"
                                            color="secondary"
                                            type="password"
                                            name="passwordConfirmation"
                                            value={values.passwordConfirmation}
                                            onChange={handleChange}
                                        />
                                    </FormWrapper>
                                    <Button variant="contained" sx={{ mt: 2, mb: 2 }} onClick={() => handleSubmit()}>
                                        Register
                                    </Button>
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
                                                    cursor: 'pointer',
                                                },
                                            }}
                                        >
                                            Have you already created an account?{' '}
                                            <b
                                                onClick={() => {
                                                    resetForm();
                                                    setValidateMessage(null);
                                                    handleFormType('login');
                                                }}
                                            >
                                                Login now.
                                            </b>
                                        </Typography>
                                    </Box>
                                </>
                            );
                        }
                        if (type === 'add funds') {
                            return (
                                <>
                                    <Typography
                                        variant="h3"
                                        component="div"
                                        sx={{
                                            fontSize: '38px',
                                            mb: 4,
                                        }}
                                    >
                                        Add funds
                                    </Typography>
                                    <FormWrapper onSubmit={handleSubmit}>
                                        {validateMessage && (
                                            <FormHelperText
                                                sx={{
                                                    position: 'absolute',
                                                    top: '-35%',
                                                    color: 'error.main',
                                                    fontWeight: 'bold',
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {validateMessage}
                                            </FormHelperText>
                                        )}
                                        <TextField
                                            error={errors.funds ? true : false}
                                            id="funds"
                                            label={errors.funds ? errors.funds : 'How much do you want to add funds?'}
                                            variant="filled"
                                            color="secondary"
                                            name="funds"
                                            value={values.funds}
                                            inputProps={{
                                                step: 0.01,
                                                min: 0,
                                            }}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </FormWrapper>
                                    <Button variant="contained" sx={{ mt: 4, mb: 2 }} onClick={() => handleSubmit()}>
                                        Add funds
                                    </Button>
                                </>
                            );
                        }
                        if (type === 'change username') {
                            return (
                                <>
                                    <Typography
                                        variant="h3"
                                        component="div"
                                        sx={{
                                            fontSize: '38px',
                                            mb: 4,
                                        }}
                                    >
                                        Change username
                                    </Typography>
                                    <FormWrapper onSubmit={handleSubmit}>
                                        {validateMessage && (
                                            <FormHelperText
                                                sx={{
                                                    position: 'absolute',
                                                    top: '-35%',
                                                    color: 'error.main',
                                                    fontWeight: 'bold',
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {validateMessage}
                                            </FormHelperText>
                                        )}
                                        <TextField
                                            error={errors.login ? true : false}
                                            id="login"
                                            label={errors.login ? errors.login : 'New username'}
                                            variant="filled"
                                            color="secondary"
                                            name="login"
                                            value={values.login}
                                            onChange={handleChange}
                                            type="string"
                                        />
                                    </FormWrapper>
                                    <Button variant="contained" sx={{ mt: 4, mb: 2 }} onClick={() => handleSubmit()}>
                                        Change
                                    </Button>
                                </>
                            );
                        }
                        if (type === 'change of profile picture') {
                            return (
                                <>
                                    <Typography
                                        variant="h3"
                                        component="div"
                                        sx={{
                                            fontSize: '38px',
                                            mb: 4,
                                        }}
                                    >
                                        Change your profile picture
                                    </Typography>
                                    <FormWrapper onSubmit={handleSubmit}>
                                        {validateMessage && (
                                            <FormHelperText
                                                sx={{
                                                    position: 'absolute',
                                                    top: '-35%',
                                                    color: 'error.main',
                                                    fontWeight: 'bold',
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {validateMessage}
                                            </FormHelperText>
                                        )}
                                        <TextField
                                            error={errors.img ? true : false}
                                            id="img"
                                            label={errors.img ? errors.img : 'Link to your profile picture'}
                                            variant="filled"
                                            color="secondary"
                                            name="img"
                                            value={values.img}
                                            onChange={handleChange}
                                        />
                                    </FormWrapper>
                                    <Button variant="contained" sx={{ mt: 4, mb: 2 }} onClick={() => handleSubmit()}>
                                        Change
                                    </Button>
                                </>
                            );
                        }
                        if (type === 'change password') {
                            return (
                                <>
                                    <Typography
                                        variant="h3"
                                        component="div"
                                        sx={{
                                            fontSize: '38px',
                                            mb: 4,
                                        }}
                                    >
                                        Change password
                                    </Typography>
                                    <FormWrapper onSubmit={handleSubmit}>
                                        {validateMessage && (
                                            <FormHelperText
                                                sx={{
                                                    position: 'absolute',
                                                    top: '-10%',
                                                    color: 'error.main',
                                                    fontWeight: 'bold',
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {validateMessage}
                                            </FormHelperText>
                                        )}
                                        <TextField
                                            error={errors.password ? true : false}
                                            id="password"
                                            label={errors.password ? errors.password : 'Your old password'}
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
                                            label={errors.passwordConfirmation ? errors.passwordConfirmation : 'Repeat your password'}
                                            variant="filled"
                                            color="secondary"
                                            type="password"
                                            name="passwordConfirmation"
                                            value={values.passwordConfirmation}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            error={errors.newPassword ? true : false}
                                            id="newPassword"
                                            label={errors.newPassword ? errors.password : 'Your new password'}
                                            variant="filled"
                                            color="secondary"
                                            type="password"
                                            name="newPassword"
                                            value={values.newPassword}
                                            onChange={handleChange}
                                        />
                                    </FormWrapper>
                                    <Button variant="contained" sx={{ mt: 4, mb: 2 }} onClick={() => handleSubmit()}>
                                        Change
                                    </Button>
                                </>
                            );
                        }
                    }}
                </Formik>
            </Modal>
        );
    } else return null;
};

export default UserForm;
