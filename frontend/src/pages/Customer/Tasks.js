import React from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import NewTasksPanel from "../../components/NewTasksPanel";
import TasksPanel from "../../components/TasksPanel";
import calculateCreditScore from '../../utils/calculateCreditScore'
import {useRHBChain} from '../../hooks/RHBProvider'
export default function Tasks(props) {
  const {reportVars} = useRHBChain()
  return reportVars ? (
    <Flex minH={"100vh"}>
      <Flex minW={"15vw"} bg={"gray.900"}>
        <Navbar></Navbar>
      </Flex>
      <Flex minW={"85vw"} bg={"gray.800"}>
        {reportVars.newUser ? <NewTasksPanel /> : <TasksPanel />} 
      </Flex>
    </Flex>
  ) : null;
}
