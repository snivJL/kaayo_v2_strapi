import { Box } from "@chakra-ui/react";
const Wrapper = ({ children, variant = "large", bg = "white", py = 8 }) => {
  return (
    <Box
      bg={bg}
      mx="auto"
      maxW={
        variant !== "regular"
          ? variant === "large"
            ? "1068px"
            : "400px"
          : "960px"
      }
      w="100%"
      py={py}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
