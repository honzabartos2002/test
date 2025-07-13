import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';

export interface ILoginProps {
    showbutton?: boolean;
}

export default function Login(props: ILoginProps) {
    const { showbutton } = props;

    return (
        <Box>
            <Typography>
                Login
            </Typography>
            <Button
                variant='contained'
                color='primary'
            >
                Přihlásit s
            </Button>
        </Box>
    );
}
