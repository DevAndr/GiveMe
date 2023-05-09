import { useSession } from "next-auth/react";
import {Dispatch, FC, SetStateAction, useEffect} from "react";

interface RefreshTokenHandlerProps {
    setInterval: Dispatch<SetStateAction<number>>
}

const RefreshTokenHandler: FC<RefreshTokenHandlerProps> = ({setInterval}, ...props) => {
    const { data: session } = useSession();

    useEffect(() => {
        if(!!session) {
            const timeRemaining = Math.round((((session.accessTokenExpiry - 30 * 60 * 1000) - Date.now()) / 1000));
            setInterval(timeRemaining > 0 ? timeRemaining : 0);
        }
    }, [session]);

    return null;
}

export default RefreshTokenHandler;
