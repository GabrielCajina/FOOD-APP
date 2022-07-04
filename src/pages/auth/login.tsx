import { Button, Center, Flex, Link, Text } from "@chakra-ui/react";
import TextInput from "components/ui/TextInput";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { AuthField, login } from "services/auth.service";
import NextLink from "next/link";

const Login = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthField>();

  async function onSubmit(v: any) {
    const response = await login(v);
    if (response) {
      router.push("/");
    }
  }
  return (
    <Center h="100vh" display={"flex"} flexDirection="column">
      <Text fontSize={"3xl"} fontWeight="bold">
        Login
      </Text>
      <Flex
        as="form"
        flexDir={"column"}
        gap={4}
        w={{ base: "80%", md: 400 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput errors={errors} {...register("email")} label="Email" />
        <TextInput
          errors={errors}
          {...register("password")}
          label="Password"
          type="password"
        />
        <Button
          _hover={{ bg: "yellow.400" }}
          bgColor={"yellow.500"}
          color="white"
          type="submit"
        >
          Login
        </Button>
        <Text textAlign={"center"}>
          Dont have account ?{" "}
          <NextLink href={"/auth/register"}>
            <Link fontWeight={"bold"} ml={1}>
              Register
            </Link>
          </NextLink>
        </Text>
      </Flex>
    </Center>
  );
};

export default Login;
