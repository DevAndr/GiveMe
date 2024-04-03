import WishListPublic from "@/components/wishlist/WishListPublic";
import GoToCartWidget from "@/components/widget/GoToCartWidget";
import PageTitle from "@/components/pageTitle/PageTitle";

export default function PagePublicWishList() {
    return (
        <div className='page'>
            <h3 className='pageTitle'>Username мечтает о</h3>
            <WishListPublic />
            <GoToCartWidget/>
        </div>
    )
}