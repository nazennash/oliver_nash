import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Orders = ({ token }) => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		getOrders();
	}, []); // Trigger effect only once when component mounts

	const getOrders = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.get(
				'https://whale-app-tlndf.ondigitalocean.app/api/orders/',
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
			setOrders(response.data); // Assuming orders data is directly an array
		} catch (error) {
			console.error('Error fetching orders:', error.message);
		}
	};

	return (
		<div className='container mx-auto'>
			<div className='px-6 mb-1'>
				<h1 className='font-bold text-2xl'>Orders</h1>
				<div className='mt-6'>
					{orders.map((order) => (
						<div key={order.id} className='border p-4 mb-4'>
							<p>Order Number: {order.id}</p>
							<p>Total Price: {order.total_price}</p>
							<p>Status: {order.status}</p>
							<p>
								Order Date:{' '}
								{new Date(order.order_date).toLocaleString()}
							</p>
							{/* Add more order details as needed */}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
