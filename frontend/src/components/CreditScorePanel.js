import React, { useState, useEffect } from "react";
import {
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
  Progress,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { useRHBChain } from "../hooks/RHBProvider";
import Options from "./Options";
import LoanOptions from "./LoanOptions";
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

export default function CreditScorePanel() {
  const { reportVars, contract } = useRHBChain();
  const [accs, setAccs] = useState([]);
  const [inqs, setInqs] = useState([]);
  useEffect(() => {
    if (!reportVars) return;
    for (let acc of reportVars.accounts) {
      getFINameFromAddr(contract, acc.FI).then((name) => {
        setAccs((old) => [
          ...old,
          <Tr>
            <Td color="white">{name}</Td>
            <Td color="white">{new Date(parseInt(acc.dateOpen) * 1000).toDateString()}</Td>
            <Td color="white">{acc.dateClosed != 0 ? new Date(parseInt(acc.dateClosed) * 1000).toDateString() : ""}</Td>
            <Td color="white">{acc.balance}</Td>
            <Td color="white">{acc.terms}</Td>
          </Tr>,
        ]);
      });
    }

    for (let inq of reportVars.inquiries) {
      getFINameFromAddr(contract, inq.inquirer).then((name) => {
        setInqs((old) => [
          ...old,
          <Tr>
            <Td color="white">{name}</Td>
            <Td color="white">{new Date(parseInt(inq.date) * 1000).toDateString()}</Td>
          </Tr>,
        ]);
      });
    }
  }, [reportVars]);

  function calculatePercentage(amt1, amt2) {
    return Math.floor((Math.abs(amt1 - amt2) / amt2) * 100);
  }

  return reportVars ? (
    <Flex direction="column" w="100%">
      <Flex w="100%" mt={100} ml={50}>
        <Flex direction="column" align="left">
          <Heading size={"3xl"} color="white">
            Credit Insight
          </Heading>
          <Heading color="white" size="lg" fontWeight="thin" ml={2} mt={8}>
            {" "}
            Let us help you take the next step.
          </Heading>
        </Flex>
      </Flex>
      <Flex w="100%" align="left" ml={50} mt={"2%"}>
        <Flex direction="column">
          <HStack spacing={7}>
            <Flex
              ml={2}
              align="left"
              direction="column"
              bg="gray.900"
              borderRadius={50}
              p={10}
            >
              <Heading fontSize={"4xl"} color="white" fontWeight="bold" mb={15}>
                Your Credit Score:
              </Heading>
              <Heading fontSize={"144px"} color="white">
                {calculateCreditScore(reportVars)}
              </Heading>
            </Flex>
            <Flex
              ml={2}
              align="left"
              direction="column"
              bg="gray.900"
              borderRadius={50}
              p={10}
            >
              <Heading fontSize={"4xl"} color="white" fontWeight="bold" mb={15}>
                National average:
              </Heading>
              <Heading fontSize={"144px"} color="white">
                540
              </Heading>
            </Flex>
          </HStack>
          <Heading mt={10} ml={3} color="white" fontSize="2xl">
            Your credit score is{" "}
            <Heading as="span" color="red.300" fontSize="2xl">
              {calculatePercentage(calculateCreditScore(reportVars), 540)}%{" "}
            </Heading>
            {calculateCreditScore(reportVars) > 540 ? "above" : "below"} the
            national average.
          </Heading>
          <Heading ml={3} mt={20} color="white">
            Credit Accounts
          </Heading>
          {reportVars.accounts.length == 0 ? (
            <Heading ml={3} mt={200} color="white" fontWeight="thin">
              You have no credit accounts to show.
            </Heading>
          ) : (
            <Table variant="simple" colorScheme="gray" mt={5}>
              <Thead>
                <Th color="white">Financial Institution</Th>
                <Th color="white">Date Opened</Th>
                <Th color="white">Date Closed</Th>
                <Th color="white">Amount</Th>
                <Th color="white">Terms</Th>
              </Thead>
              <Tbody>{accs}</Tbody>
            </Table>
          )}
          <Heading ml={3} mt={20} color="white">
            Recent Inquiries
          </Heading>
          {reportVars.inquiries.length == 0 ? (
            <Heading ml={3} mt={200} color="white" fontWeight="thin">
              You have had no recent inquiries.
            </Heading>
          ) : (
            <Table variant="simple" colorScheme="gray" mt={5}>
              <Thead>
                <Th color="white">Inquirer</Th>
                <Th color="white">Date Opened</Th>
              </Thead>
              <Tbody>{inqs}</Tbody>
            </Table>
          )}
        </Flex>
        <Flex ml={40} w="100%" h="100%">
          <Flex
            p={10}
            borderRadius={30}
            direction="column"
            bg="gray.900"
            w="90%"
            h={800}
          >
            <Options creditScore={calculateCreditScore(reportVars)} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  ) : null;
}
