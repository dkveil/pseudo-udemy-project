import { Formik, Field, FieldArray } from 'formik';
import Modal from '../Modal';
import { ICustomModal } from '../Modal/Modal';
import { IFormWrapper, FormWrapper } from '../UserForm/UserForm.styles';
import * as Yup from 'yup';
import Button from '../Button';
import { Typography, TextField, Rating, Box, FormControlLabel, Switch } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';

export type ICourseManagementForm = Omit<ICustomModal, 'children'> & {
    type: 'add course' | null;
} & IFormWrapper;

interface FormModel {
    img: string;
    title: string;
    description: string;
    authors: string[];
    price: number;
    usePromotionPrice: boolean;
    promotionPrice: undefined | number;
    duration: number;
    benefits: string[];
    opinions: number;
    rate: number;
}

const validationSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
    authors: Yup.array().of(Yup.string()).required().min(1),
    img: Yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required(),
    price: Yup.number().required().min(0.1),
    usePromotionPrice: Yup.boolean().required(),
    promotionPrice: Yup.number().when('usePromtionPrice', {
        is: (usePromotionPrice: boolean) => usePromotionPrice,
        then: Yup.number().required().min(0.1),
    }),
    duration: Yup.number().min(0.1).required(),
    benefits: Yup.array().of(Yup.string()).required().min(1),
    opinions: Yup.number()
        .when('rate', {
            is: (rate: number) => rate > 0,
            then: Yup.number().min(1).required(),
        })
        .required()
        .test('opinions', 'Number of opinions must be natural', (opinions) => Number(opinions) % 1 === 0),
    rate: Yup.number().min(0).max(5).required(),
});

const CourseManagementForm = ({ open, handleClose, width, height, padding }: ICourseManagementForm) => {
    const initValues = {
        title: '',
        description: '',
        authors: [],
        img: '',
        price: 0,
        usePromotionPrice: false,
        promotionPrice: 0,
        duration: 0,
        benefits: [],
        opinions: 0,
        rate: 0,
    };

    return (
        <Modal handleClose={handleClose} open={open} width={width} height={height}>
            <Formik<FormModel>
                validationSchema={validationSchema}
                initialValues={initValues}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values) => {
                    alert(JSON.stringify(values));
                }}
            >
                {({ handleSubmit, errors, values, handleChange, setFieldValue }) => {
                    return (
                        <FormWrapper onSubmit={handleSubmit} padding={padding}>
                            <Typography
                                variant="h3"
                                component="div"
                                sx={{
                                    fontSize: '38px',
                                    mb: 4,
                                }}
                            >
                                Add new course
                            </Typography>

                            <TextField
                                error={errors.title ? true : false}
                                id="title"
                                label={errors.title ? errors.title : 'Title'}
                                variant="filled"
                                color="secondary"
                                type="string"
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                            />
                            <TextField
                                error={errors.description ? true : false}
                                id="description"
                                label={errors.description ? errors.description : 'Course description'}
                                variant="filled"
                                color="secondary"
                                type="string"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                            />
                            <MuiChipsInput
                                error={errors.authors ? true : false}
                                id="authors"
                                label={errors.authors ? errors.authors : 'Authors of the course'}
                                variant="filled"
                                color="secondary"
                                name="authors"
                                value={values.authors}
                                onChange={(value: string[]) => setFieldValue('authors', value)}
                            />
                            <TextField
                                error={errors.img ? true : false}
                                id="img"
                                label={errors.img ? errors.img : 'Link to the course photo'}
                                variant="filled"
                                color="secondary"
                                type="string"
                                name="img"
                                value={values.img}
                                onChange={handleChange}
                            />
                            <TextField
                                error={errors.price ? true : false}
                                id="price"
                                label={errors.price ? errors.price : 'Price in Euro'}
                                variant="filled"
                                color="secondary"
                                type="number"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            defaultChecked
                                            checked={values.usePromotionPrice}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setFieldValue('usePromotionPrice', e.target.checked)
                                            }
                                        />
                                    }
                                    label="Use the promotional price?"
                                />
                                <TextField
                                    error={errors.promotionPrice ? true : false}
                                    id="promotionPrice"
                                    label={errors.promotionPrice ? errors.promotionPrice : 'Promotion price in Euro'}
                                    variant="filled"
                                    color="secondary"
                                    type="number"
                                    name="promotionPrice"
                                    value={values.promotionPrice}
                                    onChange={handleChange}
                                    sx={{ width: '20%' }}
                                />
                            </Box>
                            <MuiChipsInput
                                error={errors.benefits ? true : false}
                                id="benefits"
                                label={errors.benefits ? errors.benefits : 'Benefits of the course'}
                                variant="filled"
                                color="secondary"
                                name="benefits"
                                value={values.benefits}
                                onChange={(value: string[]) => setFieldValue('benefits', value)}
                            />
                            <TextField
                                error={errors.duration ? true : false}
                                id="duration"
                                label={errors.duration ? errors.duration : 'Duration of the course in hours'}
                                variant="filled"
                                color="secondary"
                                type="number"
                                name="duration"
                                value={values.duration}
                                onChange={handleChange}
                                inputProps={{
                                    min: 0,
                                    step: 0.1,
                                }}
                            />
                            <TextField
                                error={errors.opinions ? true : false}
                                id="opinions"
                                label={errors.opinions ? errors.opinions : 'Number of opinions'}
                                variant="filled"
                                color="secondary"
                                type="number"
                                name="opinions"
                                value={values.opinions}
                                onChange={handleChange}
                                inputProps={{
                                    min: 0,
                                    step: 1,
                                }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TextField
                                    error={errors.rate ? true : false}
                                    id="rate"
                                    label={errors.rate ? errors.rate : 'Rate'}
                                    variant="filled"
                                    color="secondary"
                                    type="number"
                                    name="rate"
                                    value={values.rate}
                                    onChange={handleChange}
                                    sx={{ width: '40%' }}
                                    inputProps={{
                                        min: 0,
                                        max: 5,
                                        step: 0.1,
                                    }}
                                />
                                <Rating name="rate" value={values.rate} onChange={handleChange} precision={0.1} sx={{ fontSize: 32 }} />
                            </Box>
                            <Button variant="contained" sx={{ mt: 4, mb: 2 }} onClick={() => handleSubmit()}>
                                Add new course
                            </Button>
                        </FormWrapper>
                    );
                }}
            </Formik>
        </Modal>
    );
};

export default CourseManagementForm;