import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import ReviewSection from "./ReviewSection";

const ProductTabs = ({ product }) => {
  const tabStyle = {
    color: "white",
    background: "primary.500",
    boxShadow: "2px 2px 2px 1px primary.500",
    outline: "none",
  };

  return (
    <Tabs align="center" my={8}>
      <TabList borderColor="primary.500" w="100%">
        <Tab
          _selected={tabStyle}
          _focus={{
            boxShadow: "none",
          }}
          _active={{ background: "primary.900" }}
        >
          Additional Information
        </Tab>
        <Tab
          _selected={tabStyle}
          _focus={{
            boxShadow: "none",
          }}
          _active={{ background: "primary.900" }}
        >
          Reviews
        </Tab>
        <Tab
          _selected={tabStyle}
          _focus={{
            boxShadow: "none",
          }}
          _active={{ background: "primary.900" }}
        >
          Three
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text align="left">Weight: {product.weight}gr</Text>
        </TabPanel>
        <TabPanel>
          <ReviewSection product={product} />
        </TabPanel>
        <TabPanel>
          <Text algin="left">three!</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProductTabs;
