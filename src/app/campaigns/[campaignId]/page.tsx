import { getCampaign, getMissions } from "@/services/api";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Missions } from "../../../components/Missions/Missions";
import Link from "next/link";
import { Pagination } from "@/components/pagination/Pagination";

export default async function CampaignPage({
  params,
  searchParams,
}: {
  params: { campaignId: string };
  searchParams: { page?: string };
}) {
  const campaignId = parseInt(params.campaignId);
  const page = parseInt(searchParams.page || "1");

  const campaign = await getCampaign(campaignId);
  const { missions, page_count } = await getMissions(campaignId, page);

  if (!campaign) {
    return <Container maxW={"7xl"}>Campaign not found</Container>;
  }

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid columns={1} spacing={{ base: 8, md: 10 }}>
        <Stack spacing={{ base: 3, md: 5 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              #{campaignId} {campaign.name}
            </Heading>
          </Box>
          <Progress
            value={campaign.progress}
            borderRadius="full"
            maxWidth="md"
            bg="gray.300"
          />
          <Text fontSize={"lg"}>{campaign.description}</Text>
        </Stack>
        <Stack spacing={4}>
          <HStack>
            <Heading as={"h2"} fontSize={"2xl"}>
              Missions
            </Heading>
            <Button colorScheme="blue" as={Link} href="#" size="xs">
              New Mission
            </Button>
          </HStack>

          <Missions data={missions} />

          <Pagination page={page} pageCount={page_count} />
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
