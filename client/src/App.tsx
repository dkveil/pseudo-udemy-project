import MainTemplate from './templates/MainTemplate';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Home';
import MyCourses from './pages/MyCourses';
import { useStoreContext } from './context/StoreProvider';

const App = () => {
    const { user } = useStoreContext();

    return (
        <MainTemplate>
            <main>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/my-courses" element={<MyCourses />} />
                </Routes>
            </main>
        </MainTemplate>
    );
};

export default App;
