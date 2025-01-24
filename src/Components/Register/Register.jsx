import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from '../Footer/Footer';
import { LOCAL_URI } from '../../constants';

const defaultTheme = createTheme();

export default function SignUp() {
    let navigate = useNavigate(); 
    const [error, setError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const routeChange = () => {
        navigate('/login');
    };

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) errors.push("Minimum 8 characters");
        if (!/[a-z]/.test(password)) errors.push("Lowercase letter required");
        if (!/[A-Z]/.test(password)) errors.push("Uppercase letter required");
        if (!/[0-9]/.test(password)) errors.push("Number required");
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const username = data.get('username');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');

        // Reset previous errors
        setError(null);
        setPasswordError(null);
        setUsernameError(null);

        // Username validation
        if (!username || username.length < 3) {
            setUsernameError('Username must be at least 3 characters');
            return;
        }

        // Password validation
        const passwordValidationErrors = validatePassword(password);
        if (passwordValidationErrors.length > 0) {
            setPasswordError(passwordValidationErrors.join(', '));
            return;
        }

        // Password confirmation check
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        const userData = { username, password , role : 'user' };

        setIsLoading(true);

        try {
            // await new Promise(resolve => setTimeout(resolve, 2500));

            await axios.post(`${LOCAL_URI}/auth/signup`, userData).then((res) => {
                if(res.status === 200) {
                    navigate('/');
                }
            }).then((err) => {
                console.log(err);
            });
            if (true) {
                setSuccessDialogOpen(true);
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#2f2d2e' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    error={!!usernameError}
                                    helperText={usernameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={!!passwordError}
                                    helperText={passwordError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                />
                                <Typography 
                                    variant="body2" 
                                    color="textSecondary" 
                                    sx={{ mt: 1, ml: 1 }}
                                >
                                    Password must be at least 8 characters long and include lowercase, uppercase letters, and a number.
                                </Typography>
                            </Grid>
                        </Grid>
                        {error && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#2f2d2e' }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={routeChange} sx={{ color: '#2f2d2e' }} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>

            <Dialog
                open={successDialogOpen}
                onClose={() => navigate('/login')}
                aria-labelledby="registration-success-title"
            >
                <DialogTitle id="registration-success-title">
                    Registration Successful
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your account has been created successfully. 
                        You will be redirected to the login page.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate('/login')} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <Footer/>
        </ThemeProvider>
    );
}

// Password must:
// Be 8+ characters long
// Contain lowercase letter
// Contain uppercase letter
// Contain a number