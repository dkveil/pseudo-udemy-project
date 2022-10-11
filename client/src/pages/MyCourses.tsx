import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Container, Grid, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { useStoreContext } from './../context/StoreProvider';
import { CourseCard } from '../components/CourseCard';
import { useLocation, useNavigate } from 'react-router-dom';

const Wrapper = styled(Box)`
    margin-top: 75px;
    background-color: #1c1d1f;
    height: 220px;
    width: 100vw;
`;

const MyCourses = () => {
    const [category, setCategory] = React.useState<'courses' | 'wishlist'>('wishlist');

    const { user, courses } = useStoreContext();
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (location.pathname === '/my-courses') {
            setCategory('courses');
        }
        if (location.pathname === '/wish-list') {
            setCategory('wishlist');
        }
    }, [location.pathname]);

    const handleChange = (event: React.SyntheticEvent, newValue: typeof category) => {
        setCategory(newValue);
        navigate(newValue === 'courses' ? '/my-courses' : '/wish-list');
    };

    return (
        <>
            <Wrapper>
                <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                    <Typography variant="h3" component="h1" sx={{ color: 'white', mb: 2 }}>
                        My courses
                    </Typography>
                    <Box>
                        <TabContext value={category}>
                            <Box>
                                <TabList textColor="primary" TabIndicatorProps={{ sx: { background: 'white' } }} onChange={handleChange}>
                                    <Tab sx={{ color: 'white' }} label="Courses" value="courses" />
                                    <Tab sx={{ color: 'white' }} label="Wish list" value="wishlist" />
                                </TabList>
                            </Box>
                        </TabContext>
                    </Box>
                </Container>
            </Wrapper>
            <section>
                <Container maxWidth="lg">
                    <Grid container spacing={2} sx={{ paddingY: 6 }}>
                        {user && category ? (
                            user[category].length === 0 ? (
                                <Typography>You have no courses here</Typography>
                            ) : (
                                <>
                                    {user[category].map((item) => {
                                        const course = courses.find((course) => course.id === item);

                                        if (course) {
                                            return (
                                                <Grid item xs={12} sm={6} md={4} key={course.id}>
                                                    <CourseCard
                                                        id={course.id}
                                                        title={course.title}
                                                        authors={course.authors}
                                                        description={course.description}
                                                        img={course.img}
                                                        price={course.price}
                                                        rate={course.rate}
                                                        opinions={course.opinions}
                                                    />
                                                </Grid>
                                            );
                                        }
                                        return null;
                                    })}
                                </>
                            )
                        ) : (
                            <Typography variant="subtitle1">You have no access to this page! Please log in first!</Typography>
                        )}
                    </Grid>
                </Container>
            </section>
        </>
    );
};

export default MyCourses;
