import {
  Flex,
  FormLabel,
  FormControl,
  Stack,
  Input,
  Button,
  Box,
  Heading,
  Text,
  HStack,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRHBChain } from "../hooks/RHBProvider";
import { useMetamask } from "use-metamask";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [NRIC, setNRIC] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { connect, metaState } = useMetamask();

  const { setUser, contract, account } = useRHBChain();
  function handleSubmit() {
    console.table({
      firstName,
      lastName,
      address,
      NRIC,
      dateOfBirth,
      phoneNumber,
    });

    contract.methods
      .setOwnProfile(`${firstName} ${lastName}`, address, phoneNumber, NRIC, dateOfBirth)
      .send({
        from: metaState.account[0]
      })
      .then(() => {
        setUser({ firstName, lastName, address, NRIC, dateOfBirth, phoneNumber,type:"Consumer"})
      })
      .catch((e) => console.log(e));
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg="gray.800"
      minW={"100vw"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
        <Stack align={"center"} spacing={6}>
          <Heading align={"center"} fontSize={"6xl"} color="white">
            We don't have a profile for you yet.
          </Heading>
          <Text fontSize={"xl"} color="white">
            Enter your details below and create a profile in seconds.
          </Text>
        </Stack>
        <Box rounded={"lg"} bg="gray.700" boxShadow={"lg"} p={8}>
          <Stack spacing={6}>
            <HStack spacing={4}>
              <FormControl id="First Name">
                <FormLabel fontWeight="bold" color="white">
                  First Name
                </FormLabel>
                <Input
                  onChange={(event) => setFirstName(event.target.value)}
                  color="white"
                  variant="flushed"
                  type="text"
                />
              </FormControl>
              <FormControl id="Last Name">
                <FormLabel fontWeight="bold" color="white">
                  Last Name
                </FormLabel>
                <Input
                  onChange={(event) => setLastName(event.target.value)}
                  color="white"
                  variant="flushed"
                  type="text"
                />
              </FormControl>
            </HStack>
            <FormControl id="email">
              <FormLabel fontWeight="bold" color="white">
                Address
              </FormLabel>
              <Input
                onChange={(event) => setAddress(event.target.value)}
                color="white"
                variant="flushed"
              />
            </FormControl>
            <HStack spacing={4}>
              <FormControl id="NRIC Number">
                <FormLabel fontWeight="bold" color="white">
                  NRIC Number
                </FormLabel>
                <Input
                  onChange={(event) => setNRIC(event.target.value)}
                  color="white"
                  variant="flushed"
                  type="text"
                ></Input>
              </FormControl>
              <FormControl id="DOB">
                <FormLabel fontWeight="bold" color="white">
                  Date Of Birth
                </FormLabel>
                <Input
                  onChange={(event) =>
                    setDateOfBirth(new metaState.web3.utils.BN(Date.parse(event.target.value) / 1000))
                  }
                  color="white"
                  variant="flushed"
                  type="text"
                />
              </FormControl>
            </HStack>
            <FormControl id="Phone Number">
              <FormLabel fontWeight="bold" color="white">
                Phone Number
              </FormLabel>
              <Input
                onChange={(event) => setPhoneNumber(event.target.value)}
                color="white"
                variant="flushed"
                type="text"
              ></Input>
            </FormControl>
            <Button
              mt={0}
              bg={"blue.900"}
              color={"white"}
              fontWeight="bold"
              _hover={{
                bg: "blue.500",
              }}
              borderRadius={50}
              p={7}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
