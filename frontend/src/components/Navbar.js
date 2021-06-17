import React from "react";
import { VStack, Text, Flex, Center, Box, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRHBChain } from "../hooks/RHBProvider";
export default function Navbar() {
  const { user } = useRHBChain();
  if (!user) return null;
  if (user.type == "Consumer") {
    return (
      <VStack w="100%" spacing={0} mt={150}>
        <Flex w="100%" height={55} _hover={{ bg: "blue.900" }} align={"center"}>
          <Link to="/">
            <Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>
              Dashboard
            </Heading>
          </Link>
        </Flex>
        <Flex w="100%" height={55} _hover={{ bg: "blue.900" }} align={"center"}>
          <Link to="/creditscore">
            <Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>
              Credit Insights
            </Heading>
          </Link>
        </Flex>
        <Flex w="100%" height={55} _hover={{ bg: "blue.900" }} align={"center"}>
          <Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>
            More Details
          </Heading>
        </Flex>
        <Flex w="100%" height={55} _hover={{ bg: "blue.900" }} align={"center"}>
          <Link to="/rewards">
          <Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>
            Rewards
          </Heading>
          </Link>
        </Flex>
        <Flex w="100%" height={55} _hover={{ bg: "blue.900" }} align={"center"}>
          <Link to="/tasks">
          <Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>
            Tasks
          </Heading>
          </Link>
        </Flex>
        <Flex w="100%" height={55} _hover={{ bg: "blue.900" }} align={"center"}>
          <Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>
            Loan Applications
          </Heading>
        </Flex>
      </VStack>
    );
  } else if (user.type == "FI") {
    return (
      <VStack w="100%" spacing={0} mt={150}>
        <Flex w="100%" height={55} _hover={{ bg: "blue.900" }} align={"center"}>
          <Link to="/">
            <Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>
              Dashboard
            </Heading>
          </Link>
        </Flex>
        <Flex w="100%" height={55} _hover={{ bg: "blue.900" }} align={"center"}>
          <Link to="/creditaccount">
            <Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>
              Open Credit Account
            </Heading>
          </Link>
        </Flex>
		<Flex w="100%" height={55} _hover={{ bg: "blue.900" }} align={"center"}>
          <Link to="/updatecreditaccount">
            <Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>
				Update Credit Account Balance
            </Heading>
          </Link>
        </Flex>
		<Flex w="100%" height={55} _hover={{ bg: "blue.900" }} align={"center"}>
          <Link to="/closecreditaccount">
            <Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>
				Close Credit Account
            </Heading>
          </Link>
        </Flex>
        <Flex w="100%" height={55} _hover={{ bg: "blue.900" }} align={"center"}>
          <Link to="/creditinquiry">
            <Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>
              Credit Inquiry
            </Heading>
          </Link>
        </Flex>
      </VStack>
    );
  }
}
