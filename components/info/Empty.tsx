import React, {FC} from "react";


export const Empty: FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {

    return (
        <div className="flex justify-content-center align-items-center w-full h-full text-black-alpha-50" {...props}>
            Пусто
        </div>
    )
}
