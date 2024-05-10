import LocalStorageService from '@/services/LocalStorageService';

class LocalCartService {
    addProduct(key: string, idProduct: string) {
        let products: string[] = JSON.parse(LocalStorageService.get(key) || '[]');

        if (products) {
            products.push(idProduct);
            LocalStorageService.add(key, JSON.stringify(products));
        } else
            LocalStorageService.add(key, JSON.stringify([idProduct]));
    }


    removeProduct(key: string, idProduct: string) {
        const products: string[] = JSON.parse(LocalStorageService.get(key) || '[]');
        LocalStorageService.add(key, JSON.stringify(products.filter(id => id !== idProduct)));
    }

    getProducts(key: string) {
        return JSON.parse(LocalStorageService.get(key) || '[]');
    }
}

export default new LocalCartService();