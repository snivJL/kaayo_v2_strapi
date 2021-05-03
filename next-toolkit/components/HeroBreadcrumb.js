import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Flex,
  Center,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const HeroBreadcrumb = ({ path, product = {} }) => {
  const router = useRouter();
  return (
    <Flex py={8} justify="center" align="center" bg="teal.200">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {path.split("/").map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink
              href={`/${item}`}
              isCurrentPage={index === path.split("/").length - 1}
            >
              <Text casing="capitalize">{item}</Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Flex>
  );
};

export default HeroBreadcrumb;
