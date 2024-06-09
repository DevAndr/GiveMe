'use client';

import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/client';
import {LOG_IN, SIGN_UP} from '@/graphql';
import {useFormik} from 'formik';
import {InputText} from 'primereact/inputtext';
import './styles.scss';
import {Button} from 'primereact/button';
import Link from 'next/link';
import * as Yup from 'yup';
import InputMessage from '@/components/error/InputMessage';
import {useRouter} from 'next/navigation';
import LocalStorageService from '@/services/LocalStorageService';

type TypeViewForm = 'SIG_IN' | 'SIG_UP';

interface AuthFormProps {
    view?: TypeViewForm;
}

type AuthFormSignIn = {
    login: string;
    password: string;
};

type AuthFormSignUp = {
    name: string;
    login: string;
    password: string;
    confirmPassword: string;
};

const schemaSignIn = Yup.object().shape({
    login: Yup.string().required('Введите логин'),
    password: Yup.string().required('Введите пароль')
});

const schemaSignUp = Yup.object().shape({
    name: Yup.string().required('Введите имя'),
    login: Yup.string().required('Введите логин'),
    password: Yup.string().required('Введите пароль').min(6, 'Минимум 6 символов'),
    confirmPassword: Yup.string().required('Введите пароль еще раз').oneOf(
        [Yup.ref('password')],
        'Пароли не совпадают'
    ),
});

const AuthForm: FC<AuthFormProps> = ({view = 'SIG_IN'}) => {
        const router = useRouter();
        const [typeView, setTypeView] = useState<TypeViewForm>(view);
        const formikSignIn = useFormik<AuthFormSignIn>({
            initialValues: {
                login: 'test@email.ru',
                password: 'test',
            },
            initialErrors: {
                login: '',
                password: ''
            },
            validateOnMount: false,
            validateOnBlur: false,
            validateOnChange: true,
            validationSchema: schemaSignIn,
            onSubmit: values => {
                fetchSignIn({
                    variables: {
                        data: {
                            email: values.login,
                            password: values.password,
                        }
                    }
                }).then(resp => {
                    console.log(resp);

                    if (resp.data.logIn) {
                        LocalStorageService.add('access_token', resp.data.logIn.access_token);
                        LocalStorageService.add('refresh_token', resp.data.logIn.refresh_token);
                    }
                    // router.push('/');
                });
            }
        });
        const formikSignUp = useFormik<AuthFormSignUp>({
            initialValues: {
                name: '',
                login: '',
                password: '',
                confirmPassword: '',
            },
            initialErrors: {
                name: '',
                login: '',
                password: '',
                confirmPassword: ''
            },
            validateOnMount: false,
            validateOnBlur: false,
            validateOnChange: true,
            validationSchema: schemaSignUp,
            onSubmit: values => {
                fetchSignUp({
                    variables: {
                        data: {
                            name: '',
                            email: values.login,
                            password: values.confirmPassword,
                        }
                    }
                });
            },
        });
        const [fetchSignIn, {data: dataSignIn, loading: loadingSignIn, error: errorSignIn}] = useMutation(LOG_IN);
        const [fetchSignUp, {data: dataSignUp, loading: loadingSignUp, error: errorSignUp}] = useMutation(SIGN_UP);

        return (
            <div className="wrap-form-auth">
                {
                    typeView === 'SIG_IN' ? <form className="form-auth" onSubmit={formikSignIn.handleSubmit}>
                            <h4>Авторизация</h4>
                            <div className="wrap-input">
                                <label htmlFor="login">Логин</label>
                                <InputText id="login" className="input p-inputtext-sm" type="email"
                                           value={formikSignIn.values.login}
                                           onChange={formikSignIn.handleChange} name="login" placeholder="Login"
                                           aria-describedby="login-help"/>
                                <InputMessage idInput="login-help" value={formikSignIn.errors.login}/>
                            </div>

                            <div className="wrap-input">
                                <label htmlFor="password">Пароль</label>
                                <InputText id="password" className="input p-inputtext-sm" type="password"
                                           value={formikSignIn.values.password}
                                           onChange={formikSignIn.handleChange} name="password" placeholder="Password"
                                           aria-describedby="password-help"/>
                                <InputMessage idInput="password-help" value={formikSignIn.errors.password}/>
                            </div>

                            <Button className="btn" label="Войти" loading={loadingSignIn} disabled={loadingSignIn}/>
                        </form> :
                        <form className="form-auth" onSubmit={formikSignUp.handleSubmit}>
                            <h4>Регистрация</h4>
                            <div className="wrap-input">
                                <label htmlFor="name">Логин</label>
                                <InputText id="name" className="input p-inputtext-sm" type="text"
                                           value={formikSignUp.values.name}
                                           onChange={formikSignUp.handleChange} name="name" placeholder="Имя"
                                           aria-describedby="name-help"/>
                                <InputMessage idInput="name-help" value={formikSignUp.errors.name}/>
                            </div>

                            <div className="wrap-input">
                                <label htmlFor="password">Придумайте пароль</label>
                                <InputText id="password" className="input p-inputtext-sm" type="password"
                                           value={formikSignUp.values.password}
                                           onChange={formikSignUp.handleChange} name="password"
                                           placeholder="Введите пароль"
                                           aria-describedby="password-help"/>
                                <InputMessage idInput="password-help" value={formikSignUp.errors.password}/>
                            </div>

                            <div className="wrap-input">
                                <label htmlFor="repeat-password">Повторите пароль</label>
                                <InputText id="repeat-password" className="input p-inputtext-sm" type="password"
                                           value={formikSignUp.values.confirmPassword}
                                           onChange={formikSignUp.handleChange} name="confirmPassword"
                                           placeholder="Повторите пароль"
                                           aria-describedby="confirm-password-help"/>
                                <InputMessage idInput="confirm-password-help"
                                              value={formikSignUp.errors.confirmPassword}/>
                            </div>

                            <Button className="btn" label="Регистрация" loading={loadingSignIn}
                                    disabled={loadingSignIn}/>
                        </form>
                }
                <div className="auth-details">
                    <Link href={'/auth/reset'}>Забыли пароль?</Link>
                    <Link href="#" onClick={e => {
                        e.preventDefault();
                        setTypeView(prevState => prevState === 'SIG_IN' ? 'SIG_UP' : 'SIG_IN');
                    }}>{typeView === 'SIG_IN' ? 'Зарегистрироваться' : 'Войти'}</Link>

                </div>
            </div>
        );
    }
;

export default AuthForm;
;