import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { SignUp } from '../api/user.api';
import { User } from '../interfaces/user.interface';
import { useDispatch } from 'react-redux';
import { FillDataCurrentUser } from '../redux/userAction';
import { Link } from 'react-router-dom';
import { validateName, validateEmail, validatePassword, validatePhoneNumber } from '../utils/validation';
import Swal from 'sweetalert2';

export default function SignupFormComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const dispatch = useDispatch();

    const handleSignUp = async () => {
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setPhoneError('');

        const nameValidationResult = validateName(name);
        if (nameValidationResult) {
            setNameError(nameValidationResult);
            return;
        }

        const emailValidationResult = validateEmail(email);
        if (emailValidationResult) {
            setEmailError(emailValidationResult);
            return;
        }

        const passwordValidationResult = validatePassword(password);
        if (passwordValidationResult) {
            setPasswordError(passwordValidationResult);
            return;
        }

        const phoneValidationResult = validatePhoneNumber(phone);
        if (phoneValidationResult) {
            setPhoneError(phoneValidationResult);
            return;
        }

        try {
            const user: User = {
                id: 0,
                name,
                email,
                password,
                phone,
                isAdmin: false,
            };
            console.log(user);

            const response = await SignUp(user);

            console.log('Signup successful:', response);

            sessionStorage.setItem('token', response);

            dispatch(FillDataCurrentUser(user));

            sessionStorage.setItem('currentUser', JSON.stringify(user));

            setEmail('');
            setPassword('');
            setPhone('');
            setName('');

            window.location.href = 'http://localhost:5173/home';
        } catch (error: any) {
            if (error.response.data == "this user is exist") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Email already exists. Please use a different email.',
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data,
                });
            }
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
            <Typography variant="h3">Signup Form</Typography>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError ? true : false}
                helperText={nameError}
                style={inputStyle}
            />
            <br />
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
            <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError ? true : false}
                helperText={phoneError}
                style={inputStyle}
            />
            <br />
            <Button variant="contained" onClick={handleSignUp}>Signup</Button>
            <Typography variant="body1" style={{ marginTop: '10px' }}>Already have an account? <Button color="primary" component={Link} to="/signin">Signin</Button></Typography>
        </div>
    );
}
