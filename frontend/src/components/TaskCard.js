import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Image,
  Progress, 
  Flex,
  Spacer
} from '@chakra-ui/react';

export default function blogPostWithImage(props) {
  return (
    <Center minH={"445px"} py={6} onClick={() => {props.onOpen()}}>
      <Box
        maxW={'445px'}
        minW={'400px'}
        w={'full'}
        bg={"white"}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'180px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={150}
          pos={'relative'}>
          <Image
            src={
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            objectFit="cover"
          />
        </Box>
        <Stack spacing={10} minH={'250px'}>
          <Text
            color={'gray.900'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'md'}
            letterSpacing={1.1}>
            {props.title}
          </Text>
          <Text color={'gray.500'} minH={'50px'}>
            {props.description}
          </Text>
          <Progress mt={10} bg={"gray.300"} value={props.progress} borderRadius={30}/>
          <Flex minW="100%">
            {props.progress === 100 ?  <Text
            color={props.progress === 100 ? 'green.300' : 'gray.600'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'md'}
            letterSpacing={1.1}>Completed</Text> : <Text>{`${props.progress}% completed`}</Text> }
            <Spacer />
            <Text
            color={props.progress === 100 ? 'green.300' : 'gray.600'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'md'}
            letterSpacing={1.1}>
            + {props.xp} XP
          </Text>
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
}