import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import PasswordBox from '../../Shared/PasswordBox';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useApi } from '../../Hooks/useApi';
import { AuthTestClient, RegisterRequest } from '../../Api/ApiServerHook';

export interface IRegisterProps {
}

export default function Register (props: IRegisterProps) {
    const navigate = useNavigate();
    const { unauthorizedApi } = useApi(AuthTestClient);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegister = useCallback(() => {
        if (firstName && lastName && email && password) {
            unauthorizedApi.register(new RegisterRequest({
                firstName,
                lastName,
                email,
                password
            })).then(() => {
                navigate('../');
            })
        }
    }, [email, firstName, lastName, navigate, password, unauthorizedApi])

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
                Registrace
            </Typography>
            <TextField
                label="Jméno"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
                label="Příjmení"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordBox
                password={password}
                setPassword={setPassword}
            >
            </PasswordBox>

            <Button
                variant='contained'
                onClick={handleRegister}
            >
                Registrovat se
            </Button>
            <Typography sx={{ textAlign: "center", alignContent: "center" }}>
                Již máte účet? <Button onClick={() => navigate('../')}>Přihlaste se</Button>
            </Typography>
        </Stack>
    </Box>
  );
}
