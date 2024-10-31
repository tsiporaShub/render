import { jwtDecode } from 'jwt-decode'

export const isTokenValid = () => {
    const token: string | null = sessionStorage.getItem('token');
    if (token) {
        const decodedToken: any = jwtDecode(token);
        const currentTime: any = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
            return true;
        }
    }
    window.location.href = 'http://localhost:5173/signIn';
    return false;
}