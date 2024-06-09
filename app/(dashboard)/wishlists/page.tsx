import React, {FC} from 'react';
import WishLists from "@/components/list/wish-list/WishLists";

interface WishlistPageProps {

}

const Page: FC<WishlistPageProps> = () => {
    return (
        <div className='w-full'>
            <h1>Wishlist Page</h1>
            <WishLists/>
        </div>
    );
}

export default Page;