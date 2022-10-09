import { CourseCard } from '../../components/CourseCard';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { useStoreContext } from '../../context/StoreProvider';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';

const Courses = () => {
    const { courses } = useStoreContext();

    return (
        <Box component="section" sx={{ paddingY: 6 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 4 }}>
                    Check the latest courses
                </Typography>
                <Grid container spacing={2}>
                    {courses.slice(0, 6).map((course) => (
                        <Grid item xs={12} sm={6} md={4}>
                            <CourseCard
                                key={course.id}
                                authors={course.authors}
                                description={course.description}
                                id={course.id}
                                img={course.img}
                                title={course.title}
                                price={course.price}
                                opinions={course.opinions}
                                rate={course.rate}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Link to="/courses" style={{ textDecoration: 'none' }}>
                    <Button variant="text" endIcon={<KeyboardArrowRightIcon />} sx={{ color: 'black', margin: '1rem 0 1rem auto' }}>
                        More courses
                    </Button>
                </Link>
            </Container>
        </Box>
    );
};

export default Courses;
