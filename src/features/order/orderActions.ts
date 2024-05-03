import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { OrderData, ProductInfo } from '../../types/types';
import { API_BASE_URL } from '../../constants/apiConstants';

interface OrderRequest {
  subscriberInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  deliveryInfo: {
    address: string;
    locationName?: string;
    deliveryNumber?: string;
    deliveryTime?: string;
  };
  productInfo: ProductInfo;
}

export const createOrder = createAsyncThunk<OrderData, OrderRequest, { state: RootState, rejectValue: string }>(
  'orders/createOrder',
  async (orderRequest, { rejectWithValue }) => {
    const { productInfo, ...orderDetails } = orderRequest;
    try {
      const productResponse = await fetch(`${API_BASE_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productInfo),
      });

      if (!productResponse.ok) {
        const errorProductMsg = await productResponse.text();
        throw new Error(errorProductMsg || 'Failed to create product');
      }

      const product = await productResponse.json();

      const orderResponse = await fetch(`${API_BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...orderDetails,
          productId: product._id,
        }),
      });

      if (!orderResponse.ok) {
        const errorOrderMsg = await orderResponse.text();
        throw new Error(errorOrderMsg || 'Failed to create order');
      }

      return await orderResponse.json();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error occurred');
    }
  }
);
