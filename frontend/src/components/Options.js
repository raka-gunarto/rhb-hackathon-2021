import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function ThreeTierPricing(props) {
  console.log(props.creditScore)
  if(props.creditScore <= 540){
		return (
			<Box py={12}>
			  <VStack spacing={2} textAlign="center">
				<Heading as="h1" fontSize="4xl" color={"white"}>
				  Solutions tailored to you.
				</Heading>
				<Text fontSize="lg" color={"white"}>
					Get your credit score back on track with our advisory packages.	 
				</Text>
			  </VStack>
			  <Stack
				direction={{ base: "column", md: "row" }}
				textAlign="center"
				justify="center"
				spacing={{ base: 4, lg: 10 }}
				py={10}
			  >
				<PriceWrapper>
				  <Box py={4} px={12}>
					<Text fontWeight="500" fontSize="2xl" color="white">
					  Financial Advisor
					</Text>
					<HStack justifyContent="center">
					  <Text fontSize="3xl" fontWeight="600" color="white">
						$
					  </Text>
					  <Text fontSize="5xl" fontWeight="900" color="white">
						79
					  </Text>
					  <Text fontSize="3xl" color="gray.500" color="white">
						/month
					  </Text>
					</HStack>
				  </Box>
				  <VStack
					bg={"gray.50"}
					py={4}
					borderBottomRadius={"xl"}
				  >
					<List spacing={3} textAlign="start" px={12}>
					  <ListItem>
						<ListIcon as={FaCheckCircle} color="green.500" />
						Trusted
					  </ListItem>
					  <ListItem>
						<ListIcon as={FaCheckCircle} color="green.500" />
						Personal
					  </ListItem>
					  <ListItem>
						<ListIcon as={FaCheckCircle} color="green.500" />
						Resourceful
					  </ListItem>
					</List>
					<Box w="80%" pt={7}>
					  <Button w="full" colorScheme="blackAlpha" variant="outline">
						Start trial
					  </Button>
					</Box>
				  </VStack>
				</PriceWrapper>
				<PriceWrapper>
				  <Box position="relative">
					<Box
					  position="absolute"
					  top="-16px"
					  left="50%"
					  style={{ transform: "translate(-50%)" }}
					>
					  <Text
						textTransform="uppercase"
						bg={"gray.300"}
						px={3}
						py={1}
						color={"gray.900"}
						fontSize="sm"
						fontWeight="600"
						rounded="xl"
					  >
						Most Popular
					  </Text>
					</Box>
					<Box py={4} px={12}>
					  <Text fontWeight="500" fontSize="2xl" color="white">
						Credit Express
					  </Text>
					  <HStack justifyContent="center">
						<Text fontSize="3xl" fontWeight="600" color="white">
						  $
						</Text>
						<Text fontSize="5xl" fontWeight="900" color="white">
						  149
						</Text>
						<Text fontSize="3xl" color="gray.500" color="white">
						  /month
						</Text>
					  </HStack>
					</Box>
					<VStack
					  bg={"gray.50"}
					  py={4}
					  borderBottomRadius={"xl"}
					>
					  <List spacing={3} textAlign="start" px={12}>
						<ListItem>
						  <ListIcon as={FaCheckCircle} color="green.500" />
						  Personal advising team
						</ListItem>
						<ListItem>
						  <ListIcon as={FaCheckCircle} color="green.500" />
						  24/7 Advisory Line
						</ListItem>
						<ListItem>
						  <ListIcon as={FaCheckCircle} color="green.500" />
						  Unlimited Appointments
						</ListItem>
						<ListItem>
						  <ListIcon as={FaCheckCircle} color="green.500" />
						  Walk in availability
						</ListItem>
						<ListItem>
						  <ListIcon as={FaCheckCircle} color="green.500" />
						  Personal hotline
						</ListItem>
					  </List>
					  <Box w="80%" pt={7}>
						<Button w="full" colorScheme="blackAlpha" variant="outline">
						  Find out more
						</Button>
					  </Box>
					</VStack>
				  </Box>
				</PriceWrapper>
				<PriceWrapper>
				  <Box py={4} px={12}>
					<Text fontWeight="500" fontSize="2xl" color="white">
					  Full Advisor Package
					</Text>
					<HStack justifyContent="center">
					  <Text fontSize="3xl" fontWeight="600" color="white">
						$
					  </Text>
					  <Text fontSize="5xl" fontWeight="900" color="white">
						349
					  </Text>
					  <Text fontSize="3xl" color="gray.500" color="white">
						/month
					  </Text>
					</HStack>
				  </Box>
				  <VStack
					bg={"gray.50"}
					py={4}
					borderBottomRadius={"xl"}
				  >
					<List spacing={3} textAlign="start" px={12}>
					  <ListItem>
						<ListIcon as={FaCheckCircle} color="green.500" />
						Personal Financing Team
					  </ListItem>
					  <ListItem>
						<ListIcon as={FaCheckCircle} color="green.500" />
						10 year credit analysis
					  </ListItem>
					  <ListItem>
						<ListIcon as={FaCheckCircle} color="green.500" />
						Unlmited Appointments
					  </ListItem>
					</List>
					<Box w="80%" pt={7}>
					  <Button w="full" colorScheme="blackAlpha" variant="outline">
						Find out more
					  </Button>
					</Box>
				  </VStack>
				</PriceWrapper>
			  </Stack>
			</Box>
	)
  } else {
	  return (
		<Box py={12}>
		<VStack spacing={2} textAlign="center">
		  <Heading as="h1" fontSize="4xl" color={"white"}>
			Solutions tailored to you.
		  </Heading>
		  <Text fontSize="lg" color={"white"}>
			Make use of your good credit score with one of our loans.
		  </Text>
		</VStack>
		<Stack
		  direction={{ base: "column", md: "row" }}
		  textAlign="center"
		  justify="center"
		  spacing={{ base: 4, lg: 10 }}
		  py={10}
		>
		  <PriceWrapper>
			<Box py={4} px={12}>
			  <Text fontWeight="500" fontSize="2xl" color="white">
				Loan Advisor Sessions
			  </Text>
			  <HStack justifyContent="center">
				<Text fontSize="3xl" fontWeight="600" color="white">
				  $
				</Text>
				<Text fontSize="5xl" fontWeight="900" color="white">
				  79
				</Text>
				<Text fontSize="3xl" color="gray.500" color="white">
				  /month
				</Text>
			  </HStack>
			</Box>
			<VStack
			  bg={"gray.50"}
			  py={4}
			  borderBottomRadius={"xl"}
			>
			  <List spacing={3} textAlign="start" px={12}>
				<ListItem>
				  <ListIcon as={FaCheckCircle} color="green.500" />
				  Trusted
				</ListItem>
				<ListItem>
				  <ListIcon as={FaCheckCircle} color="green.500" />
				  Personal
				</ListItem>
				<ListItem>
				  <ListIcon as={FaCheckCircle} color="green.500" />
				  Resourceful
				</ListItem>
			  </List>
			  <Box w="80%" pt={7}>
				<Button w="full" colorScheme="blackAlpha" variant="outline">
				  Start trial
				</Button>
			  </Box>
			</VStack>
		  </PriceWrapper>
		  <PriceWrapper>
			<Box position="relative">
			  <Box
				position="absolute"
				top="-16px"
				left="50%"
				style={{ transform: "translate(-50%)" }}
			  >
				<Text
				  textTransform="uppercase"
				  bg={"gray.300"}
				  px={3}
				  py={1}
				  color={"gray.900"}
				  fontSize="sm"
				  fontWeight="600"
				  rounded="xl"
				>
				  Most Popular
				</Text>
			  </Box>
			  <Box py={4} px={12}>
				<Text fontWeight="500" fontSize="2xl" color="white">
				  Low Interest Loan
				</Text>
				<HStack justifyContent="center">
				  <Text fontSize="3xl" fontWeight="600" color="white">
					$
				  </Text>
				  <Text fontSize="5xl" fontWeight="900" color="white">
					149
				  </Text>
				  <Text fontSize="3xl" color="gray.500" color="white">
					/month
				  </Text>
				</HStack>
			  </Box>
			  <VStack
				bg={"gray.50"}
				py={4}
				borderBottomRadius={"xl"}
			  >
				<List spacing={3} textAlign="start" px={12}>
				  <ListItem>
					<ListIcon as={FaCheckCircle} color="green.500" />
					Payment schedule that suits you
				  </ListItem>
				  <ListItem>
					<ListIcon as={FaCheckCircle} color="green.500" />
					24/7 Advisory Line
				  </ListItem>
				  <ListItem>
					<ListIcon as={FaCheckCircle} color="green.500" />
					Unlimited Appointments
				  </ListItem>
				  <ListItem>
					<ListIcon as={FaCheckCircle} color="green.500" />
					Low interest rates
				  </ListItem>
				  <ListItem>
					<ListIcon as={FaCheckCircle} color="green.500" />
					Top up if needed
				  </ListItem>
				</List>
				<Box w="80%" pt={7}>
				  <Button w="full" colorScheme="blackAlpha" variant="outline">
					Find out more
				  </Button>
				</Box>
			  </VStack>
			</Box>
		  </PriceWrapper>
		  <PriceWrapper>
			<Box py={4} px={12}>
			  <Text fontWeight="500" fontSize="2xl" color="white">
				Loan Advisory Package
			  </Text>
			  <HStack justifyContent="center">
				<Text fontSize="3xl" fontWeight="600" color="white">
				  $
				</Text>
				<Text fontSize="5xl" fontWeight="900" color="white">
				  349
				</Text>
				<Text fontSize="3xl" color="gray.500" color="white">
				  /month
				</Text>
			  </HStack>
			</Box>
			<VStack
			  bg={"gray.50"}
			  py={4}
			  borderBottomRadius={"xl"}
			>
			  <List spacing={3} textAlign="start" px={12}>
				<ListItem>
				  <ListIcon as={FaCheckCircle} color="green.500" />
				  Low Interest Rates
				</ListItem>
				<ListItem>
				  <ListIcon as={FaCheckCircle} color="green.500" />
				  24/7 advisors
				</ListItem>
				<ListItem>
				  <ListIcon as={FaCheckCircle} color="green.500" />
				  Unlmited Appointments
				</ListItem>
			  </List>
			  <Box w="80%" pt={7}>
				<Button w="full" colorScheme="blackAlpha" variant="outline">
				  Find out more
				</Button>
			  </Box>
			</VStack>
		  </PriceWrapper>
		</Stack>
	  </Box>
	  )
  }

}
