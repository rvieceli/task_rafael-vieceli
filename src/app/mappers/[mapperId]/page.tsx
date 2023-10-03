import { getMapper, getMapperMissions } from "@/services/api";
import {
  Avatar,
  Badge,
  Box,
  Container,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Pagination } from "@/components/pagination/Pagination";
import { Missions } from "@/components/Missions/Missions";
import { StatsCard } from "@/components/stats-card/StatsCard";
import { MdAttachMoney, MdCameraAlt, MdStar } from "react-icons/md";

export default async function CampaignPage({
  params,
  searchParams,
}: {
  params: { mapperId: string };
  searchParams: { page?: string };
}) {
  const mapperId = parseInt(params.mapperId);
  const page = parseInt(searchParams.page || "1");

  const mapper = await getMapper(mapperId);
  const { missions, page_count } = await getMapperMissions(mapperId, page);

  if (!mapper) {
    return <Container maxW={"7xl"}>Mapper not found</Container>;
  }

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid columns={1} spacing={{ base: 8, md: 10 }}>
        <Stack spacing={{ base: 2, md: 6 }}>
          <Box>
            <Badge fontSize="xl">#{mapperId}</Badge>
          </Box>
          <HStack as={"header"} spacing={4}>
            <Avatar name={mapper.name} src={mapper.imageUrl} />
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {mapper.name}
            </Heading>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard
              title={"Missions"}
              stat={mapper.mission_count}
              icon={<MdCameraAlt size={"3em"} />}
            />
            <StatsCard
              title={"Rating"}
              stat={mapper.rating}
              icon={<MdStar size={"3em"} />}
            />
            <StatsCard
              title={"Revenue"}
              stat={`€ ${(mapper.rating * mapper.mission_count).toFixed(2)}`}
              icon={<MdAttachMoney size={"3em"} />}
            />
          </SimpleGrid>
        </Stack>
        <Stack spacing={4}>
          <HStack>
            <Heading as={"h2"} fontSize={"2xl"}>
              Missions
            </Heading>
          </HStack>

          <Missions data={missions} />

          <Pagination page={page} pageCount={page_count} />
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
