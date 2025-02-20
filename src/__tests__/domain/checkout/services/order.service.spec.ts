import Order from "../../../../domain/checkout/entities/order/Order";
import OrderItem from "../../../../domain/checkout/entities/order/OrderItem";
import OrderService from "../../../../domain/checkout/services/order.service";
import Customer from "../../../../domain/customer/entities/Customer";
import Address from "../../../../domain/customer/entities/VOs/Address";



describe('OrderService', () => {
   
    it('should calculate the total of all orders', () => {
        const item1 = new OrderItem('p1','Product 1', 1, 100);
        const item2 = new OrderItem('p2','Product 2', 1, 200);

        const order = new Order('c1', [item1]);
        const order2 = new Order('c2', [item2]);

        const total = OrderService.calculateTotalOrder([order, order2]);

        expect(total).toBe(300);
     });

     it('should create a new order', () => {
         const customer = new Customer('John Doe', 'john@email.com', '123-456');
         const address = new Address('Main St', 123, '123-45', 'New York');
         customer.Address = address;
         customer.addRewardPoints = jest.fn();
         const item1 = new OrderItem('p1', 'Product 1', 5, 100);
         const item2 = new OrderItem('p2', 'Product 2', 10, 250);

         const order = OrderService.createOrder(customer, [item1, item2]);

         expect(order).toBeInstanceOf(Order);
         expect(order._items).toHaveLength(2);
         expect(order._total).toBe(3000);
         expect(customer.addRewardPoints).toHaveBeenCalledWith(300);
     });

     it('should throw an error when creating an order without items', () => {
         const customer = new Customer('John Doe', 'john@email.com', '123-456');
         customer._id = 'c1';
         customer.addRewardPoints = jest.fn();

         expect(() => OrderService.createOrder(customer, [])).toThrowError('Order items are required');
     });
    
})