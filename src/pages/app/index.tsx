import {
  Flex,
  Text,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import AuthProvider from '../../components/AuthProvider'
import HomeButtom from '../../components/HomeButtom'
import { services } from '../../constants/defaultValues'

const Home = () => {

  return (
    <AuthProvider>
      <Header />

      <Text
        fontSize={18}
        mt="15px"
        mx="15px"
        userSelect="none"
      >
        Boas vendas, <b>Genilson Andrade</b>
      </Text>

      <Flex
        direction="column"
        gridGap="15px"
        px="15px"
        pt="15px"
      >
        {services.map(service => (
          <HomeButtom
            key={service.title}
            title={service.title}
            icon={service.icon}
            href={service.href}
          />
        ))}

      </Flex>
    </AuthProvider>
  )
}

export default Home