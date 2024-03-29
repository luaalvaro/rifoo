import {
  Flex,
  Text,
  Stack,
  Skeleton,
} from '@chakra-ui/react'
import Header from '../../components/Header'
import AuthProvider from '../../components/AuthProvider'
import HomeButtom from '../../components/HomeButtom'
import { services } from '../../constants/defaultValues'
import supabase from '../../services/supabase'
import HistoryCard from '../../components/HistoryCard'
import { RiAdminFill } from 'react-icons/ri'
import useSWR from 'swr'
import useAuth from '../../store/useAuth'
import moment from 'moment'
import { useRouter } from 'next/router'

const fetcherLastSale = async (url: any) => await supabase
  .from('sales')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(1)
  .single()

const Home = () => {

  const router = useRouter()
  const { profile } = useAuth()

  const { data: saleData, error: saleError } = useSWR('lastsale', fetcherLastSale)
  const lastSale = saleData?.data

  const loading = !saleData || !profile

  const timeToExpire = moment(profile?.valid_until, "YYYY-MM-DD").fromNow()
  const signatureStatusDate = timeToExpire.includes('há') ? 'pendente' : 'ativa'

  return (
    <AuthProvider>
      <Header />

      {
        loading &&
        <Stack padding="15px">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      }

      {
        !loading && profile && (
          <>
            <Text
              fontSize={18}
              mt="15px"
              mx="15px"
              userSelect="none"
            >
              Boas vendas, <b>{profile?.fullName}</b>
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

              {profile?.member_type === "admin" &&
                <HomeButtom
                  title="Administração"
                  icon={RiAdminFill}
                  href="/app/admin"
                />
              }

              {lastSale &&
                <>
                  <Text
                    fontSize={14}
                    fontWeight="600"
                    mt="15px"
                    userSelect="none"
                  >
                    Última venda
                  </Text>
                  <HistoryCard sale={lastSale} enableDetails={false} />
                </>
              }

              {signatureStatusDate === 'pendente' && (
                <Text
                  position="absolute"
                  bottom="25px"
                  left={0}
                  right={0}

                  textAlign="center"
                  fontSize="22px"
                  userSelect="none"
                  cursor="pointer"

                  onClick={() => router.push('/app/perfil')}
                >
                  Sua assinatura expirou {timeToExpire}<br />
                  <span style={{ color: 'red' }}>Clique aqui para regularizar</span>
                </Text>
              )}
            </Flex>
          </>
        )
      }
    </AuthProvider >
  )
}

export default Home