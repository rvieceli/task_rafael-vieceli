import { PageContainer } from "@/layouts/PageContainer";
import { Flex, Skeleton } from "@chakra-ui/react";

export default function Loading() {
  return (
    <PageContainer
      header={
        <Flex justify="space-between">
          <Skeleton height="2rem" width="md" />
          <Skeleton height="2rem" width="md" />
        </Flex>
      }
      footer={<Skeleton height="2rem" />}
    >
      <Skeleton height="100%" />
    </PageContainer>
  );
}
