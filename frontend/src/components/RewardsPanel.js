import React, {useState} from "react";
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
  Progress,
} from "@chakra-ui/react";
import RewardCard from "./RewardCard";
import { useTasks } from "../hooks/TasksProvider";
import {useRHBChain} from '../hooks/RHBProvider'
export default function RewardsPanel() {
  const [loaded, setLoaded] = useState(0)
  const { rewards, userExperience } = useTasks();
  const { user, reportVars, refresh } = useRHBChain();
  console.log(rewards);
  console.log({userExperience})
  return reportVars ? (
    <Flex direction="column" w="100%">
      <Flex minW="100%" mt={100} ml={50}>
        <Flex direction="column" align="left">
          <Heading size={"3xl"} color="white">
            Rewards
          </Heading>
          <Heading color="white" size="lg" fontWeight="thin" ml={2} mt={5}>
            {" "}
            {reportVars.businessUser ? "Unlock our incredible business financing solutions" : "Unlock incredible rewards offered by our partners"}
          </Heading>
        </Flex>
        <Spacer />
        <Flex minW={"40%"} direction="column" mr="120px">
          <Progress
            colorScheme="teal"
            height={"30px"}
            borderRadius={50}
            bg="gray.300"
            mr={200}
            mt={10}
            value={(userExperience - Math.floor(userExperience)) * 100}
            minW="30%"
          />
          <Center ml="280px">
            <Heading
              color={"white"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"3xl"}
              letterSpacing={1.1}
              ml={"40px"}
              mt={"20px"}
            >
              Level {Math.floor(userExperience)}
            </Heading>
          </Center>
        </Flex>
      </Flex>
      <Flex w="100%" ml={50} mt={"100px"} justify="center">
        <Grid
          templateRows="repeat(2, 1fr)"
          mr={10}
          templateColumns="repeat(3, 1fr)"
          gap={35}
        >
          {reportVars.businessUser ? rewards.businessUser.map((reward, i) => (
            <GridItem rowSpan={1} colSpan={1}>
              <RewardCard setLoaded={setLoaded} image={reward.image} apply={true} title={reward.title} redeemed={reward.redeemed} unlocked={reward.unlocked && userExperience !== 1} details={reward.details}/>
            </GridItem>
          )) : 
          rewards.returningUser.map((reward, i) => (
            <GridItem rowSpan={1} colSpan={1}>
              <RewardCard image={reward.image} apply={false} title={reward.title} redeemed={reward.redeemed} unlocked={userExperience === 1} details={reward.details}/>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  ) : null;
}
