import React, {useState} from 'react';
import {MultiStateCheckbox} from 'primereact/multistatecheckbox';

enum ACCESS_TYPE {
    PUBLIC= "public",
    PRIVATE = "private",
    PROTECTED = "protected"
}


interface IAccess {
    value: ACCESS_TYPE
    icon: string
}

const options: IAccess[] = [
    {value: ACCESS_TYPE.PUBLIC, icon: 'pi pi-globe'},
    {value: ACCESS_TYPE.PROTECTED, icon: 'pi pi-lock-open'},
    {value: ACCESS_TYPE.PRIVATE, icon: 'pi pi-lock'}
];

const MultiCheckbox = () => {
    const [value, setValue] = useState<ACCESS_TYPE>(ACCESS_TYPE.PUBLIC);

    return (
        <div className="field-checkbox m-0 flex-row-reverse">
            <MultiStateCheckbox className="ml-2" value={value} options={options} optionValue="value"
                                onChange={(e) => {
                                    setValue(e.value === null ? ACCESS_TYPE.PUBLIC : e.value)
                                }}/>
            <label>{value}</label>
        </div>

    )
}

export default MultiCheckbox
