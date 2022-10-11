import React from 'react';
import { Box, Typography, Container, Grid, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import { useStoreContext } from '../context/StoreProvider';
import { CourseCard } from '../components/CourseCard';
import { useParams, useNavigate } from 'react-router';

const Wrapper = styled(Box)`
    margin-top: 75px;
    background-color: #1c1d1f;
    height: 220px;
    width: 100vw;
`;

const Courses = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [page, setPage] = React.useState<number>(params.page ? Number(params.page) : 1);
    const { courses } = useStoreContext();
    const firstCourseOnThePage = (page - 1) * 6;
    const lastCourseOnThePage = page * 6;
    const pages = Math.ceil(courses.length / 6);

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
        navigate(`/courses/${page}`);
    };

    React.useEffect(() => {
        if (pages > 0 && Number(params?.page) > pages) {
            setPage(pages);
            navigate(`/courses/${pages}`);
        }
        if (Number(params?.page) < 1) {
            setPage(1);
            navigate(`/courses/1`);
        }
    }, [params.page, pages, navigate]);

    return (
        <>
            <Wrapper>
                <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                    <Typography variant="h3" component="h1" sx={{ color: 'white', mb: 6 }}>
                        Courses
                    </Typography>
                </Container>
            </Wrapper>
            <section>
                <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', paddingY: 6 }}>
                    <Grid container spacing={2} sx={{ mb: 6 }}>
                        {courses.slice(firstCourseOnThePage, lastCourseOnThePage).map((course) => (
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
                        ))}
                    </Grid>
                    <Pagination count={pages} page={page} onChange={handlePaginationChange} variant="outlined" shape="rounded" />
                </Container>
            </section>
        </>
    );
};

export default Courses;
