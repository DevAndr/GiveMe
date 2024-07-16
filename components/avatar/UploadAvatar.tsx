'use client';

import React, {createRef, FC, useState} from 'react';
import './styles.scss';
import Image from 'next/image';
import {FileUpload} from 'primereact/fileupload';

interface UploadAvatarProps {

}

const UploadAvatar: FC<UploadAvatarProps> = ({}) => {
    const fileRef = createRef<HTMLInputElement>();
    const [uploaded, setUploaded] = useState<string | ArrayBuffer | null>('');

    const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader.result);
                setUploaded(reader.result);
            };
        }
    };

    const handleSelectFile = (): Promise<File> => {
        return new Promise((resolve) => {
            let input = document.createElement("input");
            input.type = "file";
            input.multiple = false;
            input.accept = 'image/*';

            input.onchange = () => {
                let files = Array.from(input.files as Iterable<File>);
                console.log(files);
                resolve(files[0]);
            };

            input.click();
        });
    };

    function validateFileSize(file: File, sizeMb: number) {
        const fileSize = file.size / 1024 / 1024; // in MiB
        return fileSize <= sizeMb;
    }

    const uploadAvatar = async () => {
        const file = await handleSelectFile();
        if (file) {
            if (validateFileSize(file, 1)) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    console.log(reader.result);
                    setUploaded(reader.result);

                    const data = new FormData();
                    data.append('file', file);
                    const url = 'https://api.cloudinary.com/v1_1/d85702455/upload';
                    const options = {
                        method: 'POST',
                        body: data,
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                        }
                    };
                    const response = await fetch(url, options);

                }
            }
        }
    }

    return (
        <div className="upload-avatar">
            {/*<Image className="avatar"*/}
            {/*       src={'https://www.worldatlas.com/r/w1200-q80/upload/c7/91/96/shutterstock-109340948.jpg'} alt="logo"*/}
            {/*       width={100}*/}
            {/*       height={100}/>*/}
            <Image className="avatar" src={uploaded} width={100}
                   height={100} alt="Cropped!"/>
            <div className="file-input" >
                {/*<input*/}
                {/*    type="file"*/}
                {/*    // style={{display: 'none'}}*/}
                {/*    ref={fileRef}*/}
                {/*    onChange={onFileInputChange}*/}
                {/*    accept="image/png,image/jpeg,image/gif"*/}
                {/*/>*/}
                <div className="info-hover" onClick={uploadAvatar}>
                    Добавить
                </div>
            </div>
        </div>
    );
};

export default UploadAvatar;