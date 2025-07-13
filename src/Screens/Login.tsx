import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';

export interface ILoginProps {
}

export default function Login(props: ILoginProps) {
    return (
        <Box>
            <Typography>
                Login
            </Typography>
            <Button
                variant='contained'
                color='primary'
            >
                Přihlásit se
            </Button>
        </Box>
    );
}
