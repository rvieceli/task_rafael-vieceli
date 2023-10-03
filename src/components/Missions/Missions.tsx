"use client";
import type { Mission } from "@/services/api";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Flex,
  HStack,
  List,
  ListIcon,
  ListItem,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

export function Missions({ data }: { data: Mission[] }) {
  return (
    <List spacing={3}>
      {data.map((mission) => (
        <ListItem
          key={mission.id}
          bg="white"
          borderRadius="md"
          _hover={{ bg: "gray.200" }}
        >
          <Stack
            as={Link}
            p="4"
            href={`/campaigns/${mission.campaign_id}/${mission.id}`}
          >
            <Text>{mission.description}</Text>

            <Flex justify="space-between" alignItems="center">
              <HStack>
                <Badge>#{mission.id}</Badge>
                <Tag
                  colorScheme={mission.completed ? "green" : "yellow"}
                  size="sm"
                  textTransform="uppercase"
                >
                  {mission.completed ? "Completed" : "Pending"}
                </Tag>
              </HStack>
              <AvatarGroup size="sm" max={2}>
                {mission.mappers.map((mapper) => (
                  <Avatar
                    key={mapper.id}
                    name={mapper.name}
                    src={mapper.imageUrl}
                  />
                ))}
              </AvatarGroup>
            </Flex>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}
