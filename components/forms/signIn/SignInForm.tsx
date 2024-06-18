'use client'

import React, {FC} from 'react';
import {useFormik} from 'formik';
import {signIn} from '@/services/AuthService';
import * as Yup from 'yup';
import {Button, Input} from '@nextui-org/react';
import './styles.scss'

interface SignInFormProps {

}

type LoginForm = {
    email: string;
    password: string;
}

const schemaLogin = Yup.object().shape({
    email: Yup.string().email('Некорректный email').required('Заполните поле'),
    password: Yup.string().required('Заполните поле'),
});

const SignInForm: FC<SignInFormProps> = ({}) => {
    const formik = useFormik<LoginForm>({
        initialValues: {
            email: 'test@email.ru',
            password: 'test',
        },
        validationSchema: schemaLogin,
        onSubmit: values => {
            signIn({email: values.email, password: values.password}).then(res => {
                console.log(res);
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className='form-sign-in'>
            <Input
                type="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                labelPlacement="outside"
                isInvalid={!!formik.errors.email}
                errorMessage={formik.errors.email}
            />
            <Input
                type="password"
                name="password"
                label="Пароль"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                labelPlacement="outside"
                isInvalid={!!formik.errors.password}
                errorMessage={formik.errors.password}
            />
            <Button color="primary" type="submit" className="mt-4 mb-4">
                Войти
            </Button>
        </form>
    );
};

export default SignInForm;