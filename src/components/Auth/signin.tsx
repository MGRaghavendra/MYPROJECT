import Link from "next/link";
import { SignInBg } from "./signin-bg";
import styles from "./signin.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { default as clientCookie } from "js-cookie";
import { axiosPost } from "@/axios";
import { useRouter } from "next/router";
import getConfig from "next/config";

let appConfig = getConfig().publicRuntimeConfig.appconfig;

type IFormInput = {
  email: string;
  password: string;
};

export const SignIn = (): JSX.Element => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<IFormInput>({
    mode:'onChange'
  });
  console.log(formState.isValid)
  const signInHandle: SubmitHandler<IFormInput> = (data) => {
    if (!!data) {
        let payload =  {
            'login_id':data.email,
            'login_key':data.password,
            'login_mode':1,
            'manufacturer':'123'
        }
        let configs = {
          url: "service/api/auth/v1/signin",
          headers: {
            "session-id": clientCookie.get("sessionId") || "",
            "tenant-code": clientCookie.get("tenantCode") || "",
            "box-id": clientCookie.get("boxId") || "",
          },
        };
        axiosPost<{ status: boolean; response: any } | null>(configs, payload).then(
          (res: any) => {
            if (res["status"]) {
              console.log(res)
              localStorage.setItem('userDetails',JSON.stringify(res["response"]))
              router.push("/home");
            } else {
                console.log(res)
            }
          }
        );
    }
  };
  return (
    <div className={`${styles.singin_main}`}>
      <SignInBg />
      <div className={`${styles.singin_modal}`}>
        <div className={`${styles.singin_modal_inner}`}>
          <h1>Sign in to your Account</h1>
          <div className={`${styles.signin_form}`}>
            <form
              className={`${styles.signin_form_tag}`}
              onSubmit={handleSubmit(signInHandle)}
            >
              <div className={`${styles.form_rows}`}>
                <div>
                  <label className={`${styles.sharedLabel}`}>
                    <span className={`${styles.title}`}>Email</span>
                    <input
                      type="text"
                      {...register("email", {
                        required: true,
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+[.][a-zA-Z]{2,4}$/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                     {formState.errors.email?.message && (
                      <span className={`${styles.errorText}`}>
                        {formState.errors.email?.message}
                      </span>
                    )}

                    {!formState.errors.email?.message && formState.errors.email && (
                      <span className={`${styles.errorText}`}>
                        Email address required
                      </span>
                    )}
                   
                  </label>
                </div>
                <div>
                  <label className={`${styles.sharedLabel}`}>
                    <span className={`${styles.title}`}>Password</span>
                    <input
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 4,
                        maxLength: 16,
                      })}
                    />
                    {formState.errors.password && (
                      <span className={`${styles.errorText}`}>
                        Password required
                      </span>
                    )}
                    <span className={`${styles.show}`}>Show</span>
                    <p className={`${styles.forgetPwd}`}>Forget Password ?</p>
                  </label>
                </div>
                <div>
                  <input
                    type="submit"
                    className={`${styles.signInBtn}`}
                    value={"Sign In"}
                    disabled={!formState.isValid}
                  />
                </div>
                <div className={`${styles.divider}`}></div>
                <div>
                  <button
                    className={`${styles.signInBtn} ${styles.signInBtnMobile}`}
                  >
                    Login With Mobile Number
                  </button>
                </div>
              </div>
            </form>
            <div className={`${styles.siginInInfo}`}>
              <p className={`${styles.tc}`}>
                By Signing in, you agree to YuppTV’s{" "}
                <Link href={""}>Terms & Conditions</Link>
              </p>
              <p className={`${styles.noAccount}`}>
                Don't have an account? <Link href={""}>SignUp</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
