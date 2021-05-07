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
  },
  styles: {
    global: {
      "html, body": {
        boxSizing: "border-box",
        color: "gray.600",
        lineHeight: "tall",
        backgroundColor: "bg.100",
      },
      // a: {
      //   color: "teal.500",
      // },
    },
  },
  components: {
    Popover: {
      // 1. We can update the base style
      baseStyle: {
        borderColor: "green.200", // Normally, it is "semibold"
      },
      // 2. We can add a new button size or extend existing
      sizes: {
        lg: {
          w: "240px",
        },
      },
      // 3. We can add a new visual variant
    },
  },
});
export default theme;
