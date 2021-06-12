import React from 'react'
import {Flex} from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import CreditScorePanel from '../../components/CreditScorePanel'
import {useMetamask} from 'use-metamask'
import {useRHBChain} from '../../hooks/RHBProvider'
export default function CreditScore() {
	const {user} = useRHBChain();
	console.log(user)
	return (
		<Flex minH={"100vh"}>
			<Flex minW={"15vw"} bg={"gray.900"}>
				<Navbar></Navbar>
			</Flex> 
			<Flex minW={"85vw"} bg={"gray.800"}>
				<CreditScorePanel />
			</Flex>
		</Flex>
	)
}