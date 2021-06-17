import React, { useRef } from "react";
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
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import Reward from "react-rewards";
import { CheckCircleIcon } from "@chakra-ui/icons";
import TaskCard from "./TaskCard";
import { useTasks } from "../hooks/TasksProvider";
export default function TasksPanel() {
  const rewardRef = useRef(null);
  const { tasks, setTasks, setUserExperience } = useTasks();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{tasks.returningUserGood[0].title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3}>
              {tasks.returningUserGood[0].subtasks.map((subtask) => (
                <ListItem
                  cursor="pointer"
                  onClick={() => {
                    setTasks((old) => {
                      const newSubtasks = old.returningUserGood[0].subtasks
                        .slice()
                        .filter((task) => task.id !== subtask.id);
                      const newS = { ...old };
                      newS.returningUserGood[0].subtasks = newSubtasks;
                      return newS;
                    });
                    console.log(tasks.returningUserGood[0].subtasks.length);
                    if (tasks.returningUserGood[0].subtasks.length === 0) {
                      rewardRef.current?.rewardMe();
                      setUserExperience(
                        (old) => old + tasks.returningUserGood[0].xp / 100
                      );
                      // onClose()
                    }
                  }}
                >
                  <ListIcon as={CheckCircleIcon} color="green.300" />
                  {subtask.content}
                </ListItem>
              ))}
            </List>
            <Center hidden={tasks.returningUserGood[0].subtasks.length != 0}>
              <Reward ref={rewardRef} type={"confetti"}>
                <CheckCircleIcon color="green.300" w={12} h={12} />
              </Reward>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex minW="100%" direction="column">
        <Flex w="100%" mt={100} ml={50}>
          <Flex direction="column" align="left">
            <Heading size={"3xl"} color="white">
              Your tasks
            </Heading>
            <Heading color="white" size="lg" fontWeight="thin" ml={2} mt={5}>
              {" "}
              Complete the tasks below to earn exclusive rewards
            </Heading>
          </Flex>
        </Flex>
        <Flex w="100%" ml={50} mt={"100px"} justify="center">
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={10}
          >
            {tasks.returningUserGood.map((task, i) => (
              <GridItem rowSpan={1} colSpan={1}>
                <TaskCard
                  title={task.title}
                  description={task.description}
                  progress={
                    i === 0
                      ? Math.floor(
                          ((tasks.returningUserGood[0].subtasksLen -
                            tasks.returningUserGood[0].subtasks.length) /
                            tasks.returningUserGood[0].subtasksLen) *
                            100
                        )
                      : 100
                  }
                  xp={task.xp}
                  onOpen={onOpen}
                />
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Flex>
    </>
  );
}
