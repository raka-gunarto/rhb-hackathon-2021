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
export default function TasksPanel(props) {
  const rewardRef = useRef(null);
  const { tasks, setTasks, setUserExperience } = useTasks();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(props.type);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {props.type == "business"
              ? tasks.businessUser[0].title
              : props.type == "goodUser"
              ? tasks.returningUserGood[0].title
              : tasks.returningUserBad[0].title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.type === "goodUser" ? (
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
                        if (newS.returningUserGood[0].subtasks.length === 0) {
                          rewardRef.current?.rewardMe();
                          setUserExperience(
                            (old) => old + tasks.returningUserGood[0].xp / 100
                          );
                          // onClose()
                        }
                        return newS;
                      });
                      console.log(tasks.returningUserGood[0].subtasks.length);
                    }}
                  >
                    <ListIcon as={CheckCircleIcon} color="green.300" />
                    {subtask.content}
                  </ListItem>
                ))}
              </List>
            ) : props.type === "business" ? (
              <List spacing={3}>
                {tasks.businessUser[0].subtasks.map((subtask) => (
                  <ListItem
                    cursor="pointer"
                    onClick={() => {
                      setTasks((old) => {
                        const newSubtasks = old.businessUser[0].subtasks
                          .slice()
                          .filter((task) => task.id !== subtask.id);
                        const newS = { ...old };
                        newS.businessUser[0].subtasks = newSubtasks;
                        if (newS.businessUser[0].subtasks.length === 0) {
                          rewardRef.current?.rewardMe();
                          setUserExperience(
                            (old) => old + tasks.businessUser[0].xp / 100
                          );
                          // onClose()
                        }
                        return newS;
                      });
                      console.log(tasks.businessUser[0].subtasks.length);
                    }}
                  >
                    <ListIcon as={CheckCircleIcon} color="green.300" />
                    {subtask.content}
                  </ListItem>
                ))}
              </List>
            ) : (
              <List spacing={3}>
                {tasks.returningUserBad[0].subtasks.map((subtask) => (
                  <ListItem
                    cursor="pointer"
                    onClick={() => {
                      setTasks((old) => {
                        const newSubtasks = old.returningUserBad[0].subtasks
                          .slice()
                          .filter((task) => task.id !== subtask.id);
                        const newS = { ...old };
                        newS.returningUserBad[0].subtasks = newSubtasks;
                        if (newS.returningUserBad[0].subtasks.length === 0) {
                          rewardRef.current?.rewardMe();
                          setUserExperience(
                            (old) => old + tasks.returningUserBad[0].xp / 100
                          );
                          // onClose()
                        }
                        return newS;
                      });
                    }}
                  >
                    <ListIcon as={CheckCircleIcon} color="green.300" />
                    {subtask.content}
                  </ListItem>
                ))}
              </List>
            )}
            <Center
              hidden={
                props.type === "business"
                  ? tasks.businessUser[0].subtasks.length != 0
                  : props.type === "goodUser"
                  ? tasks.returningUserGood[0].subtasks.length != 0
                  : tasks.returningUserBad[0].subtasks.length != 0
              }
            >
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
            {props.type === "business"
              ? tasks.businessUser.map((task, i) => (
                  <GridItem rowSpan={1} colSpan={1}>
                    <TaskCard
                      title={task.title}
                      description={task.description}
                      progress={
                        props.type === "goodUser" || props.type === "badUser"
                          ? i === 0
                            ? Math.floor(
                                ((tasks.businessUser[0].subtasksLen -
                                  tasks.businessUser[0].subtasks.length) /
                                  tasks.businessUser[0].subtasksLen) *
                                  100
                              )
                            : 100
                          : i === 0
                          ? Math.floor(
                              ((tasks.businessUser[0].subtasksLen -
                                tasks.businessUser[0].subtasks.length) /
                                tasks.businessUser[0].subtasksLen) *
                                100
                            )
                          : 0
                      }
                      xp={task.xp}
                      onOpen={onOpen}
                    />
                  </GridItem>
                ))
              : props.type === "goodUser"
              ? tasks.returningUserGood.map((task, i) => (
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
                ))
              : tasks.returningUserBad.map((task, i) => (
                  <GridItem rowSpan={1} colSpan={1}>
                    <TaskCard
                      title={task.title}
                      description={task.description}
                      progress={
                        i === 0
                          ? Math.floor(
                              ((tasks.returningUserBad[0].subtasksLen -
                                tasks.returningUserBad[0].subtasks.length) /
                                tasks.returningUserBad[0].subtasksLen) *
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
