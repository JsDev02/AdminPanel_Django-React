import axios from 'axios';

export const getAllusers = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/users/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
