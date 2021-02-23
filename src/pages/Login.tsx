import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useAuth, useUser } from "reactfire";

interface LoginValue {
  email: string;
  password: string;
}

export function Login() {
  const { data: user } = useUser();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const auth = useAuth();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // if (!user) {
    //   history.push("/login");
    // } else {
    //   history.goBack();
    // }
  });

  const submit: SubmitHandler<LoginValue> = async (data) => {
    setIsLoading(true);
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password);
      history.push("/dashboard");
    } catch (error) {
      toast({ title: "Error", description: error.message, status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} noValidate>
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
          Log in
        </Button>
      </form>
      <Text mt={3} fontSize="sm" align="center">
        <Link to="/register">Register</Link>
      </Text>
    </>
  );
}
