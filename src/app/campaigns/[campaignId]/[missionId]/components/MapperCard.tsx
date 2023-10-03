"use client";
import { Rating } from "@/components/rating/Rating";
import { Mapper } from "@/services/api";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Stack,
  Link,
  Icon,
  Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineLaunch } from "react-icons/md";

export function MapperCard({ mapper }: { mapper: Mapper }) {
  return (
    <Card key={mapper.id} bg="gray.100">
      <CardBody as={Stack}>
        <Avatar name={mapper.name} src={mapper.imageUrl} alignSelf="center" />
        <Heading size="md">{mapper.name}</Heading>
        <Box>
          <Badge colorScheme="blue">{mapper.mission_count} missions</Badge>
        </Box>
        <Rating defaultValue={mapper.rating} />
      </CardBody>
      <CardFooter as={Flex} justify="space-between">
        <IconButton
          aria-label="Delete mapper"
          icon={<FaRegTrashAlt />}
          colorScheme="red"
          size="xs"
        />
        <Link
          as={NextLink}
          href={`/mappers/${mapper.id}`}
          isExternal
          fontSize="sm"
          display="inline"
        >
          See more <Icon as={MdOutlineLaunch} />
        </Link>
      </CardFooter>
    </Card>
  );
}
