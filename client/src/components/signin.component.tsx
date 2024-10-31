import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { SignIn } from '../api/user.api'
import { User } from '../interfaces/user.interface';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FillDataCurrentUser } from '../redux/userAction';
import { jwtDecode } from 'jwt-decode';
import { validateEmail, validatePassword } from '../utils/validation';
import Swal from 'sweetalert2';

export default function SigninFormComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch();

    const handleSignIn = async () => {
        setEmailError('');
        setPasswordError('');

        const emailValidationResult: string = validateEmail(email);
        if (emailValidationResult) {
            setEmailError(emailValidationResult);
            return;
        }

        const passwordValidationResult: string = validatePassword(password);
        if (passwordValidationResult) {
            setPasswordError(passwordValidationResult);
            return;
        }

        try {
            const response: string = await SignIn({
                email,
                password
            });

            console.log('Signip successful:', response);

            sessionStorage.setItem('token', response);

            const decodedToken: any = jwtDecode(response);

            const user: User = {
                id: decodedToken.id,
                email: decodedToken.email,
                name: decodedToken.name,
                phone: decodedToken.phone,
                password: '',
                isAdmin: decodedToken.isAdmin
            };

            dispatch(FillDataCurrentUser(user));

            sessionStorage.setItem('currentUser', JSON.stringify(user));

            setEmail('');
            setPassword('');

            window.location.href = 'http://localhost:5173/home';
        }
        catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data,
            });
        }
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '400px',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '10px',
        margin: 'auto',
        marginTop: '10vh',
        marginBottom: '10vh',
    };

    const inputStyle: React.CSSProperties = {
        height: '40px',
        width: '100%',
        marginBottom: '30px',
    };

    return (
        <div style={containerStyle}>
            <Typography variant="h3">Signin Form</Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError ? true : false}
                helperText={emailError}
                style={inputStyle}
            />
            <br />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError ? true : false}
                helperText={passwordError}
                style={inputStyle}
            />
            <br />
            <Button variant="contained" onClick={handleSignIn}>
                Signin
            </Button>
            <Typography variant="body1" style={{ marginTop: '10px' }}>Not registered yet? <Button color="primary" component={Link} to="/signup">Register</Button></Typography>
        </div>
    );
}
