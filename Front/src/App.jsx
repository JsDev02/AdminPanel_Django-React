import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AdminPanel } from './pages/AdminPanel';
import { Login } from './pages/Login';
import { UserPanel } from './pages/UserPanel';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    localStorage.getItem('access_token') ? (
                        <Navigate to={localStorage.getItem('role') === '1' ? '/admin-panel' : '/user-panel'} />
                    ) : (
                        <Login />
                    )
                } />

                <Route path="/login" element={<Navigate to="/" />} />

                <Route path="/admin-panel" element={
                    <PrivateRoute>
                        <AdminPanel />
                    </PrivateRoute>
                } />

                <Route path="/user-panel" element={
                    <PrivateRoute>
                        <UserPanel />
                    </PrivateRoute>
                } />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}
