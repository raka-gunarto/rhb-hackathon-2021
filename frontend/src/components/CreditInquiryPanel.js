import React, { useState, useEffect } from "react";
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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import MetricTile from "./MetricTile";
import { useRHBChain } from "../hooks/RHBProvider";
import { useMetamask } from "use-metamask";

function calculateCreditScore(reportVars) {
  let score = 1000;

  score -= reportVars.inquiries.length * 10;
  let totalPayments = Math.max(
    1,
    reportVars.accounts.reduce((acc, c) => acc + c.payments.length, 0)
  );
  let onTimePayments = Math.max(
    1,
    reportVars.accounts.reduce(
      (acc, c) =>
        acc + c.payments.reduce((acc, c) => (acc + c === 0 ? 1 : 0), 0),
      0
    )
  );
  return score * (onTimePayments / totalPayments);
}

async function getFINameFromAddr(contract, addr) {
  return (await contract.methods.getFIProfile(addr).call())[0];
}

export default function CreditInquiryPanel() {
  const { contract } = useRHBChain();
  const { metaState } = useMetamask();
  const [ethAddress, setethAddress] = useState("");
  const [reportVars, setReportVars] = useState(null);
  function handleSubmit() {
    contract.methods
      .getCreditReportVariables(ethAddress)
      .call({ from: metaState.account[0] })
      .then((v) => {
        setReportVars(v);
      });
    contract.methods
      .getCreditReportVariables(ethAddress)
      .send({ from: metaState.account[0] })
      .then(() => onOpen());
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [accs, setAccs] = useState([]);
  const [inqs, setInqs] = useState([]);
  useEffect(() => {
    if (!reportVars) return;
    for (let acc of reportVars.accounts) {
      getFINameFromAddr(contract, acc.FI).then((name) => {
        setAccs((old) => [
          ...old,
          <Tr>
            <Td color="black">{name}</Td>
            <Td color="black">
              {new Date(parseInt(acc.dateOpen) * 1000).toDateString()}
            </Td>
            <Td color="black">{acc.balance}</Td>
            <Td color="black">{acc.terms}</Td>
          </Tr>,
        ]);
      });
    }

    for (let inq of reportVars.inquiries) {
      getFINameFromAddr(contract, inq.inquirer).then((name) => {
        setInqs((old) => [
          ...old,
          <Tr>
            <Td color="black">{name}</Td>
            <Td color="black">
              {new Date(parseInt(inq.date) * 1000).toDateString()}
            </Td>
          </Tr>,
        ]);
      });
    }
  }, [reportVars]);

  return (
    <>
      {reportVars && (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Credit Inquiry Successful.</Text>
              <Text>Credit Score: {calculateCreditScore(reportVars)}</Text>
              <Text>Open Accounts</Text>
              <Table variant="simple" colorScheme="gray" mt={5}>
                <Thead>
                  <Th color="black">Financial Institution</Th>
                  <Th color="black">Date Opened</Th>
                  <Th color="black">Amount</Th>
                  <Th color="black">Terms</Th>
                </Thead>
                <Tbody>{accs}</Tbody>
              </Table>
              <Text>Recent Inquiries</Text>
              <Table variant="simple" colorScheme="gray" mt={5}>
                <Thead>
                  <Th color="black">Date Opened</Th>
                  <Th color="black">Inquirer</Th>
                </Thead>
                <Tbody>{inqs}</Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <Flex minH={"100vh"} bg="gray.800" minW={"80vw"}>
        <Stack mr={20} spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
          <Stack align={"center"} spacing={6}>
            <Heading align={"center"} fontSize={"6xl"} color="white">
              Inquire Credit Report
            </Heading>
            <Text fontSize={"xl"} color="white">
              Enter details below
            </Text>
          </Stack>
          <Box rounded={"lg"} bg="gray.700" boxShadow={"lg"} p={8}>
            <Stack spacing={6}>
              <HStack spacing={4}>
                <FormControl id="Name">
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
                Open Account
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
