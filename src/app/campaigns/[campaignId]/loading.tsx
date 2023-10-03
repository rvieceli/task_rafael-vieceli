import { Container, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid columns={1} spacing={{ base: 8, md: 10 }}>
        <Stack spacing={{ base: 3, md: 5 }}>
          <Skeleton height="2rem" />

          <Skeleton height="1rem" />

          <Stack spacing={1}>
            <Skeleton height="1rem" />
            <Skeleton height="1rem" />
            <Skeleton height="1rem" />
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <Skeleton height="2rem" />

          <Skeleton height="5rem" />
          <Skeleton height="5rem" />
          <Skeleton height="5rem" />
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
