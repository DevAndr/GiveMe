import '../styles/globals.css'
import '../node_modules/primeflex/primeflex.css'
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import type {AppProps} from 'next/app'
import {BreakpointProvider} from '../hooks/breakpoint'
import {EnumDevices} from "../hooks/BreakPointEntries";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import {ApolloProvider} from '@apollo/client';
import client from "../services/graphql/client";
import { useState } from 'react';
import AuthProvider, {useAuth} from "../context/authContext";

const queries = {
    xs: EnumDevices.Phone,
    sm: EnumDevices.LargePhone,
    md: EnumDevices.Tablet,
    lg: EnumDevices.Desktop,
    xl: EnumDevices.UltraWide
}

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
    const [interval, setInterval] = useState<number>(0);
    // const auth = useAuth();


    return (
        <BreakpointProvider queries={queries}>
                <ApolloProvider client={client}>
                    <Provider store={store}>
                        <AuthProvider>
                            <Component {...pageProps} />
                        </AuthProvider>
                    </Provider>
                </ApolloProvider>
        </BreakpointProvider>
    )
}

export default MyApp
