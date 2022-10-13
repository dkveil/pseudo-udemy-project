import MainTemplate from './templates/MainTemplate';
import { useRoutes } from 'react-router';
import Homepage from './pages/Home';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import AccountSettings from './pages/AccountSettings';
import AdminPanel from './pages/AdminPanel';

const View = () =>
    useRoutes([
        { path: '/', element: <Homepage /> },
        { path: '/courses/', element: <Courses /> },
        { path: '/courses/:page', element: <Courses /> },
        { path: '/my-courses', element: <MyCourses /> },
        { path: '/wish-list', element: <MyCourses /> },
        { path: '/account-setting', element: <AccountSettings /> },
        { path: '/admin-panel', element: <AdminPanel /> },
        { path: '/admin-panel/:managementtype/', element: <AdminPanel /> },
    ]);

const App = () => {
    return (
        <MainTemplate>
            <main>
                <View />
            </main>
        </MainTemplate>
    );
};

export default App;
