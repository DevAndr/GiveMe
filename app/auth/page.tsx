import React, {FC} from 'react';
import AuthForm from '@/components/form/AuthForm';


const AuthPage: FC = () => {

    return (
        <div className="page auth">
            <AuthForm />
        </div>
    );
};

export default AuthPage;