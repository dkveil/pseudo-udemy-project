import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Container, Grid, Card, CardContent, Pagination, Tab } from '@mui/material';
import { TabList, TabContext } from '@mui/lab';
import { useStoreContext } from '../context/StoreProvider';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useLocation, useNavigate, useParams } from 'react-router';
import { sortCoursesArray } from '../utils/sortCoursesArray';
import { CourseCard } from '../components/CourseCard';
import AddIcon from '@mui/icons-material/Add';
import { tabsData } from './Courses';
import CourseManagementForm, { ICourseManagementForm } from '../components/CourseManagementForm/CourseManagementForm';

const Wrapper = styled(Box)`
    margin-top: 75px;
    background-color: #1c1d1f;
    height: 220px;
    width: 100vw;
`;

interface ISetting {
    name: string;
    icon: React.ReactNode;
    link: string;
}

const settingsList: ISetting[] = [
    {
        name: 'Course Management',
        icon: <ViewListIcon sx={{ fontSize: 160 }} />,
        link: '/admin-panel/courses',
    },
    {
        name: 'User Management',
        icon: <PeopleAltIcon sx={{ fontSize: 160 }} />,
        link: '/admin-panel/users',
    },
];

const AdminPanel = () => {
    const [page, setPage] = React.useState<number>(1);
    const [sortMethod, setSortMethod] = React.useState<'by date DESC' | 'by popular' | 'by rate'>('by rate');
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [formType, setFormType] = React.useState<ICourseManagementForm['type']>(null);
    const { user, courses } = useStoreContext();
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const courseCardsPerPage = 15;
    const firstCourseOnThePage = (page - 1) * courseCardsPerPage;
    const lastCourseOnThePage = page * courseCardsPerPage;
    const pages = Math.ceil(courses.length / courseCardsPerPage);

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    };

    const handleSortMethodChange = (event: React.SyntheticEvent, newValue: typeof sortMethod) => {
        setSortMethod(newValue);
    };

    const handleOpenModal = (type: typeof formType) => {
        setOpenModal(true);
        setFormType(type);
    };

    React.useEffect(() => {
        if (params.managementtype && params.managementtype !== 'courses' && params.managementtype !== 'users') {
            navigate('/admin-panel');
        }
        if (user?.accessLevel !== 1) {
            navigate('/');
        }
    }, [params.managementtype, navigate, user]);

    const AdminPanelView = () => {
        if (location.pathname === '/admin-panel') {
            return (
                <>
                    {settingsList.map((item) => (
                        <Grid item key={item.name} xs={12} sm={6} md={3}>
                            <Card sx={{ height: 280, textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(item.link)}>
                                <CardContent>
                                    {item.icon}
                                    <Typography variant="h5">{item.name}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </>
            );
        }

        if (params.managementtype === 'courses') {
            return (
                <>
                    <Grid container spacing={1} sx={{ mb: 6 }} columns={60}>
                        <Grid item xs={60} sm={15} md={12}>
                            <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleOpenModal('add course')}>
                                <CardContent>
                                    <AddIcon sx={{ fontSize: 160 }} />
                                    <Typography variant="h5">Add new course</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        {sortCoursesArray(courses, sortMethod)
                            .slice(firstCourseOnThePage, lastCourseOnThePage)
                            .map((course, index) => (
                                <Grid item xs={60} sm={15} md={12} key={course.id} sx={{ position: 'relative' }}>
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
                                        withPopover={false}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                    {pages > 2 ? (
                        <Pagination count={pages} page={page} onChange={handlePaginationChange} variant="outlined" shape="rounded" />
                    ) : null}
                </>
            );
        }

        if (params.managementtype === 'users') {
            return (
                <>
                    <div>
                        <div>
                            <div>users</div>
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <Wrapper>
                <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                    <Typography variant="h3" component="h1" sx={{ color: 'white', mb: params.managementtype === 'courses' ? 2 : 6 }}>
                        {location.pathname === '/admin-panel'
                            ? 'AdminPanel'
                            : params.managementtype === 'courses'
                            ? 'Course Management'
                            : 'User Management'}
                    </Typography>
                    {params.managementtype === 'courses' && (
                        <Box>
                            <TabContext value={sortMethod}>
                                <Box>
                                    <TabList
                                        textColor="primary"
                                        TabIndicatorProps={{ sx: { background: 'white' } }}
                                        onChange={handleSortMethodChange}
                                    >
                                        {tabsData.map((tab) => (
                                            <Tab sx={{ color: 'white' }} label={tab.label} value={tab.method} />
                                        ))}
                                    </TabList>
                                </Box>
                            </TabContext>
                        </Box>
                    )}
                </Container>
            </Wrapper>
            <Box component="section">
                <Container maxWidth="lg" sx={{ paddingY: 6 }}>
                    <Grid container spacing={2}>
                        {user?.accessLevel === 1 ? (
                            <>{AdminPanelView()}</>
                        ) : (
                            <Typography variant="body2">You have no access to this page!</Typography>
                        )}
                    </Grid>
                </Container>
            </Box>
            <CourseManagementForm open={openModal} handleClose={() => setOpenModal(false)} type={formType} height="auto" padding="14rem" />
        </>
    );
};

export default AdminPanel;
