import React, { useState } from "react";
import {
  LinkBox,
  LinkOverlay,
  Heading,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
  Spacer,
  Button,
  HStack,
  Center,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import MetricTile from "./MetricTile";
import { useRHBChain } from "../hooks/RHBProvider";
import { useMetamask } from "use-metamask";

export default function UpdateCreditAccountPanel() {
  const { contract } = useRHBChain();
  const { metaState } = useMetamask();
  const [ethAddress, setethAddress] = useState("");
  const [balance, setBalance] = useState("")
  const [uid, setUid] = useState(null)

  function handleSubmit() {
    contract?.methods.updateCreditAccountBal(ethAddress, parseInt(uid, 10), parseInt(balance, 10)).send({
		from: metaState.account[0]
	}).then((r) => {
		onOpen();
	})   
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Credit Account successfully updated.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex minH={"100vh"} bg="gray.800" minW={"80vw"}>
        <Stack mr={20} spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
          <Stack align={"center"} spacing={6}>
            <Heading align={"center"} fontSize={"6xl"} color="white">
				Log a credit account payment
            </Heading>
            <Text fontSize={"xl"} color="white">
              Enter details below
            </Text>
          </Stack>
          <Box rounded={"lg"} bg="gray.700" boxShadow={"lg"} p={8}>
            <Stack spacing={6}>
              <HStack spacing={4}>
                <FormControl id="add">
                  <FormLabel fontWeight="bold" color="white">
                    Client Ethereum Address
                  </FormLabel>
                  <Input
                    onChange={(event) => setethAddress(event.target.value)}
                    color="white"
                    variant="flushed"
                    type="text"
                  />
                </FormControl>
              </HStack>
			  <FormControl id="bal">
                  <FormLabel fontWeight="bold" color="white">
                    New Balance
                  </FormLabel>
                  <Input
                    onChange={(event) => setBalance(event.target.value)}
                    color="white"
                    variant="flushed"
                    type="text"
                  />
                </FormControl>
				<FormControl id="uid">
                  <FormLabel fontWeight="bold" color="white">
                    Account UID
                  </FormLabel>
                  <Input
                    onChange={(event) => setUid(event.target.value)}
                    color="white"
                    variant="flushed"
                    type="text"
                  />
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
				  Log Payment
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
