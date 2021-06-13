import React, { useEffect, useState } from "react";
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
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import MetricTile from "./MetricTile";
import { useRHBChain } from "../hooks/RHBProvider";
import { useMetamask } from "use-metamask";

export default function FIDashboardPanel() {
  const [newApplicant, setNewApplicant] = useState(null);
  const { user, contract } = useRHBChain();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { metaState } = useMetamask();

  useEffect(() => {
    if (!contract) return;
    console.log("Listening for new FIs!");
    contract.events
      .FIRequestVote({})
      .on("data", async function (event) {
        setNewApplicant({
          ...event.returnValues,
          vote: "financial institution",
        });
        onOpen();
      })
      .on("error", console.error);

    if (user.isConsortium)
      contract.events
        .ConsortiumMemberRequestVote({})
        .on("data", async function (event) {
          contract.methods
            .getFIProfile(event.returnValues.requester)
            .call()
            .then((u) => {
              setNewApplicant({
                ...event.returnValues,
                name: u[0],
                addr: u[1],
                phone: u[2],
                vote: "consortium",
              });
              onOpen();
            });
        })
        .on("error", console.error);
  }, [contract, user]);
  return user && contract ? (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New FI Application</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              A new {newApplicant?.vote} application has been created.{" "}
            </Text>
            <Text> Details: </Text>
            <Text>Name: {newApplicant?.name}</Text>
            <Text>Ethereum Address: {newApplicant?.requester}</Text>
            <Text>Street Address: {newApplicant?.addr}</Text>
            <Text>Phone: {newApplicant?.phone}</Text>
            <Text>Please cast your vote below.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Deny
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                newApplicant.vote == "financial application"
                  ? contract.methods
                      .voteFIApplication(newApplicant.requester)
                      .send({ from: metaState.account[0] })
                      .then(() => onClose())
                  : contract.methods
                      .voteConsortiumApplication(newApplicant.requester)
                      .send({ from: metaState.account[0] })
                      .then(() => onClose());
              }}
            >
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex direction="column" w="100%">
        <Flex w="100%" mt={100} ml={50}>
          <Flex direction="column" align="left">
            <Heading size={"3xl"} color="white">
              {`${user.name} ${
                user.isConsortium ? ": RHBChain Consortium Member" : ""
              }`}
            </Heading>
            <Heading color="white" size="lg" fontWeight="thin" ml={2} mt={5}>
              {" "}
              What would you like to do today?
            </Heading>
          </Flex>
          <Spacer />
        </Flex>
        <Flex w="100%" align="center" ml={50} mt={"30"}>
          <Center w="80%">
            <HStack spacing={10} mt={50}>
              <Flex
                align={"center"}
                justify={"center"}
                height={350}
                width={350}
                borderRadius={30}
                bg="gray.900"
              >
                <Heading
                  align={"center"}
                  color={"gray.300"}
                  size={"xl"}
                  fontWeight="bold"
                >
                  Open a customer credit account
                </Heading>
              </Flex>
              <Flex
                align={"center"}
                justify={"center"}
                height={350}
                width={350}
                borderRadius={30}
                bg="gray.900"
              >
                <Heading
                  align={"center"}
                  color={"gray.300"}
                  size={"xl"}
                  fontWeight="bold"
                >
                  Request a credit enquiry
                </Heading>
              </Flex>
              <Flex
                align={"center"}
                justify={"center"}
                height={350}
                width={350}
                borderRadius={30}
                hidden={user.isConsortium}
                bg="gray.900"
                onClick={() => {
                  contract.methods
                    .startConsortiumApplication()
                    .send({ from: metaState.account[0] });
                }}
              >
                <Heading
                  align={"center"}
                  color={"gray.300"}
                  size={"xl"}
                  fontWeight="bold"
                >
                  Request to become a consortium member
                </Heading>
              </Flex>
            </HStack>
          </Center>
        </Flex>
      </Flex>
    </>
  ) : null;
}
