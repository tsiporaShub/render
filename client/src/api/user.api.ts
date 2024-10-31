import axios from 'axios';
import { domain } from '../config';
import { SignInData, User } from "../interfaces/user.interface";

export const SignIn = async (data: SignInData) => {
    try {
        const response = await axios.post(`${domain}/signin`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    } catch (error) {
        console.error('error in api request of users', error);
        throw error;
    }
}

export const SignUp = async (data: User) => {
    try {
        const response = await axios.post(`${domain}/signup`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    } catch (error) {
        console.error('error in api request of users', error);
        throw error;
    }
}


export const GetUsers = async () => {
    try {
        const token: string | null = sessionStorage.getItem('token');
        const response = await axios.get(`${domain}/user`, {
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('error in api get users', error);
        throw error;
    }
}

export const DeleteUser = async (id: number) => {
    try {
        const token: string | null = sessionStorage.getItem('token');
        const response = await axios.delete(`${domain}/user/${id}`, {
            headers: {
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('error in api delete users', error);
        throw error;
    }
}

export const EditUser = async (id: number, updatedData: Partial<User>) => {
    try {
        const token: string | null = sessionStorage.getItem('token');
        const response = await axios.put(`${domain}/user/${id}`, updatedData, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in API edit user', error);
        throw error;
    }
};

