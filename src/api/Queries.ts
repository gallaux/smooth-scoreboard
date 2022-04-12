// TODO: This should be in an environment variable (react-app-env)
export const ApiUrl: string = "http://localhost:5000/";

/* Get the list of all products */
export const GetProductListQuery: string = ApiUrl + "products";

/* Get the list of all orders */
export const GetOrderListQuery: string = ApiUrl + "orders";

/*  Get details for a given product */
export const GetProduct = (productId: number): string => ApiUrl + "product/" + productId.toString();

/* Get the list of all orders for a given product */
export const GetProductOrderListQuery = (productId: number): string => ApiUrl + "product/" + productId.toString() + "/orders";

/* Get the order count for a given product */
export const GetProductOrderCountQuery = (productId: number): string => ApiUrl + "product/" + productId.toString() + "/order-count";