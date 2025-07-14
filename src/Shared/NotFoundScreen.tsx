import { Box, Typography } from '@mui/material';
import * as React from 'react';
import NotFound from '../Assets/NotFound.jpg';
export interface INotFoundScreenProps {
}

export default function NotFoundScreen (props: INotFoundScreenProps) {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      textAlign="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Stránka nenalezena
      </Typography>
      <Typography variant="body1" gutterBottom>
        Zkontrolujte URL nebo se vraťte na domovskou stránku.
      </Typography>
      <img src={NotFound} alt="Not Found" style={{ width: '400px', height: '400px'}}/>
    </Box>
  );
}
