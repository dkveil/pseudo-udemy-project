import MainTemplate from './templates/MainTemplate';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Home';

const App = () => {
    return (
        <MainTemplate>
            <main>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </main>
        </MainTemplate>
    );
};

export default App;
