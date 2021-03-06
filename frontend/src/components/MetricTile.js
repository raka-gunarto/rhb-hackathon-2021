import React from "react";
import { Center, VStack, Heading, Text, Flex, Image} from "@chakra-ui/react";
import meterIcon from '../assets/meter.png'
export default function MetricTile(props) {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      height={350}
      width={350}
      borderRadius={30}
      bg="gray.900"
    >
      <VStack spacing={5}>
        <Image src={meterIcon} boxSize="200px" />
        <Heading color={"gray.300"} size={"2xl"} fontWeight="bold">
          {props.stat}
        </Heading>
        <Heading color={"gray.300"} size={"md"}>
          {props.subtitle}
        </Heading>
      </VStack>
    </Flex>
  );
}
