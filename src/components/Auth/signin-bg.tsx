import styles from './signin.module.scss'
import Image from 'next/image'
import Link from 'next/link'


export const  SignInBg = ():JSX.Element =>{
    return <div className={`${styles.signInbgMain}`}>
        <div className={`${styles.logo}`}>
       <Link href={"/"}> <img
        src={'https://platform.yupptv.com/assets/images/logo.svg'}
        alt="Picture of the author" width={120} height={41}
      /></Link>
        </div>
    </div>
}