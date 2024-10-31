import axios from 'axios';
import { domain } from '../config';
import { OrderPackage } from '../interfaces/orderPackage.interface';

export const addOrderPackage = async (data: OrderPackage) => {
    try {
        const token: string | null = sessionStorage.getItem('token');
        const response = await axios.post(`${domain}/OrderPackage`, data, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in API request of adding an order package', error);
        throw error;
    }
}

export const getOrderPackages = async () => {
    try {
        const token: string | null = sessionStorage.getItem('token');
        const response = await axios.get(`${domain}/OrderPackage`, {
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in API request of getting order packages', error);
        throw error;
    }
}

export const deleteOrderPackage = async (id: number) => {
    try {
        const token: string | null = sessionStorage.getItem('token');
        const response = await axios.delete(`${domain}/OrderPackage/${id}`, {
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in API request of delete an order package', error);
        throw error;
    }
}

export const EditOrderPackage = async (id: number, updatedData: Partial<OrderPackage>) => {
    try {
        console.log(id);
        console.log(updatedData);
        
        
        const token: string | null = sessionStorage.getItem('token');
        const response = await axios.put(`${domain}/OrderPackage/${id}`, updatedData,{
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in API request of edit an order package', error);
        throw error;
    }
}
