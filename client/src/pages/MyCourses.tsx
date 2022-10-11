import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Container, Grid } from '@mui/material';
import { useStoreContext } from './../context/StoreProvider';
import { CourseCard } from '../components/CourseCard';

const Wrapper = styled(Box)`
    margin-top: 75px;
    background-color: #1c1d1f;
    height: 220px;
    width: 100vw;
`;

const MyCourses = () => {
    const { user, courses } = useStoreContext();

    console.log(user?.courses);

    return (
        <>
            <Wrapper>
                <Container
                    maxWidth="lg"
                    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', paddingY: 8 }}
                >
                    <Typography variant="h3" component="h1" sx={{ color: 'white' }}>
                        My courses
                    </Typography>
                </Container>
            </Wrapper>
            <section>
                <Container maxWidth="lg">
                    {user ? (
                        <Grid container spacing={2} sx={{ paddingY: 6 }}>
                            {user.courses.map((item) => {
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
                        </Grid>
                    ) : null}
                </Container>
            </section>
        </>
    );
};

export default MyCourses;
