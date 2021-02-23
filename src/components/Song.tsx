import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  IoEllipsisVertical,
  IoHammerOutline,
  IoMusicalNotesOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";

export function Song({ song }: { song: any }) {
  const history = useHistory();

  return (
    <LinkBox borderWidth="1px" borderRadius="lg">
      <Grid gridTemplateColumns="repeat(6, 1fr)">
        <GridItem colSpan={2}>
          <Image
            padding="2"
            boxSize="100px"
            src="https://via.placeholder.com/150"
            borderRadius="full"
          />
        </GridItem>
        <GridItem colSpan={3}>
          <Flex alignItems="center" height="full">
            <LinkOverlay as={Link} to={`/songs/${song.id}/chords`}>
              <Heading size="md">{song.title}</Heading>
              <Text>{song.artist}</Text>
            </LinkOverlay>
          </Flex>
        </GridItem>
        <Flex justifyContent="flex-end" p={2}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<Icon as={IoEllipsisVertical}></Icon>}
              size="xs"
              variant="outline"
            />
            <MenuList>
              <MenuItem
                as="a"
                icon={<Icon as={IoMusicalNotesOutline} />}
                onClick={() => history.push(`/songs/${song.id}/chords/create`)}
              >
                Add chords
              </MenuItem>
              <MenuItem icon={<Icon as={IoHammerOutline} />}>Edit</MenuItem>
              <MenuItem color="red" icon={<Icon as={IoTrashOutline} />}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Grid>
    </LinkBox>
  );
}
