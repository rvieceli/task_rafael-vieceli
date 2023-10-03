"use client";

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { ReactNode } from "react";

import { NavBar } from "./NavBar";
import { SidebarContent } from "./Sidebar";

export function PageLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      direction="column"
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <NavBar onOpen={onOpen} title={title} />
      <Flex direction="column" flex={1} ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Flex>
    </Flex>
  );
}
