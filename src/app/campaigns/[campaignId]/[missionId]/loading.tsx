import {
  Badge,
  Box,
  Container,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

export default function Loading() {
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid columns={1} spacing={4}>
        <Stack bg="white" borderRadius="md" p="4">
          <Box>
            <Skeleton as={Badge} colorScheme="blue" textTransform="uppercase">
              Campaign
            </Skeleton>
          </Box>

          <Skeleton height="2rem" />

          <Stack spacing={1}>
            <Skeleton height="1rem" />
            <Skeleton height="1rem" />
            <Skeleton height="1rem" />
          </Stack>
        </Stack>

        <Stack bg="white" borderRadius="md" p="4">
          <Skeleton height="2rem" />

          <Stack spacing={1}>
            <Skeleton height="1rem" />
            <Skeleton height="1rem" />
            <Skeleton height="1rem" />
          </Stack>
        </Stack>

        <Stack bg="white" borderRadius="md" p="4" spacing={4}>
          <Skeleton height="2rem" />
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
          >
            <Skeleton height="15rem" w="180px" />
            <Skeleton height="15rem" w="180px" />
            <Skeleton height="15rem" w="180px" />
            <Skeleton height="15rem" w="180px" />
          </SimpleGrid>
        </Stack>

        <Stack bg="white" borderRadius="md" p="4" spacing={4}>
          <Skeleton height="2rem" />
          <Skeleton height={600} width="100%" />
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
