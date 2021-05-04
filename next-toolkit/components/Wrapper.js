import { Box } from "@chakra-ui/react";
const Wrapper = ({ children, variant = "large", bg = "white" }) => {
  return (
    <Box
      mt={8}
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
    >
      {children}
    </Box>
  );
};

export default Wrapper;
