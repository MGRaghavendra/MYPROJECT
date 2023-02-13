import { SignInBg } from "./signin-bg"
import styles from "./signin.module.scss"

export const SignIn = (): JSX.Element => {
    return <div className={`${styles.singin_main}`}>
        <SignInBg />
        <div className={`${styles.singin_modal}`}>
            <div className={`${styles.singin_modal_inner}`}>
                <h1>Sign in to your Account</h1>
                <div className={`${styles.signin_form}`}>
                    <form className={`${styles.signin_form_tag}`}>
                        <div className={`${styles.form_rows}`}>
                            <div>
                                <label>
                                    <span className={`${styles.title}`}>Email</span>
                                    <input type="text" />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <span className={`${styles.title}`}>Password</span>
                                    <input type="password" />
                                    <span className={`${styles.show}`}>Show</span>
                                    <p className={`${styles.forgetPwd}`}>
                                Forget Password ?
                            </p>
                                </label>
                               
                            </div>
                            
                            <div>
                                <button className={`${styles.signInBtn}`}>
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}