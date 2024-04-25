import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, List, Typography } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
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
        return <Typography.Text>Your cart is empty</Typography.Text>;
    }

    return (
        <div className="m-4">
            <Typography.Title level={3}>Cart</Typography.Title>
            <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button onClick={() => handleChangeQuantity(item, 1)} icon={<PlusOutlined />} />,
                            <Button onClick={() => handleChangeQuantity(item, -1)} icon={<MinusOutlined />} disabled={item.quantity <= 1} />,
                            <Button onClick={() => handleRemoveItem(item.product.id)} icon={<DeleteOutlined />} />
                        ]}
                    >
                        <List.Item.Meta
                            title={`${item.product.title} - $${item.product.price}`}
                            description={`Quantity: ${item.quantity}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Cart;
