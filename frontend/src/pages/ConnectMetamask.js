import {
  Center,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  LinkBox,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useMetamask } from "use-metamask";
import {Link as RouterLink} from 'react-router-dom'
export default function ConnectMetamask(props) {
  const { connect, metaMaskState } = useMetamask();
  const [connecting, setConnecting] = useState(false);
  async function connectMetamaskAccount() {
    setConnecting(true);
    try {
      await connect(Web3);
      setConnecting(false);
    } catch (error) {
      console.log(error);
      setConnecting(false);
    }

    // This is where we would call a smart contract function to check if this address is tied to a profile.
  }
  useEffect(() => connectMetamaskAccount(), []);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg="gray.800"
      minW={"100%"}
    >
      <Stack
        spacing={1}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        align={"center"}
      >
        <Stack align={"center"} spacing={4}>
          <Center w="30vw" align={"center"}>
            <Heading fontSize={"6xl"} color={"white"}>
              Welcome to the future of credit.
            </Heading>
          </Center>
        </Stack>
        <Box rounded={"lg"} p={8}>
          <Button
            mt={0}
            bg={"blue.900"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={connectMetamaskAccount}
            disabled={connecting}
            borderRadius={50}
            p={7}
          >
            Log in with Metamask
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
}
