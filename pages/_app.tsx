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


let queries = {
    xs: EnumDevices.Phone,
    sm: EnumDevices.LargePhone,
    md: EnumDevices.Tablet,
    lg: EnumDevices.Desktop,
    xl: EnumDevices.UltraWide
}

function MyApp({Component, pageProps}: AppProps) {
    return (
        <BreakpointProvider queries={queries}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </BreakpointProvider>
    )
}

export default MyApp
