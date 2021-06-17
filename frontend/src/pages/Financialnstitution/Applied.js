import {VStack, Flex, Heading, Text} from '@chakra-ui/react'
import React from 'react'
export default function Applied() {
	return (
		<Flex minH="100vh" minW="100vw" align="center" justify="center" bg={"gray.900"} >
			<VStack spacing={4}>
				<Heading size={"3xl"} color="white">Thank you for applying to be a Financial Institution.</Heading>
				<Text color="white">Your application has been received and will be reviewed and voted upon shortly.</Text>
			</VStack>
		</Flex>
	)
}