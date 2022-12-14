import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    login: Yup.string().min(4, 'Your login is too short').max(50, 'Your login is too long').required('Field is required!'),
    password: Yup.string().min(4, 'Your password is too short').max(50, 'Your password is too long').required('Field is required!'),
});

export const registerValidationSchema = Yup.object({
    login: Yup.string().min(4, 'Your login is too short').max(50, 'Your login is too long').required('Field is required!'),
    password: Yup.string().min(4, 'Your password is too short').max(50, 'Your password is too long').required('Field is required!'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const addFundsValidationSchema = Yup.object({
    funds: Yup.number().required("Field is required").min(0.01, 'The amount is too small to be added')
})

export const changeUsernameValidationSchema = Yup.object({
    login: Yup.string().min(4, 'Your login is too short').max(50, 'Your login is too long').required('Field is required!'),
})

export const changeProfilePictureValidationSchema = Yup.object({
    img: Yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Image is required'),
})

export const changePasswordValidationSchema = Yup.object({
    password: Yup.string().min(4, 'Your password is too short').max(50, 'Your password is too long').required('Field is required!'),
    newPassword: Yup.string().min(4, 'Your password is too short').max(50, 'Your password is too long').required('Field is required!'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})