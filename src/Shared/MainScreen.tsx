import * as React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopMenu from './TopMenu';

export interface IMainScreenProps {
}

export default function MainScreen(props: IMainScreenProps) {
    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <TopMenu />
            <Box sx={{ m: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
