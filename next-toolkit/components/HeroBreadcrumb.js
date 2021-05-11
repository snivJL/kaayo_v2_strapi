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
    <Flex py={8} justify="center" align="center" bg="primary.200">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">HOME</BreadcrumbLink>
        </BreadcrumbItem>
        {path.split("/").map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink
              href={`/${item}`}
              isCurrentPage={index === path.split("/").length - 1}
            >
              <Text
                casing="uppercase"
                color={
                  index === path.split("/").length - 1 ? "gray.700" : "inherit"
                }
              >
                {item}
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Flex>
  );
};

export default HeroBreadcrumb;
