declare class OrderService {
    private orderRepository;
    constructor();
    getAllOrderService: () => Promise<any>;
    getOrderInUserService: (id: any) => Promise<any>;
    getOrderInSellerService: (id: any) => Promise<any>;
    saveOrder: (order: any) => Promise<any>;
    changeStatusOrder: (id: any) => Promise<any>;
    getOrderInDay: (id: any, time: any) => Promise<boolean>;
}
declare const _default: OrderService;
export default _default;
