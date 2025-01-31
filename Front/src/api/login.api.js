import axios from 'axios';
import moment from 'moment-timezone';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8000/api/token/', 
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const { access, refresh, id, role, name } = response.data;

        if (id && role !== undefined) {
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('user_id', id);
            localStorage.setItem('role', role);
            localStorage.setItem('last_login', moment().tz("America/Bogota").format());

            localStorage.setItem('isAuthenticated', true);

            return {
                success: true,
                message: `Bienvenido ${name}!`,
                role,
            };
        } else {
            return { success: false, message: 'Ocurrió un error, intente mas tarde' };
        }
    } catch (error) {
        return { success: false, message: 'Acceso fallido. Revisa el usuario o la constraseña.' };
    }
};
