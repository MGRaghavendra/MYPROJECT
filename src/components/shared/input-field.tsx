import { type } from 'os';
import React, { ChangeEvent } from 'react';
import { FieldValue, UseFormRegister } from 'react-hook-form';
import styles from './shared.module.scss';

type propTypes = {
    label:string,
    type:string,
    show?:string,
    forgetPwd?:boolean,
    value?:string | number | boolean,
    register?:any
    name:string
}

export const InputField = ({label,type,show,forgetPwd,register,name}:propTypes) => {
    return <>
        <label className={`${styles.sharedLabel}`}>
            <span className={`${styles.title}`}>{label}</span>
            <input type={type} {...register(name)}/>
            { show === 'show' && <span className={`${styles.show}`}>Show</span>}
            {forgetPwd &&
                <p className={`${styles.forgetPwd}`}>
                    Forget Password ?
                </p>
            }
        </label>
    </>
}