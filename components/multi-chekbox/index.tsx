import React, {FC, useState} from 'react';
import {MultiStateCheckbox} from 'primereact/multistatecheckbox';

export enum ACCESS_TYPE {
    PUBLIC= "PUBLIC",
    PRIVATE = "PRIVATE"
}

interface IAccess {
    value: ACCESS_TYPE
    icon: string
}

const options: IAccess[] = [
    {value: ACCESS_TYPE.PUBLIC, icon: 'pi pi-globe'},
    {value: ACCESS_TYPE.PRIVATE, icon: 'pi pi-lock'}
];

interface IMultiCheckbox extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'>{
    value?: ACCESS_TYPE
    onChange: (data: ACCESS_TYPE) => void
}

const MultiCheckbox: FC<IMultiCheckbox> = ({onChange, value}) => {
    const [access, setAccess] = useState<ACCESS_TYPE>(value && value || ACCESS_TYPE.PUBLIC);

    return (
        <div className="field-checkbox m-0 flex-row-reverse">
            <MultiStateCheckbox className="ml-2" value={access} options={options} optionValue="value"
                                onChange={(e) => {
                                    e.stopPropagation()
                                    const curVal = e.value === null ? ACCESS_TYPE.PUBLIC : e.value
                                    onChange(curVal)
                                    setAccess(curVal)
                                }}/>
            <label className="text-xs">{access}</label>
        </div>
    )
}

export default MultiCheckbox
