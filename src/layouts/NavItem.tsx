"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Flex, Icon, FlexProps } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  href: string;
}

export function NavItem({ icon, children, href, ...rest }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Box
      as={Link}
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        mb="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.300",
        }}
        bg={isActive ? "gray.200" : undefined}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="20" as={icon} />}
        {children}
      </Flex>
    </Box>
  );
}
