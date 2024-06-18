'use client';

import React, {FC} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, Input, ModalBody, ModalHeader} from '@nextui-org/react';
import {Modal, ModalContent} from '@nextui-org/modal';
import useAuthDialogsStore from "@/store/AuthStore";
import {signIn} from '@/services/AuthService';
import LocalStorageService from '@/services/LocalStorageService';

interface SignInDialogProps {

}

type LoginForm = {
    email: string;
    password: string;
}

const schemaLogin = Yup.object().shape({
    email: Yup.string().email('Некорректный email').required('Заполните поле'),
    password: Yup.string().required('Заполните поле'),
});

const SignInDialog: FC<SignInDialogProps> = ({}) => {
    const state = useAuthDialogsStore(state => state.signInDialog)
    const hideSignInDialog = useAuthDialogsStore(state => state.hideSignInDialog)
    const formik = useFormik<LoginForm>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schemaLogin,
        onSubmit: values => {
            signIn({email: values.email, password: values.password}).then(res => {
                LocalStorageService.setValue('accessToken', res.data.access_token);
                LocalStorageService.setValue('refreshToken', res.data.refresh_token);
            })
        },
    });

    return (
        <Modal isOpen={state.show} onClose={hideSignInDialog}>
            <ModalContent>
                <form onSubmit={formik.handleSubmit}>
                    <ModalHeader className="flex flex-col gap-1">Авторизация</ModalHeader>
                    <ModalBody>
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
                        <Button color="primary" type="submit" className='mt-4 mb-4'>
                            Войти
                        </Button>
                    </ModalBody>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default SignInDialog;