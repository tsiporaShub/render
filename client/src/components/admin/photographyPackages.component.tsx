import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add, Edit, Delete, Clear, Save } from '@mui/icons-material';
import { updatePhotographyPackage, deletePhotographyPackage, addPhotographyPackage, getPhotographyPackages } from '../../api/photographyPackage.api';
import { PhotographyPackage } from '../../interfaces/photographyPackage.interface';
import { validateName, validatePrice } from '../../utils/validation';
import Swal from 'sweetalert2';

const PhotographyPackagesComponent: React.FC = () => {
    const [packages, setPackages] = useState<PhotographyPackage[]>([]);
    const [editingPackage, setEditingPackage] = useState<PhotographyPackage | null>(null);
    const [editedType, setEditedType] = useState<string>('');
    const [editedPrice, setEditedPrice] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPhotographyPackages();
                setPackages(data);
            } catch (error) {
                console.error('Error fetching photography packages:', error);
            }
        };

        fetchPackages();
    }, []);

    const handleEditPackage = (id: number): void => {
        const packageToEdit = packages.find((pkg) => pkg.id === id);
        if (packageToEdit) {
            setEditingPackage(packageToEdit);
            setEditedType(packageToEdit.type);
            setEditedPrice(packageToEdit.moneyToHour);
        }
    };

    const handleSaveEdit = async () => {
        if (editingPackage) {
            try {
                const updatedPackage = { ...editingPackage, type: editedType, moneyToHour: editedPrice };

                const nameValidationResult = validateName(updatedPackage.type);
                if (nameValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: nameValidationResult,
                    });
                    return;
                }

                const priceValidationResult = validatePrice(updatedPackage.moneyToHour);
                if (priceValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: priceValidationResult,
                    });
                    return;
                }

                const response = await updatePhotographyPackage(editingPackage.id, updatedPackage);
                console.log(response);
                const updatedPackages = packages.map((pkg) => (pkg.id === editingPackage.id ? updatedPackage : pkg));
                setPackages(updatedPackages);
                setEditingPackage(null);
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
        setEditingPackage(null);
        setEditedType('');
        setEditedPrice(0);
    };

    const handleDeletePackage = async (id: number) => {
        try {
            await deletePhotographyPackage(id);
            const updatedPackages = packages.filter((pkg) => pkg.id !== id);
            setPackages(updatedPackages);
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    const handleAddPackage = () => {
        setEditingPackage(null);
        setEditedType('');
        setEditedPrice(0);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSavePackage = async () => {
        const newPackage: PhotographyPackage = {
            id: packages.length + 1,
            type: editedType,
            moneyToHour: editedPrice,
        };

        try {
            const nameValidationResult = validateName(newPackage.type);
            if (nameValidationResult) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: nameValidationResult,
                });
                return;
            }

            const priceValidationResult = validatePrice(newPackage.moneyToHour);
            if (priceValidationResult) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: priceValidationResult,
                });
                return;
            }

            const response = await addPhotographyPackage(newPackage);
            const addedPackage = response;
            console.log(response);
            const updatedPackages = [...packages, addedPackage];
            setPackages(updatedPackages);
            setEditedType('');
            setEditedPrice(0);
            setOpenDialog(false);
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
            <Button startIcon={<Add />} onClick={handleAddPackage} style={{ marginLeft: '50px' }}>Add Package</Button>
            <Grid container spacing={2} style={{ padding: '20px 50px 50px 50px' }}>
                {packages.map((pkg) => (
                    <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                        <Paper elevation={3} style={{ padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                {editingPackage && editingPackage.id === pkg.id ? (
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
                                        <IconButton color='primary' onClick={() => handleEditPackage(pkg.id)} style={{ marginRight: '5px' }}>
                                            <Edit style={{ cursor: 'pointer', fontSize: '18px' }} />
                                        </IconButton>
                                        <IconButton color='primary' onClick={() => handleDeletePackage(pkg.id)} style={{ marginRight: '5px' }}>
                                            <Delete style={{ cursor: 'pointer', fontSize: '18px' }} />
                                        </IconButton>
                                    </>
                                )}
                            </div>
                            {editingPackage && editingPackage.id === pkg.id ? (
                                <>
                                    <TextField label="Type" value={editedType} onChange={(e) => setEditedType(e.target.value)} InputProps={{ style: { height: '40px' } }} />
                                    <br /><br />
                                    <TextField label="Price" type="number" value={editedPrice} onChange={(e) => setEditedPrice(Number(e.target.value))} InputProps={{ style: { height: '40px' } }} />
                                </>
                            ) : (
                                <>
                                    <br />
                                    <Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>Type: {pkg.type}</Typography>
                                    <Typography marginBottom={'2px'}>Price: {pkg.moneyToHour}</Typography>
                                    <br />
                                </>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog} style={{ position: 'fixed', zIndex: '100' }}>
                <DialogTitle>Add New Package</DialogTitle>
                <DialogContent style={{ width: '400px' }}>
                    <br /><br />
                    <TextField label="Type" value={editedType} onChange={(e) => setEditedType(e.target.value)} style={{ width: '100%' }} />
                    <br /><br />
                    <TextField label="Price" type="number" value={editedPrice} onChange={(e) => setEditedPrice(Number(e.target.value))} style={{ width: '100%' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSavePackage}>Save</Button>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PhotographyPackagesComponent;
