import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

export function Pagination({
  page,
  pageCount,
}: {
  page: number;
  pageCount: number;
}) {
  const canPreviousPage = page > 1;
  const canNextPage = page < pageCount;

  return (
    <Flex justifyContent="center" alignItems="center" columnGap={4} flex="1">
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            aria-label="First Page"
            as={Link}
            href={`?page=${1}`}
            isDisabled={!canPreviousPage}
            icon={<HiChevronDoubleLeft h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            aria-label="Previous Page"
            as={Link}
            href={`?page=${page - 1}`}
            isDisabled={!canPreviousPage}
            icon={<HiChevronLeft h={6} w={6} />}
          />
        </Tooltip>
      </Flex>

      <Flex alignItems="center">
        <Text flexShrink="0" mr={8}>
          Page{" "}
          <Text fontWeight="bold" as="span">
            {page}
          </Text>{" "}
          of{" "}
          <Text fontWeight="bold" as="span">
            {pageCount}
          </Text>
        </Text>
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            aria-label="Next Page"
            as={Link}
            href={`?page=${page + 1}`}
            isDisabled={!canNextPage}
            icon={<HiChevronRight />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            as={Link}
            href={`?page=${pageCount}`}
            aria-label="Last Page"
            isDisabled={!canNextPage}
            icon={<HiChevronDoubleRight />}
            ml={4}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}
