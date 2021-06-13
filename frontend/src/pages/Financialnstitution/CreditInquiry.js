import React from 'react'
import {Flex} from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import CreditInquiryPanel from '../../components/CreditInquiryPanel'
export default function CreditInquiry() {
	return (
		<Flex minH={"100vh"}>
			<Flex minW={"15vw"} bg={"gray.900"}>
				<Navbar></Navbar>
			</Flex> 
			<Flex minW={"85vw"} bg={"gray.800"}>
				<CreditInquiryPanel />
			</Flex>
		</Flex>
	)
}