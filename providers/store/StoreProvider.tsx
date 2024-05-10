import {createContext, FC, ReactNode, useContext, useState} from 'react';


type StoreContextType = {
    cart: {
        productIds: string[]
    }
}

type StoreContextActionsType = {
    addProduct: (id: string) => void,
    removeProduct: (id: string) => void,
}

export const StoreContext = createContext<StoreContextType & StoreContextActionsType>({
    cart: {
        productIds: []
    },
    addProduct: (id: string) => {
    },
    removeProduct: (id: string) => {
    }
});

interface StoreProviderProps {
    children: ReactNode;
}


export const useStore = () => {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error('useStore must be used within an StoreProvider');
    }

    return context;
};

const StoreProvider: FC<StoreProviderProps> = ({children}) => {
    const [state, setState] = useState<StoreContextType>({
        cart: {
            productIds: []
        }
    });

    function addProduct(id: string) {
        const newCart = {
            ...state.cart,
            productIds: [...state.cart.productIds, id]
        };

        setState({
            ...state,
            cart: newCart
        });
    }


    function removeProduct(id: string) {
        const newCart = {
            ...state.cart,
            productIds: state.cart.productIds.filter(x => x !== id)
        };

        setState({
            ...state,
            cart: newCart
        });
    }

    return (
        <StoreContext.Provider value={{cart: state.cart, addProduct, removeProduct}}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;