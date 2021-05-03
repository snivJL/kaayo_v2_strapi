import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Text,
  Spacer,
} from "@chakra-ui/react";
import ReviewSection from "./ReviewSection";

const ProductTabs = ({ product }) => {
  return (
    <Tabs align="center" my={8}>
      <TabList w="100%">
        <Tab>Additional Information</Tab>
        <Tab>Reviews</Tab>
        <Tab>Three</Tab>
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
