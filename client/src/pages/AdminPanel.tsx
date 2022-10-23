import React from 'react';
import { styled } from '@mui/system';
import { USER_TYPE } from '../utils/userTypes';
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    Pagination,
    Tab,
    Alert,
    AlertTitle,
    Slide,
    CircularProgress,
    Avatar,
} from '@mui/material';
import { TabList, TabContext } from '@mui/lab';
import { useStoreContext, ICourse, IUser } from '../context/StoreProvider';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useLocation, useNavigate, useParams } from 'react-router';
import { sortCoursesArray } from '../utils/sortCoursesArray';
import { CourseCard } from '../components/CourseCard';
import AddIcon from '@mui/icons-material/Add';
import { tabsData } from './Courses';
import CourseManagementForm, { ICourseManagementForm } from '../components/CourseManagementForm/CourseManagementForm';
import Button from '../components/Button';
import request from '../helpers/request';
import { returnUserRank } from '../utils/returnUserRank';

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
    const [editedCourse, setEditedCourse] = React.useState<ICourse | null>(null);
    const [openedAlert, setOpenedAlert] = React.useState(false);
    const [alertStatus, setAlertStatus] = React.useState<'success' | 'error' | undefined>(undefined);
    const [alertMessage, setAlertMessage] = React.useState<string>();
    const { user, courses, setCourses } = useStoreContext();
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const courseCardsPerPage = 15;
    const firstCourseOnThePage = (page - 1) * courseCardsPerPage;
    const lastCourseOnThePage = page * courseCardsPerPage;
    const pages = Math.ceil(courses.length / courseCardsPerPage);
    const [users, setUsers] = React.useState<IUser[] | null>(null);
    const [usersLoading, setUsersLoading] = React.useState(false);
    const [usersError, setUsersError] = React.useState<boolean>(false);

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    };

    const handleSortMethodChange = (event: React.SyntheticEvent, newValue: typeof sortMethod) => {
        setSortMethod(newValue);
    };

    const handleOpenModal = (type: typeof formType, course?: ICourse) => {
        setOpenModal(true);
        setFormType(type);
        setEditedCourse(course ? course : null);
    };

    const handleAlert = (status: typeof alertStatus, message: typeof alertMessage) => {
        setOpenedAlert(true);
        setAlertStatus(status);
        setAlertMessage(message);
        setTimeout(() => {
            setOpenedAlert(false);
        }, 3000);
    };

    const deleteCourse = async (id: string, title: string) => {
        try {
            const { status } = await request.delete(`/courses/${id}`);

            if (status === 200) {
                setCourses(courses.filter(({ id: currentId }) => currentId !== id));
                handleAlert('success', `The course "${title}" has been deleted`);
            }
        } catch (error) {
            handleAlert('error', `the course "${title}" could not be deleted`);
        }
    };

    const giveOrRemoveAdmin = async (editedUser: IUser) => {
        try {
            const { status } = await request.patch(`/users/${editedUser.id}`, {
                action: 'give or remove admin',
            });

            if (status === 200) {
                const newArrayUsers =
                    users?.map((currentUser) => {
                        if (currentUser.id === editedUser.id) {
                            return { ...currentUser, accessLevel: currentUser.accessLevel === 1 ? 0 : 1 };
                        } else {
                            return currentUser;
                        }
                    }) || null;
                setUsers(newArrayUsers);
            }
        } catch (error) {
            handleAlert('error', 'Something went wrong');
        }
    };

    const banOrUnbanUser = async (editedUser: IUser) => {
        if (editedUser.accessLevel === USER_TYPE.ADMIN) {
            handleAlert('error', `You can't ban the Administrator`);
        }
        try {
            const { status } = await request.patch(`/users/${editedUser.id}`, {
                action: 'ban or unban',
            });

            if (status === 200) {
                const newArrayUsers =
                    users?.map((currentUser) => {
                        if (currentUser.id === editedUser.id) {
                            return { ...currentUser, banned: !currentUser.banned };
                        } else {
                            return currentUser;
                        }
                    }) || null;
                setUsers(newArrayUsers);
            }
        } catch (error) {
            handleAlert('error', 'Something went wrong');
        }
    };

    React.useEffect(() => {
        if (params.managementtype && params.managementtype !== 'courses' && params.managementtype !== 'users') {
            navigate('/admin-panel');
        }
        if (user?.accessLevel !== USER_TYPE.ADMIN) {
            navigate('/');
        }
    }, [params.managementtype, navigate, user]);

    React.useEffect(() => {
        const getUsers = async () => {
            try {
                const { data, status } = await request.get('/users');

                if (status === 200) {
                    setUsers(data.users);
                    setUsersLoading(false);
                    setUsersError(false);
                    setOpenedAlert(true);
                    setAlertStatus('success');
                    setAlertMessage(`Users have been loaded correctly`);
                    setTimeout(() => {
                        setOpenedAlert(false);
                    }, 3000);

                    return;
                }

                throw new Error();
            } catch (error) {
                setUsersLoading(false);
                setUsersError(true);
                setOpenedAlert(true);
                setAlertStatus('error');
                setAlertMessage(`Something went wrong while loading users data`);
                setTimeout(() => {
                    setOpenedAlert(false);
                }, 3000);
            }
        };

        if (params.managementtype === 'users') {
            setUsersLoading(true);
            setTimeout(getUsers, 1000);
        }
        return () => setUsers(null);
    }, [params.managementtype]);

    const AdminPanelView = () => {
        if (location.pathname === '/admin-panel') {
            return (
                <>
                    {settingsList.map((item) => (
                        <Grid item key={item.name} xs={60} sm={15} md={15}>
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
                            <Grid item xs={60} sm={15} md={12} key={course.id} sx={{ position: 'relative', pb: 5, mb: { xs: 3, md: 0 } }}>
                                <CourseCard
                                    authors={course.authors}
                                    id={course.id}
                                    img={course.img}
                                    dateAdded={course.dateAdded}
                                    price={course.price}
                                    usePromotionPrice={course.usePromotionPrice}
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
                                <Box
                                    sx={{
                                        display: 'grid',
                                        placeItems: 'center',
                                        position: { xs: 'absolute' },
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                        <Button
                                            variant="contained"
                                            sx={{ fontSize: { xs: 11, md: 10 }, boxShadow: '0 0 2px white' }}
                                            onClick={() => handleOpenModal('edit course', course)}
                                        >
                                            Edit course
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{ fontSize: { xs: 11, md: 10 }, boxShadow: '0 0 2px white' }}
                                            onClick={() => deleteCourse(course.id, course.title)}
                                        >
                                            Delete course
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    {pages > 2 ? (
                        <Pagination count={pages} page={page} onChange={handlePaginationChange} variant="outlined" shape="rounded" />
                    ) : null}
                </>
            );
        }

        if (params.managementtype === 'users') {
            return (
                <>
                    {usersLoading && (
                        <Grid item xs={60}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                                <CircularProgress />
                            </Box>
                        </Grid>
                    )}
                    {!usersLoading &&
                        users?.map((user) => (
                            <Grid item xs={60} sm={15} md={15} key={user.id}>
                                <Card
                                    sx={{
                                        height: 280,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box>
                                        {user.avatar ? (
                                            <Avatar alt="Remy Sharp" src={user.avatar} sx={{ height: 120, width: 120 }} />
                                        ) : (
                                            <Avatar sx={{ bgcolor: 'black', height: 120, width: 120, fontSize: 40 }}>
                                                {user.login.charAt(0).toUpperCase()}
                                            </Avatar>
                                        )}
                                    </Box>
                                    <Box sx={{ textAlign: 'center', margin: 2 }}>
                                        <Typography sx={{ color: user.banned ? 'red' : 'black' }}>
                                            {user.login.charAt(0).toUpperCase() + user.login.slice(1)}
                                            {user.banned && ': BANNED'}
                                        </Typography>
                                        <Typography sx={{ color: 'gray', fontSize: 10 }}>
                                            {returnUserRank(user.accessLevel).toUpperCase()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {user.banned ? (
                                            <Button
                                                variant="contained"
                                                sx={{ fontSize: 12, whiteSpace: 'nowrap' }}
                                                onClick={() => banOrUnbanUser(user)}
                                            >
                                                {user.banned ? 'UNBAN' : 'BAN'}
                                            </Button>
                                        ) : (
                                            <>
                                                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{ fontSize: 12, whiteSpace: 'nowrap' }}
                                                        onClick={() => banOrUnbanUser(user)}
                                                    >
                                                        {user.banned ? 'UNBAN' : 'BAN'}
                                                    </Button>
                                                </Box>
                                                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'flex-start' }}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{ fontSize: 12, whiteSpace: 'nowrap' }}
                                                        onClick={() => giveOrRemoveAdmin(user)}
                                                    >
                                                        {user.accessLevel === USER_TYPE.ADMIN ? 'Remove admin' : 'Give admin'}
                                                    </Button>
                                                </Box>
                                            </>
                                        )}
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    {!usersLoading && usersError && (
                        <Grid item xs={60} sm={15} md={15}>
                            <Typography sx={{ color: 'black', fontSize: 40 }}>Error</Typography>
                        </Grid>
                    )}
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
                                            <Tab sx={{ color: 'white' }} label={tab.label} value={tab.method} key={tab.label} />
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
                    <Grid container spacing={1} sx={{ mb: 6 }} columns={60}>
                        {user?.accessLevel === 1 ? (
                            <>{AdminPanelView()}</>
                        ) : (
                            <Typography variant="body2">You have no access to this page!</Typography>
                        )}
                    </Grid>
                </Container>
            </Box>
            <CourseManagementForm
                open={openModal}
                handleClose={() => setOpenModal(false)}
                type={formType}
                height="auto"
                editedCourse={editedCourse}
                handleAlert={handleAlert}
            />
            <Slide direction="up" in={openedAlert}>
                <Alert
                    severity={alertStatus}
                    sx={{
                        position: 'fixed',
                        bottom: 42,
                        width: '80%',
                        left: '10%',
                        zIndex: 5,
                        margin: 'auto',
                        borderRadius: '20px',
                        boxShadow: '0 2px 2px 2px rgba(0,0,0,0.2)',
                        border: '1px solid green',
                    }}
                >
                    <AlertTitle>{alertStatus && alertStatus.charAt(0).toUpperCase() + alertStatus.slice(1)}</AlertTitle>
                    {alertMessage}
                </Alert>
            </Slide>
        </>
    );
};

export default AdminPanel;
