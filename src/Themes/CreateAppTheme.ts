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
                default: '#000000',
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