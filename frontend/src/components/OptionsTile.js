import React from "react";
import { Center, VStack, Heading, Text, Flex, Image} from "@chakra-ui/react";
import meterIcon from '../assets/meter.png'
export default function OptionsTile(props) {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      height={600}
      width={450}
      borderRadius={30}
      bg="gray.900"
	  ml={20}
	  p={10}
    >
      <VStack spacing={20}>
        <Image src={props.image} boxSize="200px" />
        <Heading color={"gray.300"} size={"2xl"} mt={30} align={"center"} 
            fontWeight={"bold"}
            fontSize={'3xl'}
            letterSpacing={1.1}>
          {props.title}
        </Heading>
      </VStack>
    </Flex>
  );
}
