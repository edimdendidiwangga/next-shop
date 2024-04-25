// components/molecules/Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeItem, updateItem } from '../../reducer/slices/cartSlice';
import { CartItem as CartItemType } from '../../types/types';

const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveItem = (productId: number) => {
        dispatch(removeItem(productId));
    };

    const handleChangeQuantity = (item: CartItemType, delta: number) => {
        dispatch(updateItem({ ...item, quantity: item.quantity + delta }));
    };

    if (cartItems.length === 0) {
        return <p>Your cart is empty</p>;
    }

    return (
        <div>
            <h3>Cart</h3>
            {cartItems.map((item) => (
                <div key={item.product.id}>
                    <div>{item.product.title} - ${item.product.price} x {item.quantity}</div>
                    <button onClick={() => handleChangeQuantity(item, 1)}>+</button>
                    <button onClick={() => handleChangeQuantity(item, -1)} disabled={item.quantity <= 1}>-</button>
                    <button onClick={() => handleRemoveItem(item.product.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
