import WishListPublic from "@/components/wishlist/WishListPublic";
import GoToCartWidget from "@/components/widget/GoToCartWidget";

export default function PagePublicWishList() {
    return (
        <div className='page'>
            <h3 className='pageTitle'>Username мечтает о</h3>
            <h4>Мои желания</h4>
            <WishListPublic />
            <GoToCartWidget/>
        </div>
    )
}