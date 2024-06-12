import React, {FC} from 'react';
import {Checkbox} from '@nextui-org/react';
import './styles.scss';

interface CheckFieldProps {
    name?: string;
    value: boolean;
    title: string;
    error?: string;

}

const CheckField: FC<CheckFieldProps> = ({value, title, name, error}) => {

    return (
        <Checkbox name={name} checked={value} className={`check-field${error && ' error'}`}
                  isInvalid={!!error}>{title}</Checkbox>
    );
};

export default CheckField;