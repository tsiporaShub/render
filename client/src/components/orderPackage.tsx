import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Select, MenuItem, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { OrderPackage } from '../interfaces/orderPackage.interface';
import { isTokenValid } from '../utils/checkToken';
import { useSelector } from 'react-redux';
import { getPhotographyPackages } from '../api/photographyPackage.api';
import { addOrderPackage } from '../api/orderPackage.api';
import { validateFields, validateDate, validateHours } from '../utils/validation';
import Swal from 'sweetalert2';

export default function OrderFormComponent() {
    const userId: number = useSelector((state: any) => (state.userReducer.currentUser.id));
    const [packageId, setPackageId] = useState('');
    const [date, setDate] = useState('');
    const [beginingHour, setBeginningHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [packages, setPackages] = useState([{ id: 0, type: '' }]);

    useEffect(() => {
        const fetchPhotographyPackage = async () => {
            try {
                const data = await getPhotographyPackages();
                console.log(data);
                setPackages(data);
            } catch (error) {
                console.error('Error fetching photography package:', error);
            }
        };

        fetchPhotographyPackage();
    }, []);

    const handleAddOrder = async () => {
        try {
            if (!isTokenValid()) { return; }

            const fieldsError = validateFields(packageId, date, beginingHour, endHour);
            if (fieldsError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: fieldsError,
                });
                return;
            }

            const dateError = validateDate(date);
            if (dateError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: dateError,
                });
                return;
            }

            const hoursError = validateHours(beginingHour, endHour);
            if (hoursError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: hoursError,
                });
                return;
            }

            const order: OrderPackage = {
                id: 0,
                userId,
                packageId: Number(packageId),
                date: date.replace(/-/g, '/'),
                beginingHour,
                endHour
            };
            console.log(order);
            const response = await addOrderPackage(order);
            console.log('Order added successfully:', response);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Order added successfully!',
            });            
            setPackageId('');
            setDate('');
            setBeginningHour('');
            setEndHour('');
        } catch (error: any) {
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
        marginTop: '8vh',
        marginBottom: '10vh',
    };

    const inputStyle: React.CSSProperties = {
        height: '55px',
        width: '100%',
        marginBottom: '30px',
    };

    return (
        <div style={containerStyle}>
            <Typography variant="h4">Add Order Form</Typography>
            <FormControl fullWidth style={inputStyle}>
                <InputLabel id="demo-simple-select-label">Photography Package</InputLabel>
                <Select
                    label="Photography Package"
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value)}
                >
                    {packages.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
            />
            <TextField
                label="Beginning Hour"
                type="time"
                value={beginingHour}
                onChange={(e) => setBeginningHour(e.target.value)}
                style={inputStyle}
            />
            <TextField
                label="End Hour"
                type="time"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                style={inputStyle}
            />
            <Button variant="contained" onClick={handleAddOrder}>Add Order</Button>
        </div>
    );
};
