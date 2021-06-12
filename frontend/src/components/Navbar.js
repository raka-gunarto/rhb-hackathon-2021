import React from 'react'
import {VStack, Text, Flex, Center, Box, Heading} from '@chakra-ui/react'

export default function Navbar(){
	return (
		<VStack w="100%" spacing={0} mt={150} >
			<Flex w="100%" height={55} _hover={{bg: "blue.900"}} align={"center"}>
				<Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>Loan Applications</Heading>
			</Flex>
			<Flex w="100%" height={55} _hover={{bg: "blue.900"}} align={"center"}>
				<Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>Credit Report</Heading>
			</Flex>
			<Flex w="100%" height={55} _hover={{bg: "blue.900"}} align={"center"}>
				<Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>More Details</Heading>
			</Flex>
			<Flex w="100%" height={55} _hover={{bg: "blue.900"}} align={"center"}>
				<Heading ml={50} color={"white"} fontWeight={"thin"} size={"md"}>Loan Applications</Heading>
			</Flex>
		</VStack>
	)
}