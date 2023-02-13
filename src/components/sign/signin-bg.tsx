import styles from './signin.module.scss'
import Image from 'next/image'


export const  SignInBg = ():JSX.Element =>{
    return <div className={`${styles.signInbgMain}`}>
        <div className={`${styles.logo}`}>
        <Image
        loader={() => 'https://platform.yupptv.com/assets/images/logo.svg'}
        src={'https://platform.yupptv.com/assets/images/logo.svg'}
        alt="Picture of the author" width={120} height={41}
      />
        </div>
    </div>
}