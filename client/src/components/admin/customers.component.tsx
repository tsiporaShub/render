import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox } from '@mui/material';
import { Add, Edit, Delete, Clear, Save } from '@mui/icons-material';
import { GetUsers, DeleteUser, EditUser, SignUp } from '../../api/user.api';
import { User } from '../../interfaces/user.interface';
import { validateName, validateEmail, validatePassword, validatePhoneNumber } from '../../utils/validation';
import Swal from 'sweetalert2';

const Customers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editedName, setEditedName] = useState<string>('');
    const [editedEmail, setEditedEmail] = useState<string>('');
    const [editedPhone, setEditedPhone] = useState<string>('');
    const [editedPassword, setEditedPassword] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response: User[] = await GetUsers();
                setUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleEditUser = (id: number): void => {
        const userToEdit = users.find((user) => user.id === id);
        if (userToEdit) {
            setEditingUser(userToEdit);
            setEditedName(userToEdit.name);
            setEditedEmail(userToEdit.email);
            setEditedPhone(userToEdit.phone);
        }
    };

    const handleSaveEdit = async () => {
        if (editingUser) {
            try {
                const updatedUser = { ...editingUser, name: editedName, email: editedEmail, phone: editedPhone };
                
                const nameValidationResult = validateName(updatedUser.name);
                if (nameValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: nameValidationResult,
                    });
                    return;
                }
    
                const emailValidationResult = validateEmail(updatedUser.email);
                if (emailValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: emailValidationResult,
                    });
                    return;
                }
                
                const phoneValidationResult = validatePhoneNumber(updatedUser.phone);
                if (phoneValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: phoneValidationResult,
                    });
                    return;
                }

                const response = await EditUser(editingUser.id, updatedUser);
                console.log(response);
                const updatedUsers = users.map((user) => (user.id === editingUser.id ? updatedUser : user));
                setUsers(updatedUsers);
                setEditingUser(null);
                setEditedName('');
                setEditedEmail('');
                setEditedPhone('');
            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data,
                });
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setEditedName('');
        setEditedEmail('');
        setEditedPhone('');
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await DeleteUser(id);
            const updatedUsers = users.filter((user: User) => user.id !== id);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAddUser = () => {
        setOpenDialog(true);
        setEditingUser(null);
        setEditedName('');
        setEditedEmail('');
        setEditedPhone('');
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditedName('');
        setEditedEmail('');
        setEditedPhone('');
        setEditedPassword('');
        setIsAdmin(false);
    };

    const handleSaveUser = async () => {
        const newUser: User = {
            id: users.length + 10,
            name: editedName,
            email: editedEmail,
            phone: editedPhone,
            password: editedPassword,
            isAdmin: isAdmin,
        };

        try {
            const nameValidationResult = validateName(newUser.name);
            if (nameValidationResult) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: nameValidationResult,
                });
                return;
            }

            const emailValidationResult = validateEmail(newUser.email);
            if (emailValidationResult) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: emailValidationResult,
                });
                return;
            }
            
            const phoneValidationResult = validatePhoneNumber(newUser.phone);
            if (phoneValidationResult) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: phoneValidationResult,
                });
                return;
            }

            const passwordValidationResult = validatePassword(newUser.password);
            if (passwordValidationResult) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: passwordValidationResult,
                });
                return;
            }

            const response = await SignUp(newUser);
            console.log(response);
            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);
            handleCloseDialog();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data,
            });
        }
    };

    return (
        <>
            <Button startIcon={<Add />} onClick={handleAddUser} style={{ marginLeft: '50px' }}>Add User</Button>
            <Grid container spacing={2} style={{ padding: '20px 50px 50px 50px' }}>
                {users.map((user: User, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id || index}>
                        <Paper elevation={3} style={{ padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                {editingUser && editingUser.id === user.id ? (
                                    <>
                                        <IconButton color='secondary' onClick={handleSaveEdit} style={{ marginRight: '5px' }}>
                                            <Save style={{ cursor: 'pointer', fontSize: '18px' }} />
                                        </IconButton>
                                        <IconButton color='secondary' onClick={handleCancelEdit} style={{ marginRight: '5px' }}>
                                            <Clear style={{ cursor: 'pointer', fontSize: '18px' }} />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <IconButton color='primary' onClick={() => handleEditUser(user.id)} style={{ marginRight: '5px' }}>
                                            <Edit style={{ cursor: 'pointer', fontSize: '18px' }} />
                                        </IconButton>
                                        <IconButton color='primary' onClick={() => handleDeleteUser(user.id)} style={{ marginRight: '5px' }}>
                                            <Delete style={{ cursor: 'pointer', fontSize: '18px' }} />
                                        </IconButton>
                                    </>
                                )}
                            </div>
                            {editingUser && editingUser.id === user.id ? (
                                <>
                                    <TextField label="Name" value={editedName} onChange={(e) => setEditedName(e.target.value)} InputProps={{ style: { height: '40px' } }} />
                                    <br /><br />
                                    <TextField label="Email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} InputProps={{ style: { height: '40px' } }} />
                                    <br /><br />
                                    <TextField label="Phone" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} InputProps={{ style: { height: '40px' } }} />
                                </>
                            ) : (
                                <>
                                    <br />
                                    <Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>Name: {user.name}</Typography>
                                    <br />
                                    <Typography>Email: {user.email}</Typography>
                                    <br />
                                    <Typography>Phone: {user.phone}</Typography>
                                    <br />
                                </>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog}style={{ position: 'fixed', zIndex: '100' }}>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent style={{ width: '400px' }}>
                    <br /><br />
                    <TextField label="Name" value={editedName} onChange={(e) => setEditedName(e.target.value)} style={{ width: '100%' }} />
                    <br /><br />
                    <TextField label="Email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} style={{ width: '100%' }} />
                    <br /><br />
                    <TextField label="Phone" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} style={{ width: '100%' }} />
                    <br /><br />
                    <TextField label="Password" type="password" value={editedPassword} onChange={(e) => setEditedPassword(e.target.value)} style={{ width: '100%' }} />
                    <br /><br />
                    <FormControlLabel
                        control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />}
                        label="Is Admin"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveUser}>Save</Button>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Customers;
