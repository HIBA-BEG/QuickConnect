import api from '../ConfigueAxios';

export const getChannels = async () => {
    const response = await api.get('/channel'); // Changez l'endpoint si nécessaire
    return response.data;
};