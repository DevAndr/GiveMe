import React, {FC} from 'react';
import {Button, NavbarItem} from '@nextui-org/react';
import Link from 'next/link';
import useAuthDialogsStore from '@/store/AuthStore';
import {useSession} from 'next-auth/react';
import UserProfile from '@/components/profile/UserProfile';

interface AuthButtonsProps {

}

const AuthButtons: FC<AuthButtonsProps> = ({}) => {
    const {data: session} = useSession();
    const openSignInDialog = useAuthDialogsStore(state => state.openSignInDialog);
    const openSignUpDialog = useAuthDialogsStore(state => state.openSignUpDialog);

    if (session && session.user) {
        return (
            <>
                <UserProfile name={session.user.name}/>
                <NavbarItem className="hidden lg:flex">
                    <Link href="/api/auth/signout" onClick={openSignInDialog}>Выйти</Link>
                </NavbarItem>
            </>
        );
    }

    return (
        <>
            <NavbarItem className="hidden lg:flex">
                <Link href="/api/auth/signin">Войти</Link>
            </NavbarItem>
            <NavbarItem>
                <Button as={Link} color="primary" href="#" variant="flat" onClick={openSignUpDialog}>
                    Регистрация
                </Button>
            </NavbarItem>
        </>
    );
};

export default AuthButtons;