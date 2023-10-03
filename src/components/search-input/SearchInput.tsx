import {
  ComponentWithAs,
  Input,
  InputGroup,
  InputGroupProps,
  InputRightElement,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

export function SearchInput(props: InputGroupProps) {
  return (
    <InputGroup  {...props}>
      <Input placeholder="Search" bg="white" />
      <InputRightElement color="gray.500">
        <MdSearch size="1.5em" />
      </InputRightElement>
    </InputGroup>
  );
}
