import {FC, ReactNode} from "react";
import 'primeflex/primeflex.css';
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import {PrimeReactProvider} from "primereact/api";
import client from '@/graphql/client';
import {ApolloProvider} from '@apollo/client';
import AuthProvider from '@/providers/auth/AuthProvider';
import StoreProvider from '@/providers/store/StoreProvider';

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({children}) => {
    return (

        <ApolloProvider client={client}>
            <AuthProvider>
                <PrimeReactProvider value={{ripple: true}}>
                    <StoreProvider>
                        {children}
                    </StoreProvider>
                </PrimeReactProvider>
            </AuthProvider>
        </ApolloProvider>

    );
};

export default Providers;