import {
  Center,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading
} from '@chakra-ui/react'

const Home = () => {

  return (
    <Center
      minHeight="100vh"
      background="#405090"
      flexDirection="column"
    >

      <Heading
        color="#fff"
        fontSize={44}
        mt="-120px"
        mb="120px"
      >
        Rifoo
      </Heading>


    </Center>
  )
}

export default Home