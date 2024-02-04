import {FC, ReactNode} from "react";
import 'primeflex/primeflex.css'
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import {PrimeReactProvider} from "primereact/api";

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {
    return (
        <PrimeReactProvider>
            {children}
        </PrimeReactProvider>
    )
}

export default Providers