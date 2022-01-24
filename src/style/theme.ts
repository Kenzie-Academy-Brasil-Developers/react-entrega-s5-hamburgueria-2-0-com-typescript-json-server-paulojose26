import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors:{
        gray: {
            50: "#F5F5F5",
            100: "#E0E0E0",
            300: "#828282",
            600: "#333333",
        },
        red: {
            500: "#EB5757",
            600: "#E60000",
        },
        green: {
            50: "#93D7AF",
            300: "#27AE60",
            400: "#168821",
        },
        yellow: {
            400: "#FFCD07",
        },
        blue: {
            400: "#155BCB",
        }
    },
    fonts: {
        heading: "Inter",
        body: "Inter",
    },
    fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "22px",
        "2xl": "26px",
        "3xl": "34px"
    },
    styles: {
        global: {
            body: {
                bg: "white",
                color: "gray.600",
            },
        },
    }
});