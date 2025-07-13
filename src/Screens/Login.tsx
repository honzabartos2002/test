import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordBox from '../Shared/PasswordBox';

export interface ILoginProps {
}

export default function Login(props: ILoginProps) {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    

    const handleLogin = useCallback(() => {
        if (email === "prdel@tvojemama.com" && password === "prdel") {
            navigate("/");
        }

    }, [email, navigate, password]);
    
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
            </Stack>
        </Box>
    );
}