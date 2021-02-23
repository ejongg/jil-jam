import { Box, Divider, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { IoArrowBack, IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import { Chord, ISong } from "../../api-interfaces";

export function ChordView() {
  const { songId } = useParams() as any;
  const songRef = useFirestore().collection("songs").doc(songId);
  const song = useFirestoreDocData<ISong>(songRef, { idField: "id" });
  const chordsRef = songRef.collection("chords");
  const chords = useFirestoreCollectionData<Chord>(chordsRef, {
    idField: "id",
  });

  return (
    <>
      <Flex mb={3} justifyContent="flex-start">
        <Link to="/dashboard">
          <Icon boxSize="2em" as={IoArrowBackCircleSharp} />
        </Link>
      </Flex>
      <Box textAlign="center">
        <Heading>{song.data?.title}</Heading>
        <Text fontSize="lg">{song.data?.artist}</Text>
      </Box>
      <Divider my={3} />
      {chords.data?.map(({ sections }) =>
        sections.map((section, i) => (
          <Box key={i} mb={3} textAlign="center">
            <Text size="sm" color="gray.400">
              {section.name}
            </Text>
            <Text fontSize="x-large">{section.content}</Text>
          </Box>
        ))
      )}
    </>
  );
}
