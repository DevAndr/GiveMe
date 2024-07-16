import React, {FC} from 'react';
import {FileUpload} from 'primereact/fileupload';
import {Avatar} from 'primereact/avatar';
import UploadAvatar from '@/components/avatar/UploadAvatar';

interface PageSettingsProps {

}

const PageSettings: FC<PageSettingsProps> = ({}) => {
    return (
        <div className="w-full">
            <h1>Настройки</h1>
            <section>
                <h4>Профиль</h4>
                <Avatar image="/images/avatar/amyelsner.png" size="xlarge" shape="circle" />
                <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000}   />
                <br/>
                <br/>
                <UploadAvatar/>
                {/*<FileUpload name="demo[]" url={'/api/upload'} accept="image/*" maxFileSize={1000000}*/}
                {/*            emptyTemplate={<p className="m-0">Перенесите файл для загрузки</p>}/>*/}
            </section>

        </div>
    );
};

export default PageSettings;