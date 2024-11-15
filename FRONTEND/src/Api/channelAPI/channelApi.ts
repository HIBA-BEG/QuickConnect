import api from '../ConfigueAxios';

export const getChannels = async () => {
    const response = await api.get('/channel'); 
    return response.data;
};