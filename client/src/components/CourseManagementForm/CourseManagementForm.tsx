import { Formik } from 'formik';
import Modal from '../Modal';
import { ICustomModal } from '../Modal/Modal';
import { IFormWrapper, FormWrapper } from '../UserForm/UserForm.styles';
import * as Yup from 'yup';
import Button from '../Button';
import { Typography, TextField, Rating, Box, FormControlLabel, Switch } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import axios from 'axios';
import request from '../../helpers/request';
import { useStoreContext, ICourse } from '../../context/StoreProvider';

export type ICourseManagementForm = Omit<ICustomModal, 'children'> & {
    type: 'add course' | 'edit course' | null;
    editedCourse: ICourse | null;
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

const CourseManagementForm = ({ open, handleClose, width, height, padding, type, editedCourse }: ICourseManagementForm) => {
    const { setCourses } = useStoreContext();

    const initValues = {
        title: editedCourse?.title || '',
        description: editedCourse?.description || '',
        authors: editedCourse?.authors || [],
        img: editedCourse?.img || '',
        price: editedCourse?.price || 0,
        usePromotionPrice: editedCourse?.usePromotionPrice || false,
        promotionPrice: editedCourse?.promotionPrice || 0,
        duration: editedCourse?.duration || 0,
        benefits: editedCourse?.benefits || [],
        opinions: editedCourse?.opinions || 0,
        rate: editedCourse?.rate || 0,
    };

    return (
        <Modal handleClose={handleClose} open={open} width={width} height={height}>
            <Formik<FormModel>
                validationSchema={validationSchema}
                initialValues={initValues}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values) => {
                    if (type === 'add course') {
                        const {
                            title,
                            description,
                            authors,
                            img,
                            price,
                            usePromotionPrice,
                            promotionPrice,
                            duration,
                            benefits,
                            opinions,
                            rate,
                        } = values;

                        try {
                            const { data, status } = await request.post('/courses', {
                                title,
                                authors,
                                dateAdded: new Date().toISOString(),
                                description,
                                duration,
                                img,
                                price,
                                usePromotionPrice,
                                promotionPrice,
                                rate,
                                benefits,
                                opinions,
                            });

                            if (status === 201) {
                                setCourses(data.courses);
                                handleClose();
                            }
                        } catch (error) {
                            if (axios.isAxiosError(error)) {
                                console.log(error);
                            }
                        }
                    }
                    if (type === 'edit course') {
                        const {
                            title,
                            description,
                            authors,
                            img,
                            price,
                            usePromotionPrice,
                            promotionPrice,
                            duration,
                            benefits,
                            opinions,
                            rate,
                        } = values;

                        try {
                            const { data, status } = await request.patch('/courses', {
                                id: editedCourse?.id,
                                title,
                                authors,
                                dateAdded: editedCourse?.dateAdded,
                                description,
                                duration,
                                img,
                                price,
                                usePromotionPrice,
                                promotionPrice,
                                rate,
                                benefits,
                                opinions,
                            });

                            if (status === 202) {
                                setCourses(data.courses);
                                handleClose();
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
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
                                    ':first-letter': {
                                        textTransform: 'uppercase',
                                    },
                                }}
                            >
                                {type === 'add course' ? 'Add new course' : type === 'edit course' && type}
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
                                inputProps={{
                                    min: 0,
                                    step: 0.01,
                                }}
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
                                    inputProps={{
                                        min: 0,
                                        step: 0.01,
                                    }}
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
                                {type === 'add course' ? 'Add new course' : type === 'edit course' && type}
                            </Button>
                        </FormWrapper>
                    );
                }}
            </Formik>
        </Modal>
    );
};

export default CourseManagementForm;
