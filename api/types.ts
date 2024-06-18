export type SignInData = {
    email: string;
    password: string;
}

export type SignUpData = {
    name: string;
    email: string;
    password: string;
}

type AccessType = 'PUBLIC' | 'PRIVATE'

export type WishList = {
    id: string;
    name: string;
    description: string;
    access: AccessType
    products: []
}