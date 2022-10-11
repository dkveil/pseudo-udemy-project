import MainTemplate from './templates/MainTemplate';
import { Routes, Route, useRoutes } from 'react-router';
import Homepage from './pages/Home';
import MyCourses from './pages/MyCourses';

const View = () =>
    useRoutes([
        { path: '/', element: <Homepage /> },
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
