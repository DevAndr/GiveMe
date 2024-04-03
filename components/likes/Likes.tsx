import React, {FC, useState} from 'react';
import './styles.scss'
import {Button} from "primereact/button";

interface LikesProps {

}

type StateLiked = 'liked' | 'disliked' | 'none'

const Likes: FC<LikesProps> = () => {
    const [state, setState] = useState<StateLiked>('none')

    const clsLikeBtn = state === 'none' ? ' un-selected' : state === 'liked' ? '' : ' un-selected'
    const clsDisLikeBtn = state === 'none' ? ' un-selected' : state === 'disliked' ? '' : ' un-selected'

    const likeHandler = () => setState('liked')
    const disLikeHandler = () => setState('disliked')


    return (
        <div className='likes'>
            <div className='counter'>
                <span className='val'>32</span>
                <Button className={`btn${clsDisLikeBtn}`} onClick={disLikeHandler}
                        rounded text icon='pi pi-thumbs-down-fill' link/>
            </div>
            <div className='counter'>
                <span className='val'>543</span>
                <Button className={`btn${clsLikeBtn}`} onClick={likeHandler}
                        rounded text icon='pi pi-thumbs-up-fill' link/>
            </div>
        </div>
    );
}

export default Likes;