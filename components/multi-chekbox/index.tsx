import React, {FC, useState} from 'react';
import {MultiStateCheckbox} from 'primereact/multistatecheckbox';

enum ACCESS_TYPE {
    PUBLIC= "public",
    PRIVATE = "private"
}

interface IAccess {
    value: ACCESS_TYPE
    icon: string
}

const options: IAccess[] = [
    {value: ACCESS_TYPE.PUBLIC, icon: 'pi pi-globe'},
    {value: ACCESS_TYPE.PRIVATE, icon: 'pi pi-lock'}
];

interface IMultiCheckbox {
    onChange: (data: ACCESS_TYPE) => void
}

const MultiCheckbox: FC<IMultiCheckbox> = ({onChange}) => {
    const [value, setValue] = useState<ACCESS_TYPE>(ACCESS_TYPE.PUBLIC);

    return (
        <div className="field-checkbox m-0 flex-row-reverse">
            <MultiStateCheckbox className="ml-2" value={value} options={options} optionValue="value"
                                onChange={(e) => {
                                    const curVal = e.value === null ? ACCESS_TYPE.PUBLIC : e.value
                                    onChange(curVal)
                                    setValue(curVal)
                                }}/>
            <label className="text-xs">{value}</label>
        </div>
    )
}

export default MultiCheckbox
