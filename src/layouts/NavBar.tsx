import {
  IconButton,
  Flex,
  useColorModeValue,
  Text,
  FlexProps,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

interface NavBarProps extends FlexProps {
  onOpen: () => void;
}

export function NavBar({ onOpen, title, ...rest }: NavBarProps) {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        {title}
      </Text>
    </Flex>
  );
}
