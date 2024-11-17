
import { Invitation } from '../../Types/invitation';
import { InvitationRequest } from '../../Types/InvitationRequest';
import api from '../ConfigueAxios';

export const addInvitation = async (data : InvitationRequest) => {
    try {
        const response = await api.post('/invitation', data);
        return response.data;
    } catch (error: any) {
        console.error('error' , error);
        
    }
};