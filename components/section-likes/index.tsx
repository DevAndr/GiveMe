import React, {FC} from "react";
import {Button} from "primereact/button";
import {ProgressBar} from "primereact/progressbar";

const SectionLikes: FC = () => {

    return (
        <div className="flex flex-column w-full pb-2">
            {/*<Button icon="pi pi-thumbs-up" className="p-button-rounded p-button-outlined p-button-sm" aria-label="Submit" />*/}
            {/*<Button icon="pi pi-thumbs-down" className="p-button-rounded p-button-outlined p-button-sm" aria-label="Submit" />*/}
            <div className="w-5 align-self-center">
                <ProgressBar style={{height: 4}} value={60} showValue={false}/>
            </div>
            <div className="mt-2 justify-content-center">
                <span className="mr-2 font-semibold text-indigo-500">14</span>
                <i className="pi pi-thumbs-up hover:text-indigo-500 cursor-pointer text-indigo-500"/>
                <span className="mr-2 ml-4 font-semibold">6</span>
                <i className="pi pi-thumbs-down hover:text-indigo-500 cursor-pointer"/>
            </div>
        </div>
    )
}

export default SectionLikes
