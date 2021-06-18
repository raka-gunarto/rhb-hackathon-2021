import {
	Box,
	Center,
	Text,
	Stack,
	List,
	ListItem,
	ListIcon,
	Button,
	Heading,
	Image
  } from '@chakra-ui/react';
  import { CheckIcon, InfoIcon } from '@chakra-ui/icons';
  
  export default function blogPostWithImage(props) {
	return (
	  <Center py={6} minH={"440px"}>
		<Box
		  minH={"445px"}
		  maxW={'500px'}
		  w={'full'}
		  bg={"white"}
		  boxShadow={'2xl'}
		  rounded={'md'}
		  overflow={'hidden'}>
			  <Image src={props.image} />
		  <Box bg={"gray.50"} px={6} pt={3} py={6}>
		  <Text
            color={'gray.600'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'lg'}
			mb={10}
            letterSpacing={1.1}>
				{props.title}
          </Text>
			<List spacing={3}>
		  {props.details.map((detail) => (
			  <ListItem>
				<ListIcon as={InfoIcon} color="gray.900" />
				{detail}	
			  </ListItem>
		  ))}
			</List>
			<Button
			  mt={10}
			  w={'full'}
			  bg={props.redeemed || props.unlocked ? 'gray.400' : 'gray.900'}
			  color={'white'}
			  rounded={'xl'}
			  _hover={props.redeemed || props.unlocked ? null : {
				bg: 'gray.600',
			  }}
			  _focus={{
				bg: 'gray.900',
			  }}>
				   <Text
            color={'white'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'md'}
            letterSpacing={1.1}>
				{props.unlocked ? "Locked" : props.redeemed ? "Redeemed" : "Redeem"}
          </Text>
			</Button>
		  </Box>
		</Box>
	  </Center>
	);
  }