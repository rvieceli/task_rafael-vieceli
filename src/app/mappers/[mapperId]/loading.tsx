import {
  Container,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

export default function Loading() {
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid columns={1} spacing={{ base: 8, md: 10 }}>
        <Stack spacing={{ base: 2, md: 6 }}>
          <Skeleton height="2rem" width="5rem" />
          <HStack as={"header"} spacing={4}>
            <Skeleton height="3rem" aspectRatio={1 / 1} borderRadius="full" />
            <Skeleton height="2rem" width="sm" />
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <Skeleton height="5rem" />
            <Skeleton height="5rem" />
            <Skeleton height="5rem" />
          </SimpleGrid>
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
