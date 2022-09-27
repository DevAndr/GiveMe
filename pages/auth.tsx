import {FC} from "react";
import MainLayout from "../components/layouts/MainLayout";
import {NextPage} from "next";
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {Password} from 'primereact/password';
import {Checkbox} from 'primereact/checkbox';
import {Dialog} from 'primereact/dialog';
import {Divider} from 'primereact/divider';
import {classNames} from 'primereact/utils';
import { useRouter } from "next/router";
import {useMutation, useQuery } from "@apollo/client";
import {GET_USERS, LOG_IN, SIGN_UP} from "../services/graphql";
import {ParamsAuth, ParamsSignUpAuth, RsponseAuth} from "../services/graphql/types";
import {signIn, useSession} from "next-auth/react";
import * as Yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(Yup)

interface IBaseDataForm {
    name?: string
    email?: string
    password?: string
}

export interface IDataForm extends IBaseDataForm{
    accept?: boolean
    dateOfBirth?: number
}

export interface IErrorForm extends IBaseDataForm {
    accept?: string
    dateOfBirth?: string
}

export enum TypeAuthView {
    SIGN_IN,
    SIGN_UP
}

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string().password()
        .minLowercase(3, 'Пароль ложен содержать более 2 строчных символов')
        .min(8, 'Минимальная длинна пароля 8')
        .minUppercase(3, 'Пароль ложен содержать более 2 заглавных символов')
        .minRepeating(2, 'Символ повторяется более 2 раз').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    dateOfBirth: Yup.date().required('Required'),
    accept: Yup.boolean().isTrue().required('Required')
});

const LogInSchema = Yup.object().shape({
    password: Yup.string().required('Введите пароль'),
    email: Yup.string().email('Проверте email').required('Введите email'),
});

const AuthPage: NextPage = ({}) => {
    const router = useRouter()
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState<IDataForm>({});
    const [typeView, setTypeView] = useState<TypeAuthView>(TypeAuthView.SIGN_IN)
    const formik = useFormik<IDataForm>({
        initialValues: typeView === TypeAuthView.SIGN_UP ? {
            name: '',
            email: 'biba@gmail.com',
            password: 'qwerty',
            dateOfBirth: undefined,
            accept: false
        } : {
            email: 'biba@gmail.com',
            password: 'qwerty',
        },
        validationSchema: typeView === TypeAuthView.SIGN_UP ? SignUpSchema : LogInSchema,
        onSubmit: (data) => {
            console.log(data)
            setFormData(data);
            setShowMessage(true);
            formik.resetForm();
        }
    });
    // const { loading, error, data } = useQuery(GET_USERS);

    const [logInAuth] = useMutation<RsponseAuth, ParamsAuth>(LOG_IN);
    const [signUpAuth] = useMutation<RsponseAuth, ParamsSignUpAuth>(SIGN_UP);

    // @ts-ignore
    const isFormFieldValid = (name: string) => !!(formik.touched[name] && formik.errors[name])

    const getFormErrorMessage = (name: string) => {
        // @ts-ignore
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>
    }

    const handleClosePage = () => {
        setShowMessage(false)
        router.push('/')
    }

    const handleToggleView = async () => {
        setTypeView(prevState => {
            return prevState === TypeAuthView.SIGN_IN ? TypeAuthView.SIGN_UP : TypeAuthView.SIGN_IN
        })
    }

    const handleLogIn = async () => {
        console.log(formData, formik)
        const {data} = await logInAuth({
            variables: {
                data: {
                    email: "biba@gmail.com",
                    password: "qwerty"
                }
            }
        })
    }

    const handleSignUp = async () => {
        console.log(formData, formik)
        // const {data} = await signUpAuth({
        //     variables: {
        //         data: {
        //             name: "Kaka",
        //             email: "biba@gmail.com",
        //             password: "qwerty"
        //         }
        //     }
        // })
    }

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"
                                                                              autoFocus
                                                                              onClick={() => setShowMessage(false)}/>
    </div>;
    const passwordHeader = <h6>Выберите пароль</h6>;
    const passwordFooter = (<>
        <Divider/>
        <p className="mt-2">Разделитель</p>
        <ul className="pl-2 ml-2 mt-0" style={{lineHeight: '1.5'}}>
            <li>Хотя бы одна строчная буква</li>
            <li>Хотя бы одна заглавная буква</li>
            <li>По крайней мере один числовой</li>
            <li>Минимум 8 символов</li>
        </ul>
    </>);

    const ViewSignIn = () => {
        return (
            <div className="card w-20">
                <h1 className="text-center">Авторизация</h1>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="field pt-2">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope"/>
                                <InputText id="email" name="email" value={formik.values.email}
                                           onChange={formik.handleChange}
                                           className={classNames({'p-invalid': isFormFieldValid('email')})}/>
                                <label htmlFor="email"
                                       className={classNames({'p-error': isFormFieldValid('email')})}>Email</label>
                            </span>
                        {getFormErrorMessage('email')}
                    </div>

                    <div className="field pt-2">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password}
                                          onChange={formik.handleChange} toggleMask feedback
                                          className={classNames({'p-invalid': isFormFieldValid('password')})}/>
                                <label htmlFor="password"
                                       className={classNames({'p-error': isFormFieldValid('password')})}>Пароль</label>
                            </span>
                        {getFormErrorMessage('password')}
                    </div>

                    <Button type="submit" label="Войти" className="mt-2" onClick={handleLogIn}/>
                </form>
                <p className="text-center">Нет учётной записи? <a
                    className="font-bold text-primary cursor-pointer"
                    onClick={handleToggleView}>Регистрация</a>
                </p>
            </div>
        )
    }

    const ViewSignUP = () => {
        return (
            <div className="card">
                <h1 className="text-center">Регистрация</h1>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="field pt-2">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={formik.values.name}
                                           onChange={formik.handleChange} autoFocus
                                           className={classNames({'p-invalid': isFormFieldValid('name')})}/>
                                <label htmlFor="name"
                                       className={classNames({'p-error': isFormFieldValid('name')})}>Имя*</label>
                            </span>
                        {getFormErrorMessage('name')}
                    </div>

                    <div className="field pt-2">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope"/>
                                <InputText id="email" name="email" value={formik.values.email}
                                           onChange={formik.handleChange}
                                           className={classNames({'p-invalid': isFormFieldValid('email')})}/>
                                <label htmlFor="email"
                                       className={classNames({'p-error': isFormFieldValid('email')})}>Email*</label>
                            </span>
                        {getFormErrorMessage('email')}
                    </div>

                    <div className="field pt-2">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password}
                                          onChange={formik.handleChange} toggleMask
                                          className={classNames({'p-invalid': isFormFieldValid('password')})}
                                          header={passwordHeader} footer={passwordFooter}/>
                                <label htmlFor="password"
                                       className={classNames({'p-error': isFormFieldValid('password')})}>Пароль*</label>
                            </span>
                        {getFormErrorMessage('password')}
                    </div>

                    <div className="field pt-2">
                            <span className="p-float-label">
                                {/*// @ts-ignore*/}
                                <Calendar id="date" name="date" value={formik.values.date}
                                          onChange={formik.handleChange} dateFormat="dd.mm.yy" mask="99.99.9999"
                                          showIcon/>
                                <label htmlFor="date">Дата рождения</label>
                            </span>
                    </div>

                    <div className="field-checkbox">
                        <Checkbox inputId="accept" name="accept" checked={formik.values.accept}
                                  onChange={formik.handleChange}
                                  className={classNames({'p-invalid': isFormFieldValid('accept')})}/>
                        <label htmlFor="accept" className={classNames({'p-error': isFormFieldValid('accept')})}>Я
                            согласен с условиями и положениями*</label>
                    </div>

                    <Button type="submit" label="Зарегистрироваться" className="mt-2" onClick={handleSignUp}/>
                </form>
                <p className="text-center">Уже есть учетная запись? <a
                    className="font-bold text-primary cursor-pointer"
                    onClick={handleToggleView}>Войти</a>
                </p>
            </div>
        )
    }

    return (
        <MainLayout isHideHeader={true} className="min-h-screen">
                <div className="min-h-screen flex justify-content-center">
                    <div className="flex fixed" style={{top: 40, right: 40}}>
                        <Button icon="pi pi-times" className="p-button-rounded p-button-secondary p-button-outlined w-2rem h-2rem"
                                aria-label="Cancel" onClick={handleClosePage}/>
                    </div>
                    <div className="align-self-center min-h-full">
                        {
                            typeView === TypeAuthView.SIGN_UP ?
                                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="center"
                                        footer={dialogFooter} showHeader={false} breakpoints={{'960px': '80vw'}}
                                        style={{width: '30vw'}}>
                                    <div className="flex align-items-center flex-column pt-6 px-3">
                                        <i className="pi pi-check-circle"
                                           style={{fontSize: '5rem', color: 'var(--green-500)'}}/>
                                        <h2>Регистрация завершена!</h2>
                                        <p style={{lineHeight: 1.5, textIndent: '1rem'}}>
                                            <b>{formData.name}</b>, Ваша учетная запись зарегистрирована.
                                            Пожалуйста, проверьте <b>{formData.email}</b> для активации аккаунта.
                                        </p>
                                    </div>
                                </Dialog> : <></>
                        }

                        <div className="flex justify-content-center">
                            {
                                typeView === TypeAuthView.SIGN_IN ?
                                    ViewSignIn() : ViewSignUP()
                            }
                        </div>
                    </div>
                </div>
        </MainLayout>
    )
}

export default AuthPage
