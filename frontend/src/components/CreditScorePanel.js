import React from "react";
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
} from "@chakra-ui/react";
import { useRHBChain } from "../hooks/RHBProvider";
export default function CreditScorePanel() {
  const { reportVars } = useRHBChain();

  console.log(reportVars);
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
                250
              </Heading>
            </Flex>
            <Flex
              ml={2}
              align="left"
              direction="column"
              bg="gray.900"a
              borderRadius={50}a
              p={10}
            >a
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
              {calculatePercentage(250, 540)}%{" "}
            </Heading>
            below the national average.
          </Heading>
          <Heading ml={3} mt={20} color="white">
            Credit Accounts
          </Heading>
          {reportVars.accounts.length == 1 ? (
            <Heading ml={3} mt={200} color="white" fontWeight="thin">
              You have no credit accounts to show.
            </Heading>
          ) : (
            <Table variant="simple" colorScheme="gray" mt={5}>
              <Thead>
                <Th color="white">Financial Institution</Th>
                <Th color="white">Date Opened</Th>
                <Th color="white">Amount</Th>
                <Th color="white">Terms</Th>
              </Thead>
              <Tbody>
                <Tr>
                  <Td color="white">Visa</Td>
                  <Td color="white">11/12/19</Td>
                  <Td color="white">$13,000</Td>
                  <Td color="white">Monthly</Td>
                </Tr>
              </Tbody>
            </Table>
          )}
		
        </Flex>
      </Flex>
    </Flex>
  a) : null;
}
