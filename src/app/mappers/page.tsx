import { Pagination } from "@/components/pagination/Pagination";
import { Rating } from "@/components/rating/Rating";
import { SearchInput } from "@/components/search-input/SearchInput";
import { PageContainer } from "@/layouts/PageContainer";
import { getMappers } from "@/services/api";
import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";

export default async function MappersPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const { mappers, page_count } = await getMappers(page);

  return (
    <PageContainer
      header={
        <Flex justify="space-between">
          <SearchInput width="md" />
          <Button colorScheme="blue">New Mapper</Button>
        </Flex>
      }
      footer={<Pagination page={page} pageCount={page_count} />}
    >
      <TableContainer borderRadius="md">
        <Table>
          <Thead bg="gray.500" textColor="white">
            <Tr>
              <Th textColor="inherit">Name</Th>
              <Th textColor="inherit">Rating</Th>
              <Th textColor="inherit">Missions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mappers.map((mapper) => (
              <LinkBox key={mapper.id} as={Tr} _hover={{ bg: "gray.200" }}>
                <Td fontWeight="bold">
                  <LinkOverlay as={Link} href={`/mappers/${mapper.id}`}>
                    <HStack spacing={4}>
                      <Avatar
                        size="sm"
                        name={mapper.name}
                        src={mapper.imageUrl}
                      >
                        <AvatarBadge boxSize="1.25em" bg="green.500" />
                      </Avatar>
                      <Text>{mapper.name}</Text>
                    </HStack>
                  </LinkOverlay>
                </Td>
                <Td>
                  <Rating defaultValue={mapper.rating} />
                </Td>
                <Td>{mapper.mission_count}</Td>
              </LinkBox>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
}
