import { Box, IconButton, TextField } from '@mui/material';
import * as React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export interface IPasswordBoxProps {
    password: string;
    setPassword: (value: string) => void;
}

export default function PasswordBox(props: IPasswordBoxProps) {
    const { password, setPassword } = props;
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <TextField
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
                endAdornment:
                    <IconButton>
                        {showPassword ?
                            <VisibilityIcon onClick={() => setShowPassword(false)} /> :
                            <VisibilityOffIcon onClick={() => setShowPassword(true)} />}
                    </IconButton>
            }}
        />
    );
}