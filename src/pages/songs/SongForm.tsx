import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useFirestore } from "reactfire";

interface SongFormValues {
  title: string;
  artist: string;
}

export function SongForm() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const songsRef = useFirestore().collection("songs");
  const [isLoading, setIsLoading] = useState(false);

  const submit: SubmitHandler<SongFormValues> = async (data) => {
    setIsLoading(true);
    try {
      await songsRef.add(data);
      history.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <Grid gridTemplateColumns="repeat(1, 1fr)" gap="3">
          <FormControl isInvalid={errors.title} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              ref={register({ required: true })}
              name="title"
            />
            <FormErrorMessage>
              {errors.title && "This is required"}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.artist} isRequired>
            <FormLabel>Artist</FormLabel>
            <Input
              type="text"
              ref={register({ required: true })}
              name="artist"
            />
            <FormErrorMessage>
              {errors.artist && "This is required"}
            </FormErrorMessage>
          </FormControl>
          <Button isFullWidth colorScheme="green" type="submit">
            Create
          </Button>
          <Link to="/dashboard">
            <Button colorScheme="red" isFullWidth isLoading={isLoading}>
              Cancel
            </Button>
          </Link>
        </Grid>
      </form>
    </>
  );
}
