import { Button } from 'antd';
import axios from 'axios';
import moment from 'moment-timezone';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const userId = localStorage.getItem('user_id');
        const accessToken = localStorage.getItem('access_token');
        const loginTime = localStorage.getItem('last_login');

        if (userId && accessToken && loginTime) {
            const logoutTime = moment.tz('America/Bogota');
            const sessionDuration = logoutTime.diff(moment(loginTime), 'seconds');

            axios.patch(
                `http://localhost:8000/api/users/${userId}/`,
                {
                    session_duration: moment.duration(sessionDuration, 'seconds').toISOString(),
                    last_login: logoutTime.format(),
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            )
        }

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('role');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('last_login');

        window.location.reload();
    };

    return (
        <Button type="primary" onClick={handleLogout}>
            Cerrar sesión
        </Button>
    );
}
