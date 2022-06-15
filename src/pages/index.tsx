import { Center, Flex, Text, FormControl, FormLabel, Input, Button, Heading } from '@chakra-ui/react'

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

      <Flex
        background="#fff"
        borderRadius={8}
        padding={4}
        direction="column"
        gridGap="25px"
        minWidth={320}
      >
        <Heading
          fontSize={20}
        >
          Fazer login
        </Heading>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input />
        </FormControl>

        <FormControl>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
          />
        </FormControl>

        <Button
          background="#405090"
          color="#fff"

          _hover={{
            background: "#405090",
            opacity: 0.8,
          }}
        >
          Entrar
        </Button>
      </Flex>
    </Center>
  )
}

export default Home