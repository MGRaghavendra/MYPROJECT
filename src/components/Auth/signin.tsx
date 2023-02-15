import Head from "next/head";
import Link from "next/link";
import { InputField } from "../shared/input-field";
import { SignInBg } from "./signin-bg";
import styles from "./signin.module.scss";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { axiosPost } from "@/axios";
import { getBoxId, getsessionToken, setSessionToken } from "../../utils";
import { appConfig } from "@/appconfig";
import { useRouter } from 'next/router';

type Inputs = {
    email: string,
    password: string,
  };
  

export const SignIn = (): JSX.Element => {
    const router = useRouter();
    const { register, handleSubmit, watch, formState : {errors} } = useForm();
    const signInHandle:SubmitHandler<FieldValues> = (data) => {
        if(!!data) {
            data.login_mode = 1;
            data.manufacturer = '123';
            let configs = {
                url: "service/api/auth/v1/signin",
                headers: {
                  "session-id": getsessionToken() || "",
                  "tenant-code": appConfig.tenantCode,
                  "box-id": getBoxId(),
                }
              };
              
             axiosPost<{ status: boolean; response: any } | null>(configs, data).then((res:any) =>{
                if(res['status']) {
                    setSessionToken('userDetails', res['response'])
                    router.push('/');
                }else {
                    
                }
             });
        }
    }
    return <div className={`${styles.singin_main}`}>
        <Head>
        <title>Signin Page.....</title>
      </Head>
        <SignInBg />
        <div className={`${styles.singin_modal}`}>
            <div className={`${styles.singin_modal_inner}`}>
                <h1>Sign in to your Account</h1>
                <div className={`${styles.signin_form}`} >
                    <form className={`${styles.signin_form_tag}`} onSubmit = {handleSubmit(signInHandle)}>
                        <div className={`${styles.form_rows}`}>
                            <div>
                                <InputField type={'text'} label={'Email'} register={register} name={'login_id'}/>
                            </div>
                            <div>
                            <InputField type={'password'} label={'Password'} show = {'show'}   forgetPwd = {true}  register={register} name = {'login_key'}/ >
                            </div>
                            <div>
                                <input type="submit" className={`${styles.signInBtn}`} value={'Sign In'}/>
                            </div>
                            <div className={`${styles.divider}`}></div>
                            <div>
                                <button className={`${styles.signInBtn} ${styles.signInBtnMobile}`}>
                                    Login With Mobile Number
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className={`${styles.siginInInfo}`}>
                        <p className={`${styles.tc}`}>By Signing in, you agree to YuppTV’s <Link href={""}>Terms & Conditions</Link></p>
                        <p className={`${styles.noAccount}`}>Don't have an account? <Link href={""}>SignUp</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}