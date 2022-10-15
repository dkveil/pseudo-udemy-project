import { Typography, Box, Container, Grid } from '@mui/material';
import { CourseCard } from '../../../components/CourseCard';
import { useStoreContext } from '../../../context/StoreProvider';

const MostPopular = () => {
    const { courses } = useStoreContext();

    const mostOpinions = Math.max(...courses.map((o) => o.opinions));
    const mostPopularCourse = courses.find((course) => course.opinions === mostOpinions);

    return (
        <Box component="section" sx={{ paddingY: 4 }}>
            <Container>
                <Typography component="h2" sx={{ fontWeight: 'bold', mb: 3, fontSize: 28 }}>
                    Most Popular
                </Typography>
                <Grid container>
                    <Grid item xs={16}>
                        {mostPopularCourse && (
                            <CourseCard
                                mostPopularSection
                                authors={mostPopularCourse.authors}
                                id={mostPopularCourse.id}
                                img={mostPopularCourse.img}
                                dateAdded={mostPopularCourse.dateAdded}
                                price={mostPopularCourse.price}
                                usePromotionPrice={mostPopularCourse.usePromotionPrice}
                                promotionPrice={mostPopularCourse.promotionPrice}
                                duration={mostPopularCourse.duration}
                                title={mostPopularCourse.title}
                                description={mostPopularCourse.description}
                                opinions={mostPopularCourse.opinions}
                                rate={mostPopularCourse.rate}
                                benefits={mostPopularCourse.benefits}
                                withPopover={false}
                            />
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default MostPopular;
