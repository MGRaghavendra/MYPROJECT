import Head from "next/head"
import { SignInBg } from "./signin-bg"
import styles from "./signin.module.scss"


const SignUp = ():JSX.Element => {
    return <>
         <Head>
        <title>SignUp Page.....</title>
      </Head>
      <SignInBg/>
      <div className={`${styles.signUpMain}`}>
            
      </div>
    </>
}

export default SignUp