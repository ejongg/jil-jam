import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useAuth, useFirestore, useUser } from "reactfire";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const { data: user } = useUser();
  const { register, errors, handleSubmit } = useForm();
  const auth = useAuth();
  const usersRef = useFirestore().collection("users");
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  });

  const submit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      await usersRef.doc(user?.uid).set({
        email: user?.email,
        name: data.name,
      });
      history.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <FormControl isInvalid={errors.name} isRequired>
          <FormLabel>Display name</FormLabel>
          <Input type="name" ref={register({ required: true })} name="name" />
          <FormErrorMessage>
            {errors.name && "This is required"}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" ref={register({ required: true })} name="email" />
          <FormErrorMessage>
            {errors.email && "This is required"}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            ref={register({ required: true })}
            name="password"
          />
          <FormErrorMessage>
            {errors.password && "This is required"}
          </FormErrorMessage>
        </FormControl>
        <Button mt={3} isLoading={isLoading} isFullWidth type="submit">
          Register
        </Button>
      </form>
      <Text mt={3} fontSize="sm" align="center">
        <Link to="/login">Log in</Link>
      </Text>
    </>
  );
}
