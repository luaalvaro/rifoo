import {
  Flex,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Container from '../../components/Container'
import HomeButtom from '../../components/HomeButtom'
import { BsBoxSeam, BsCartPlusFill, BsFillFileEarmarkBarGraphFill } from 'react-icons/bs'

const Home = () => {

  const router = useRouter()

  const services = [
    { title: "Nova venda", icon: BsCartPlusFill, href: "/app/novavenda" },
    { title: "Minhas vendas", icon: BsFillFileEarmarkBarGraphFill, href: "/app/minhasvendas" },
    { title: "Meus produtos", icon: BsBoxSeam, href: "/app/produtos" },
  ]

  return (
    <Container>
      <Header />

      <Text
        fontSize={18}
        mt="15px"
        mx="15px"
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
    </Container>
  )
}

export default Home