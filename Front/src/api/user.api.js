import axios from 'axios';

const url = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

export const updateUserClicks = async (clickData) => {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');

    if (!userId) {
        return null;
    }

    try {
        const response = await url.patch(`users/${userId}/`, clickData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return null;
    }
};

export const getFrontInfo = async () => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        return null;
    }
    
    try {
        const response = await url.get('frontinfo/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return null;
    }
};