// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: "#2f2d2e", color: 'white', py: 3, mt: 'auto' , position : 'absolute' , bottom : '0' , width : '100%'}}>
            <Container maxWidth="lg">
                <Typography variant="body1">
                    &copy; {new Date().getFullYear()} STG Makethon-18. All rights reserved @Team Eureka.
                </Typography>
                <Typography variant="body2">
                    <Link href="#" color="inherit" underline="none">
                        Privacy Policy
                    </Link>
                    {' | '}
                    <Link href="#" color="inherit" underline="none">
                        Terms of Service
                    </Link>
                    {' | '}
                    <Link href="#" color="inherit" underline="none">
                        Contact Us
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
