import { Flex, Grid, HStack, Icon, Input } from "@chakra-ui/react";
import { IoAddCircleSharp, IoExitOutline } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import { useAuth, useFirestore, useFirestoreCollectionData } from "reactfire";
import { ISong } from "../api-interfaces";
import { Song } from "../components/Song";

export function Dashboard() {
  const auth = useAuth();
  const history = useHistory();
  const songsRef = useFirestore().collection("songs");
  const songs = useFirestoreCollectionData<ISong>(songsRef, { idField: "id" });

  const logout = () => {
    auth.signOut();
    history.push("/login");
  };

  return (
    <>
      <HStack mb={3} spacing="48px">
        <Link to="/songs/create">
          <Icon boxSize="2em" color="green.300" as={IoAddCircleSharp} />
        </Link>
        <Input size="sm" type="text" placeholder="Search" />
        <Icon
          color="red.300"
          boxSize="2em"
          as={IoExitOutline}
          onClick={() => logout()}
        />
      </HStack>
      <Grid templateColumns="repeat(1, 1fr)" gap="2">
        {songs.data?.map((song) => (
          <Song key={song.id} song={song} />
        ))}
      </Grid>
    </>
  );
}
