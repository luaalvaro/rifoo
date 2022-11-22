import { Flex, } from '@chakra-ui/react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import {
    EstoqueAutomatico,
    Footer,
    Header,
    Hero,
    Oferta,
    PrimeiraVenda,
    Provas,
    SecondaryHero,
    Vantagens
} from '../components/Landing'

const Home = () => {
    return (
        <Flex
            minHeight="100vh"
            direction='column'

            overflowX="hidden"
        >
            <Header />
            <Hero />
            <Vantagens />
            <Provas />
            <PrimeiraVenda />
            <EstoqueAutomatico />
            <Oferta />
            <SecondaryHero />
            <Footer />
        </Flex>
    )
}

export default Home