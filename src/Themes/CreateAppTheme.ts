import { createTheme, Theme } from "@mui/material";

export default function createAppTheme(): Theme {
    return createTheme({
        palette: {
            primary: {
                main: '#000000',
            },
            secondary: {
                main: '#FFFFFF',
            },
            background: {
                default: '#FFFFFF',
            },
        },
        components: {
            // MuiButton: {
            //     styleOverrides: {
            //         root: {
            //             borderRadius: 10,
            //         },
            //         outlined: {

            //         },
            //     },
            // },
        }
    })
}