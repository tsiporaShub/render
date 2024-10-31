import React, { useEffect, useState } from 'react';
import { getBusinessDetails } from '../api/businessDetails.api';
import { BusinessDetails } from '../interfaces/businessDetails.interface';
import { Typography, Paper, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    footerContainer: {
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    detailItem: {
        fontSize: '1rem',
        marginBottom: '5px',
    },
});

const Footer: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const data = await getBusinessDetails();
                setBusinessDetails(data[0] as BusinessDetails);
            } catch (error) {
                console.error('Error fetching business details:', error);
            }
        };

        fetchBusinessDetails();
    }, []);

    return (
        <Paper className={classes.footerContainer} elevation={3} style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
            {businessDetails && (
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
                    <Typography className={classes.detailItem}>{businessDetails.name}</Typography>
                    <Typography className={classes.detailItem}>{businessDetails.adress}</Typography>
                    <Typography className={classes.detailItem}>{businessDetails.phone}</Typography>
                </div>
            )}
        </Paper>
    );
};

export default Footer;
