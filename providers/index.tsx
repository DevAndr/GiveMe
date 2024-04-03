import {FC, ReactNode} from "react";
import 'primeflex/primeflex.css';
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import {PrimeReactProvider} from "primereact/api";
import client from '@/graphql/client';
import {ApolloProvider} from '@apollo/client';

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({children}) => {
    return (
        <ApolloProvider client={client}>
            <PrimeReactProvider value={{ripple: true}}>
                {children}
            </PrimeReactProvider>
        </ApolloProvider>
    );
};

export default Providers;