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
  import { CheckIcon } from '@chakra-ui/icons';
  
  export default function blogPostWithImage(props) {
	return (
	  <Center py={6}>
		<Box
		  maxW={'500px'}
		  w={'full'}
		  bg={"white"}
		  boxShadow={'2xl'}
		  rounded={'md'}
		  overflow={'hidden'}>
			  <Image src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80" />
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
			  <ListItem>
				<ListIcon as={CheckIcon} color="green.400" />
				5.000 page views
			  </ListItem>
			  <ListItem>
				<ListIcon as={CheckIcon} color="green.400" />
				50 automation executions
			  </ListItem>
			  <ListItem>
				<ListIcon as={CheckIcon} color="green.400" />
				50 identified users
			  </ListItem>
			  <ListItem>
				<ListIcon as={CheckIcon} color="green.400" />
				All features
			</ListItem>
			</List>
			<Button
			  mt={10}
			  w={'full'}
			  bg={props.redeemed ? 'gray.400' : 'gray.900'}
			  color={'white'}
			  rounded={'xl'}
			  _hover={props.redeemed ? null : {
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
				{props.redeemed ? "Redeemed" : "Redeem"}
          </Text>
			</Button>
		  </Box>
		</Box>
	  </Center>
	);
  }