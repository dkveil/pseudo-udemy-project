import React from 'react';
import { Box, Typography, Container, Grid, Pagination, Tab } from '@mui/material';
import { TabList, TabContext } from '@mui/lab';
import { styled } from '@mui/system';
import { useStoreContext } from '../context/StoreProvider';
import { CourseCard } from '../components/CourseCard';
import { useParams, useNavigate } from 'react-router';
import { sortCoursesArray } from '../utils/sortCoursesArray';

const Wrapper = styled(Box)`
    margin-top: 75px;
    background-color: #1c1d1f;
    height: 220px;
    width: 100vw;
`;

const tabsData = [
    {
        label: 'Newest',
        method: 'by date DESC',
    },
    {
        label: 'The most popular',
        method: 'by popular',
    },
    {
        label: 'Top rated',
        method: 'by rate',
    },
];

const Courses = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [page, setPage] = React.useState<number>(params.page ? Number(params.page) : 1);
    const { courses } = useStoreContext();
    const courseCardsPerPage = 15;
    const firstCourseOnThePage = (page - 1) * courseCardsPerPage;
    const lastCourseOnThePage = page * courseCardsPerPage;
    const pages = Math.ceil(courses.length / courseCardsPerPage);
    const [sortMethod, setSortMethod] = React.useState<'by date DESC' | 'by popular' | 'by rate'>('by rate');

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

    const handleChange = (event: React.SyntheticEvent, newValue: typeof sortMethod) => {
        setSortMethod(newValue);
    };

    return (
        <>
            <Wrapper>
                <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                    <Typography variant="h3" component="h1" sx={{ color: 'white', mb: 2 }}>
                        Courses
                    </Typography>
                    <Box>
                        <TabContext value={sortMethod}>
                            <Box>
                                <TabList textColor="primary" TabIndicatorProps={{ sx: { background: 'white' } }} onChange={handleChange}>
                                    {tabsData.map((tab) => (
                                        <Tab sx={{ color: 'white' }} label={tab.label} value={tab.method} />
                                    ))}
                                </TabList>
                            </Box>
                        </TabContext>
                    </Box>
                </Container>
            </Wrapper>
            <section>
                <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', paddingY: 6, paddingX: 2 }}>
                    <Grid container spacing={1} sx={{ mb: 6 }} columns={60}>
                        {sortCoursesArray(courses, sortMethod)
                            .slice(firstCourseOnThePage, lastCourseOnThePage)
                            .map((course, index) => (
                                <Grid item xs={60} sm={15} md={12} key={course.id}>
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
                    {pages > 2 ? (
                        <Pagination count={pages} page={page} onChange={handlePaginationChange} variant="outlined" shape="rounded" />
                    ) : null}
                </Container>
            </section>
        </>
    );
};

export default Courses;
