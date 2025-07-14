import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordBox from '../../Shared/PasswordBox';
import { useApi } from '../../Hooks/useApi';
import { AuthTestClient, LoginRequest } from '../../Api/ApiServerHook';
import { useAuthorization } from '../../Hooks/useAuthorization';

export interface ILoginProps {
}

export default function Login(props: ILoginProps) {
    const navigate = useNavigate();
    const { login } = useAuthorization();
    const { unauthorizedApi } = useApi(AuthTestClient);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const handleLogin = useCallback(async () => {
        await unauthorizedApi.login(new LoginRequest({
            email,
            password
        })).then((res) => {
            if (res.accessToken && res.refreshToken) {
                localStorage.setItem('token', res.accessToken!);
                localStorage.setItem('token_expires', res.tokenExpires?.toString()!);
                localStorage.setItem('refresh_token', res.refreshToken!);
                login(res.accessToken, res.refreshToken);
                navigate('/logged');
            }
        }).catch(() => {
            // Handle login error (e.g., show a notification)
        })

    }, [email, login, navigate, password, unauthorizedApi]);

    return (
        <Box sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            width: "30%",
            height: "100vh",
            margin: "0 auto"
        }}>
            <Stack spacing={2} sx={{ width: "100%" }}>
                <Typography>
                    Přihlášení
                </Typography>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordBox
                    password={password}
                    setPassword={setPassword}
                >
                </PasswordBox>

                <Button
                    disabled={!email || !password}
                    variant='contained'
                    sx={{ background: '#ff0000ff' }}
                    onClick={handleLogin}
                >
                    Přihlásit se
                </Button>
                <Typography sx={{ textAlign: "center", alignContent: "center" }}>
                    Ještě nemáte účet? <Button onClick={() => navigate('/register')}>Zaregistrujte se</Button>
                </Typography>
            </Stack>
        </Box>
    );
}