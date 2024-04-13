import React, {FC} from 'react';

interface InputMessageProps {
    idInput: string;
    value?: string;
}

const InputMessage: FC<InputMessageProps> = ({idInput, value}) => {
    return (
        <small id={idInput} className="p-error">
            {value}
        </small>
    );
};

export default InputMessage;