import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';

const CartItemCount: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="flex items-center cart-item-count text-xl font-bold">
      <ShoppingCartOutlined className="text-gray-600 mr-2" style={{ fontSize: '1.5rem' }} />
      <span className="text-gray-600">{cartItems.length}</span>
    </div>
  );
};

export default CartItemCount;
