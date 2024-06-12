'use client';

import React, {FC} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, Input, ModalBody, ModalHeader} from '@nextui-org/react';
import {Modal, ModalContent} from '@nextui-org/modal';

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
    const formik = useFormik<LoginForm>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schemaLogin,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Modal isOpen={true}>
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