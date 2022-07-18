import {
    Text,
} from '@chakra-ui/react'
import Header from '../components/Header'
import Container from '../components/Container'
import BottomMenuNewOrder from '../components/BottomMenuNewOrder'
import NewOrderItem from '../components/NewOrderItem'

const Home = () => {

    return (
        <Container>
            <Header />

            <Text
                fontSize={18}
                mt="15px"
                mx="15px"
                fontWeight={400}
            >
                Realizar nova venda
            </Text>

            <NewOrderItem />
            <NewOrderItem />

            <BottomMenuNewOrder />
        </Container>
    )
}

export default Home