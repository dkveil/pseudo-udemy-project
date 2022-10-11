import MainTemplate from './templates/MainTemplate';
import { useRoutes } from 'react-router';
import Homepage from './pages/Home';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';

const View = () =>
    useRoutes([
        { path: '/', element: <Homepage /> },
        { path: '/courses/', element: <Courses /> },
        { path: '/courses/:page', element: <Courses /> },
        { path: '/my-courses', element: <MyCourses /> },
        { path: '/wish-list', element: <MyCourses /> },
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
