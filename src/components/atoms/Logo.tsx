import Image from 'next/image'
import Rifoo from '../../assets/rifoo.svg'
import RifooDev from '../../assets/rifoodev.svg'

const Logo = () => {

    const stage = `${process.env.NEXT_PUBLIC_STAGE_APP}`

    return (
        <Image
            src={Rifoo}
            alt="Rifoo"
            width={104}
            height={30}
        />
    )
}

export default Logo