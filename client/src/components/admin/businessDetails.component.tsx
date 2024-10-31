import { ChangeEvent, useEffect, useState } from 'react';
import { Typography, Button, TextField, IconButton } from '@mui/material';
import { BusinessDetails } from '../../interfaces/businessDetails.interface';
import { getBusinessDetails, editBusinessDetails } from '../../api/businessDetails.api';
import CloseIcon from '@mui/icons-material/Close';
import { validateName, validateAddress, validatePhoneNumber } from '../../utils/validation';
import Swal from 'sweetalert2';

const BusinessDetailsComponent = () => {
    const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState<BusinessDetails | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getBusinessDetails();
                setBusinessDetails(data[0] as BusinessDetails);
            } catch (error) {
                console.error('Error fetching business details:', error);
            }
        };

        fetchDetails();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedDetails(businessDetails);
    };

    const handleSave = async () => {
        try {
            if (editedDetails) {
                const nameValidationResult = validateName(editedDetails!.name);
                if (nameValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: nameValidationResult,
                    });
                    return;
                }

                const addressValidationResult = validateAddress(editedDetails!.adress);
                if (addressValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: addressValidationResult,
                    });
                    return;
                }

                const phoneValidationResult = validatePhoneNumber(editedDetails!.phone);
                if (phoneValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: phoneValidationResult,
                    });
                    return;
                }

                await editBusinessDetails(editedDetails)
                setBusinessDetails(editedDetails);
                setIsEditing(false);
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data,
            });
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (editedDetails) {
            const { name, value } = e.target;
            setEditedDetails({ ...editedDetails, [name]: value });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', margin: 'auto', marginTop: '11vh', marginBottom: '11vh' }}>
            <>
                {isEditing ? (
                    <>
                        <IconButton onClick={handleCancelEdit} style={{ alignSelf: 'flex-end', marginRight: '10px' }}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h4">Business Details</Typography>
                        {editedDetails && (
                            <>
                                <br></br>
                                <TextField
                                    name="name"
                                    label="Business Name"
                                    value={editedDetails.name}
                                    onChange={handleChange}
                                />
                                <br></br>
                                <TextField
                                    name="adress"
                                    label="Business Address"
                                    value={editedDetails.adress}
                                    onChange={handleChange}
                                />
                                <br></br>
                                <TextField
                                    name="phone"
                                    label="Business Phone"
                                    value={editedDetails.phone}
                                    onChange={handleChange}
                                />
                                <br></br>
                                <Button onClick={handleSave}>Save</Button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Typography variant="h4">Business Details</Typography>
                        {businessDetails && (
                            <>
                                <Typography variant="h6">Name: {businessDetails.name}</Typography>
                                <Typography variant="h6">adress: {businessDetails.adress}</Typography>
                                <Typography variant="h6">phone: {businessDetails.phone}</Typography>
                                <Button onClick={handleEdit}>Edit</Button>
                            </>
                        )}
                    </>
                )}
            </>
        </div>
    );
};

export default BusinessDetailsComponent;
