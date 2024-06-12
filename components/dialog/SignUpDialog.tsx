'use client';

import React, {FC} from 'react';
import {Modal, ModalContent} from "@nextui-org/modal";
import {Button, Checkbox, Input, ModalBody, ModalFooter, ModalHeader} from '@nextui-org/react';
import {useFormik} from 'formik';
import * as Yup from 'yup';


interface SignUpDialogProps {

}

type RegistrationForm = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    check: boolean;
}

const schemaRegistration = Yup.object().shape({
    name: Yup.string().required('Заполните поле'),
    email: Yup.string().email('Некорректный email').required('Заполните поле'),
    password: Yup.string().min(6, 'Минимум 6 символов').required('Заполните поле'),
    repeatPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароли не совпадают').required('Повторите пароль'),
    check: Yup.boolean().oneOf([true], 'Необходимо принять условия и политику конфиденциальности'),
});

const SignUpDialog: FC<SignUpDialogProps> = () => {
    const formik = useFormik<RegistrationForm>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            check: false,
        },
        // validateOnChange: true,
        // validateOnBlur: true,
        validationSchema: schemaRegistration,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Modal isOpen={true}>
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={formik.handleSubmit}>
                        <ModalHeader className="flex flex-col gap-1">Регистация</ModalHeader>
                        <ModalBody>
                            <Input
                                type="text"
                                name="name"
                                label="Имя"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                labelPlacement="outside"
                                isInvalid={!!formik.errors.name}
                                errorMessage={formik.errors.name}
                            />
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
                            <Input
                                type="password"
                                name="repeatPassword"
                                label="Повторите пароль"
                                value={formik.values.repeatPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                labelPlacement="outside"
                                isInvalid={formik.touched.repeatPassword && !!formik.errors.repeatPassword}
                                errorMessage={formik.errors.repeatPassword}
                            />
                            <Checkbox name='check' checked={formik.values.check} onChange={formik.handleChange}
                                      isInvalid={!!formik.errors.check}>Согласен с
                                пользовательским соглашением</Checkbox>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Закрыть
                            </Button>
                            <Button color="primary" onPress={onClose} type="submit">
                                Зарегистрироваться
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};

export default SignUpDialog;