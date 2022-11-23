import { useRouter } from "next/router"

interface LogoProps {
    variant?: 'default' | 'footer'
}

const Logo: React.FC<LogoProps> = ({ variant = "default" }) => {

    const router = useRouter()
    const width = variant === 'footer' ? 104 * 2 : 104
    const height = variant === 'footer' ? 30 * 2 : 30
    const fill = variant === "default" ? "#405090" : "#D0D5DF"

    return (
        <svg
            onClick={() => router.push('#hero')}
            style={{
                cursor: 'pointer',
            }}
            width={width}
            height={height}
            viewBox="0 0 104 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M103 19C103 22.31 100.31 25 97 25V23.5C99.48 23.5 101.5 21.48 101.5 19H103ZM81 9C81 5.69 83.69 3 87 3V4.5C84.52 4.5 82.5 6.52 82.5 9H81ZM88.01 6.32L83.41 10.92C80.19 14.14 80.19 19.37 83.41 22.59C86.63 25.81 91.86 25.81 95.08 22.59L102.15 15.52C102.64 15.03 102.64 14.24 102.15 13.75C102.034 13.6336 101.896 13.5412 101.744 13.4782C101.592 13.4152 101.429 13.3828 101.265 13.3828C101.101 13.3828 100.938 13.4152 100.786 13.4782C100.634 13.5412 100.496 13.6336 100.38 13.75L95.96 18.17L95.25 17.46L101.79 10.92C102.28 10.43 102.28 9.64 101.79 9.15C101.3 8.66 100.51 8.66 100.02 9.15L94.19 14.98L93.48 14.27L100.37 7.38C100.86 6.89 100.86 6.1 100.37 5.61C99.88 5.12 99.09 5.12 98.6 5.61L91.71 12.5L91.02 11.8L96.5 6.32C96.99 5.83 96.99 5.04 96.5 4.55C96.01 4.06 95.22 4.06 94.73 4.55L87.11 12.17C87.7066 12.9396 88.0023 13.9004 87.9415 14.8723C87.8808 15.8442 87.4678 16.7606 86.78 17.45L86.07 16.74C86.6318 16.1775 86.9474 15.415 86.9474 14.62C86.9474 13.825 86.6318 13.0625 86.07 12.5L85.72 12.15L89.79 8.08C90.28 7.59 90.28 6.8 89.79 6.31C89.5512 6.07803 89.2309 5.9491 88.898 5.95097C88.565 5.95284 88.2462 6.08536 88.01 6.32Z" fill={fill} />
            <path d="M8.88 2.31C9.98 2.31 10.99 2.46 11.91 2.76C12.85 3.04 13.66 3.47 14.34 4.05C15.04 4.61 15.58 5.31 15.96 6.15C16.36 6.97 16.56 7.93 16.56 9.03C16.56 9.89 16.43 10.73 16.17 11.55C15.93 12.37 15.52 13.12 14.94 13.8C14.36 14.46 13.6 15 12.66 15.42C11.74 15.82 10.6 16.02 9.24 16.02H6.03V24H3.12V2.31H8.88ZM9.18 13.23C10.04 13.23 10.75 13.1 11.31 12.84C11.89 12.58 12.34 12.25 12.66 11.85C12.98 11.43 13.21 10.98 13.35 10.5C13.49 10.02 13.56 9.57 13.56 9.15C13.56 8.71 13.48 8.26 13.32 7.8C13.18 7.32 12.94 6.88 12.6 6.48C12.28 6.08 11.85 5.75 11.31 5.49C10.79 5.23 10.15 5.1 9.39 5.1H6.03V13.23H9.18ZM12.75 14.88L18.42 24H15.06L9.3 14.97L12.75 14.88ZM22.2054 11.58H24.9954V24H22.2054V11.58ZM21.9954 7.08C21.9954 6.64 22.1654 6.27 22.5054 5.97C22.8654 5.67 23.2554 5.52 23.6754 5.52C24.0954 5.52 24.4654 5.67 24.7854 5.97C25.1254 6.27 25.2954 6.64 25.2954 7.08C25.2954 7.54 25.1254 7.92 24.7854 8.22C24.4654 8.5 24.0954 8.64 23.6754 8.64C23.2554 8.64 22.8654 8.49 22.5054 8.19C22.1654 7.89 21.9954 7.52 21.9954 7.08ZM30.8426 24V14.07H28.7126V11.58H30.8426V6.33C30.8426 4.53 31.2426 3.15 32.0426 2.19C32.8626 1.23 34.0626 0.749999 35.6426 0.749999C36.0626 0.749999 36.5226 0.809999 37.0226 0.929998C37.5426 1.05 37.9926 1.25 38.3726 1.53L37.2026 3.54C37.0226 3.36 36.8226 3.24 36.6026 3.18C36.3826 3.1 36.1626 3.06 35.9426 3.06C35.2026 3.06 34.6326 3.31 34.2326 3.81C33.8326 4.31 33.6326 5.16 33.6326 6.36V11.58H37.5626V14.07H33.6326V24H30.8426ZM39.4359 17.67C39.4359 16.43 39.7259 15.31 40.3059 14.31C40.9059 13.31 41.7259 12.52 42.7659 11.94C43.8059 11.36 44.9859 11.07 46.3059 11.07C47.6659 11.07 48.8559 11.36 49.8759 11.94C50.8959 12.52 51.6859 13.31 52.2459 14.31C52.8059 15.31 53.0859 16.43 53.0859 17.67C53.0859 18.91 52.8059 20.04 52.2459 21.06C51.6859 22.06 50.8859 22.85 49.8459 23.43C48.8259 24.01 47.6359 24.3 46.2759 24.3C44.9559 24.3 43.7759 24.03 42.7359 23.49C41.7159 22.93 40.9059 22.16 40.3059 21.18C39.7259 20.18 39.4359 19.01 39.4359 17.67ZM42.2259 17.7C42.2259 18.5 42.4059 19.23 42.7659 19.89C43.1259 20.53 43.6059 21.04 44.2059 21.42C44.8259 21.8 45.5059 21.99 46.2459 21.99C47.0259 21.99 47.7159 21.8 48.3159 21.42C48.9359 21.04 49.4159 20.53 49.7559 19.89C50.0959 19.23 50.2659 18.5 50.2659 17.7C50.2659 16.9 50.0959 16.18 49.7559 15.54C49.4159 14.88 48.9359 14.36 48.3159 13.98C47.7159 13.58 47.0259 13.38 46.2459 13.38C45.4859 13.38 44.7959 13.58 44.1759 13.98C43.5759 14.38 43.0959 14.91 42.7359 15.57C42.3959 16.21 42.2259 16.92 42.2259 17.7ZM55.7836 17.67C55.7836 16.43 56.0736 15.31 56.6536 14.31C57.2536 13.31 58.0736 12.52 59.1136 11.94C60.1536 11.36 61.3336 11.07 62.6536 11.07C64.0136 11.07 65.2036 11.36 66.2236 11.94C67.2436 12.52 68.0336 13.31 68.5936 14.31C69.1536 15.31 69.4336 16.43 69.4336 17.67C69.4336 18.91 69.1536 20.04 68.5936 21.06C68.0336 22.06 67.2336 22.85 66.1936 23.43C65.1736 24.01 63.9836 24.3 62.6236 24.3C61.3036 24.3 60.1236 24.03 59.0836 23.49C58.0636 22.93 57.2536 22.16 56.6536 21.18C56.0736 20.18 55.7836 19.01 55.7836 17.67ZM58.5736 17.7C58.5736 18.5 58.7536 19.23 59.1136 19.89C59.4736 20.53 59.9536 21.04 60.5536 21.42C61.1736 21.8 61.8536 21.99 62.5936 21.99C63.3736 21.99 64.0636 21.8 64.6636 21.42C65.2836 21.04 65.7636 20.53 66.1036 19.89C66.4436 19.23 66.6136 18.5 66.6136 17.7C66.6136 16.9 66.4436 16.18 66.1036 15.54C65.7636 14.88 65.2836 14.36 64.6636 13.98C64.0636 13.58 63.3736 13.38 62.5936 13.38C61.8336 13.38 61.1436 13.58 60.5236 13.98C59.9236 14.38 59.4436 14.91 59.0836 15.57C58.7436 16.21 58.5736 16.92 58.5736 17.7Z" fill={fill} />
        </svg>
    )
}

export default Logo