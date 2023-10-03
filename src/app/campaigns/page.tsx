import { Pagination } from "@/components/pagination/Pagination";
import { SearchInput } from "@/components/search-input/SearchInput";
import { PageContainer } from "@/layouts/PageContainer";
import { getCampaigns } from "@/services/api";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  LinkBox,
  LinkOverlay,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";

export default async function Campaigns({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const { campaigns, page_count } = await getCampaigns(page);

  return (
    <PageContainer
      header={
        <Flex justify="space-between">
          <SearchInput width="md" />
          <Button colorScheme="blue">New Campaign</Button>
        </Flex>
      }
      footer={<Pagination page={page} pageCount={page_count} />}
    >
      <TableContainer borderRadius="md">
        <Table>
          <Thead bg="gray.500" textColor="white">
            <Tr>
              <Th textColor="inherit">Name</Th>
              <Th textColor="inherit">Descriptions</Th>
              <Th textColor="inherit">Progress</Th>
            </Tr>
          </Thead>
          <Tbody>
            {campaigns.map((campaign) => (
              <LinkBox key={campaign.id} as={Tr} _hover={{ bg: "gray.200" }}>
                <Td fontWeight="bold">
                  <LinkOverlay as={Link} href={`/campaigns/${campaign.id}`}>
                    {campaign.name}
                  </LinkOverlay>
                </Td>
                <Td>{campaign.description}</Td>
                <Td width="15%">
                  <Progress
                    value={campaign.progress}
                    borderRadius="full"
                    colorScheme="blue"
                    bg="gray.300"
                  />
                </Td>
              </LinkBox>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
}
