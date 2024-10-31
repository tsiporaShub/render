import React from 'react';
import { Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import a from '../assets/home/a.jpg';
import b from '../assets/home/b.jpg';
import c from '../assets/home/c.jpg';

const GalleryImage = styled('img')({
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
});

const images = [a, b, c];

const GalleryComponent: React.FC = () => {
    const theme = useTheme();
    
    return (
        <>
            <Typography variant="h4" align="center" gutterBottom style={{ color: theme.palette.secondary.main }}>
                Welcome to our magical world...
            </Typography>
            <Grid container spacing={2}>
                {images.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <GalleryImage src={image} alt={`Image ${index + 1}`} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default GalleryComponent;
