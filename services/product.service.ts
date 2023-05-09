export class ProductService {

    async getProductsSmall() {
        const {data} = await import('./products.json')
        return data
    }

    getProducts() {
        return fetch('products.json').then(res => res.json()).then(d => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch('products.json').then(res => res.json()).then(d => d.data);
    }
}
