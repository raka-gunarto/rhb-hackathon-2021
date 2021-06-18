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
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Reward from "react-rewards";
import TaskCard from "./TaskCard";
import { useTasks } from "../hooks/TasksProvider";
export default function NewTasksPanel() {
  const rewardRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tasks, setTasks, userExperience, setUserExperience } = useTasks();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent pb={10}>
          <ModalHeader>
            {tasks.newUser[0].subtasks.length === 0
              ? "Task Complete!"
              : "Getting Started"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3}>
              {tasks.newUser[0].subtasks.map((subtask) => (
                <ListItem
                  cursor="pointer"
                  onClick={() => {
                    setTasks((old) => {
                      const newSubtasks = old.newUser[0].subtasks
                        .slice()
                        .filter((task) => task.id !== subtask.id);
                      const newS = { ...old };
                      newS.newUser[0].subtasks = newSubtasks;
                      return newS;
                    });
                    console.log(tasks.newUser[0].subtasks.length);
                    if (tasks.newUser[0].subtasks.length === 1) {
                      rewardRef.current?.rewardMe();
                      setUserExperience(
                        (old) => old + tasks.newUser[0].xp / 100
                      );
                    }
                  }}
                >
                  <ListIcon as={CheckCircleIcon} color="green.300" />
                  {subtask.content}
                </ListItem>
              ))}
            </List>
            <Center hidden={tasks.newUser[0].subtasks.length != 0}>
              <Reward ref={rewardRef} type={"confetti"}>
                <CheckCircleIcon color="green.300" w={12} h={12} />
              </Reward>
            </Center>
          </ModalBody>
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
        <Flex w="100%" mt={"100px"} justify="center">
          <TaskCard
            onOpen={onOpen}
            title={tasks.newUser[0].title}
            description={tasks.newUser[0].description}
            progress={Math.floor(
              ((tasks.newUser[0].subtasksLen -
                tasks.newUser[0].subtasks.length) /
                tasks.newUser[0].subtasksLen) *
                100
            )}
            xp={20}
          />
        </Flex>
      </Flex>
    </>
  );
}
