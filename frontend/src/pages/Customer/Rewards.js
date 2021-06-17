import React from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import RewardsPanel from "../../components/RewardsPanel";
export default function Rewards() {
  return (
    <Flex minH={"100vh"}>
      <Flex minW={"15vw"} bg={"gray.900"}>
        <Navbar></Navbar>
      </Flex>
      <Flex minW={"85vw"} bg={"gray.800"}>
        <RewardsPanel />
      </Flex>
    </Flex>
  );
}
