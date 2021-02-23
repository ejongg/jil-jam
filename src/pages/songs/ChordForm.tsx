import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { capitalize } from "lodash";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { ISong, Section } from "../../api-interfaces";

interface ChordFormValues {
  originalKey: string;
  sections: Section[];
}

export function ChordForm() {
  const { songId } = useParams() as any;
  const songRef = useFirestore().collection("songs").doc(songId);
  const song = useFirestoreDocData<ISong>(songRef);

  const { handleSubmit, register, errors, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });
  const toast = useToast();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const keys = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const instruments = ["guitar", "bass", "piano"];

  const submit: SubmitHandler<ChordFormValues> = async (data) => {
    setIsLoading(true);
    try {
      await songRef.collection("chords").add(data);
      toast({
        status: "success",
        title: "Success",
        description: "Chord added",
      });
      // TODO: Go to chord page when chord page is available
      history.push("/dashboard");
    } catch (error) {
      toast({ status: "error", title: "Error", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <Heading>{song.data?.title}</Heading>
      <Text fontSize="lg">{song.data?.artist}</Text>
      <Divider my={3} />
      <Grid gridTemplateColumns="repeat(1, 1fr)" gap="3">
        <FormControl isInvalid={errors.originalKey} isRequired>
          <FormLabel>Key</FormLabel>
          <Select ref={register({ required: true })} name="originalKey">
            {keys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.originalKey && "This is required"}
          </FormErrorMessage>
        </FormControl>
        <Grid gridTemplateColumns="repeat(auto-fit, minmax(50px, 1fr))" gap="1">
          {instruments.map((instrument, i) => (
            <Checkbox
              key={i}
              name="instruments"
              value={instrument}
              ref={register({ required: true })}
            >
              {capitalize(instrument)}
            </Checkbox>
          ))}
        </Grid>
        <Divider />
        <Grid gridTemplateColumns="repeat(1, 1fr)" gap={3}>
          {fields.map((item, index) => (
            <Box key={index}>
              <FormControl mb={1}>
                <Input
                  type="text"
                  name={`sections[${index}].name`}
                  defaultValue={item.name}
                  ref={register({ required: true })}
                  placeholder="Section name"
                ></Input>
              </FormControl>
              <FormControl mb={1}>
                <Textarea
                  name={`sections[${index}].content`}
                  defaultValue={item.content}
                  ref={register({ required: true })}
                  placeholder="Content"
                ></Textarea>
              </FormControl>
              <Button
                colorScheme="gray"
                onClick={() => remove(index)}
                isFullWidth
              >
                Remove
              </Button>
            </Box>
          ))}
        </Grid>
        <Button
          isFullWidth
          colorScheme="blue"
          onClick={() => append({ name: "", content: "" })}
        >
          Add Section
        </Button>
        <Button
          isFullWidth
          colorScheme="green"
          type="submit"
          isLoading={isLoading}
        >
          Save
        </Button>
        <Link to="/dashboard">
          <Button type="button" colorScheme="red" isFullWidth>
            Cancel
          </Button>
        </Link>
      </Grid>
    </form>
  );
}
