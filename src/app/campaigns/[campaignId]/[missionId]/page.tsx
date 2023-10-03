import { getCampaign, getMission } from "@/services/api";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MapperCard } from "./components/MapperCard";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./components/Map"), {
  ssr: false,
  loading: () => <Skeleton height={600} width="100%" />,
});

export default async function MissionPage({
  params,
}: {
  params: { campaignId: string; missionId: string };
}) {
  const campaignId = parseInt(params.campaignId);
  const missionId = parseInt(params.missionId);

  const campaign = await getCampaign(campaignId);
  const mission = await getMission(missionId);

  if (!mission || !campaign) {
    return <Container maxW={"7xl"}>Mission not found</Container>;
  }

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid columns={1} spacing={4}>
        <Stack bg="white" borderRadius="md" p="4">
          <Box>
            <Badge colorScheme="blue" textTransform="uppercase">
              Campaign
            </Badge>
          </Box>
          <Heading lineHeight={1.1} fontWeight={600} fontSize="lg">
            {campaign.name}
          </Heading>

          <Text fontSize={"sm"}>
            <Badge colorScheme="gray">{campaignId}</Badge>
            {campaign.description}
          </Text>
        </Stack>

        <Stack bg="white" borderRadius="md" p="4">
          <Heading lineHeight={1.1} fontWeight={600} fontSize="3xl">
            Mission
          </Heading>
          <Text fontSize={"lg"}>
            <Badge colorScheme="gray">{missionId}</Badge>
            {mission.description}
          </Text>
        </Stack>

        <Stack bg="white" borderRadius="md" p="4" spacing={4}>
          <HStack>
            <Heading lineHeight={1.1} fontWeight={600} fontSize="3xl">
              Mappers
            </Heading>
            <Button colorScheme="blue" size="xs">
              Invite
            </Button>
          </HStack>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
          >
            {mission.mappers.map((mapper) => (
              <MapperCard key={mapper.id} mapper={mapper} />
            ))}
          </SimpleGrid>
        </Stack>

        <Stack bg="white" borderRadius="md" p="4" spacing={4}>
          <Heading lineHeight={1.1} fontWeight={600} fontSize="3xl">
            Target
          </Heading>
          <Box borderRadius="md">
            <DynamicMap />
          </Box>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
