import { CourseCard } from '../../../components/CourseCard';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { useStoreContext } from '../../../context/StoreProvider';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import { sortCoursesArray } from '../../../utils/sortCoursesArray';

const Courses = () => {
    const { courses } = useStoreContext();

    return (
        <Box component="section" sx={{ paddingY: 4 }}>
            <Container maxWidth="lg">
                <Typography component="h2" sx={{ fontWeight: 'bold', mb: 3, fontSize: 28 }}>
                    Check the latest courses
                </Typography>
                <Grid container spacing={2} columns={60}>
                    {sortCoursesArray(courses, 'by date DESC')
                        .slice(0, 5)
                        .map((course, index) => (
                            <Grid item xs={60} sm={20} md={12} key={course.id}>
                                <CourseCard
                                    authors={course.authors}
                                    id={course.id}
                                    img={course.img}
                                    dateAdded={course.dateAdded}
                                    price={course.price}
                                    promotionPrice={course.promotionPrice}
                                    duration={course.duration}
                                    title={course.title}
                                    description={course.description}
                                    opinions={course.opinions}
                                    rate={course.rate}
                                    benefits={course.benefits}
                                    lastChildInRow={(index + 1) % 5 === 0 ? true : false}
                                />
                            </Grid>
                        ))}
                </Grid>
                <Link to="/courses" style={{ textDecoration: 'none' }}>
                    <Button variant="text" endIcon={<KeyboardArrowRightIcon />} sx={{ color: 'black', marginY: 4 }}>
                        More courses
                    </Button>
                </Link>
            </Container>
        </Box>
    );
};

export default Courses;
