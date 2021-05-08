import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Raleway",
  },
  colors: {
    bg: {
      100: "#f7f7e8",
    },
    primary: {
      200: "#CBDEC1",
      500: "rgb(157,173,127)",
      900: "#C39E5C",
    },
    gray: {
      200: "#CBDEC1",
    },
  },
  styles: {
    global: {
      "html, body": {
        boxSizing: "border-box",
        color: "gray.600",
        lineHeight: "tall",
        backgroundColor: "bg.100",
      },
      "a:hover": {
        textDecoration: "none",
      },
      ':focus:not(:focus-visible):not([role="dialog"]):not([role="menu"])': {
        boxShadow: "none !important",
      },
    },
  },
  components: {
    Popover: {
      // 1. We can update the base style
      baseStyle: {},
      // 2. We can add a new button size or extend existing
      sizes: {
        lg: {
          w: "240px",
        },
      },
      defaultProps: {
        focusBorderColor: "primary.500",
      },
      // 3. We can add a new visual variant
    },
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        // fontWeight: "bold", // Normally, it is "semibold"
      },
      // 2. We can add a new button size or extend existing
      sizes: {},
      // 3. We can add a new visual variant
      variants: {
        main: {
          color: "white",
          bg: "primary.500",
          _hover: { background: "primary.900" },
          _active: {
            transform: "scale(0.96)",
          },
          _focus: {
            outline: "none",
          },
        },
        ghost: {
          _hover: { bg: "inherit" },
          _active: { bg: "inherit" },
        },
        // 4. We can override existing variants
      },
    },
  },
});
export default theme;
