import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DashCircle, PlusCircle } from 'react-bootstrap-icons';
import gif from '../assets/thank_you.gif';

export const Cart = () => {
	const [cartItems, setCartItems] = useState([]);
	const [subtotal, setSubtotal] = useState(0);
	const [shippingAmount, setShippingAmount] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		getCartItems();
	}, []);

	const getCartItems = async () => {
		try {
			const token = localStorage.getItem('token');

			if (token) {
				const response = await axios.get(
					`https://whale-app-tlndf.ondigitalocean.app/api/cart/`,
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);
				setCartItems(response.data.cart_items);
				setShippingAmount(response.data.shipping_amount);
				setTotalAmount(response.data.total_amount);
				calculateSubtotal(response.data.cart_items);
				console.log('Cart items:', response.data);
			}
		} catch (error) {
			console.error('Error fetching cart items:', error.message);
		}
	};

	const calculateSubtotal = (cartItems) => {
		let total = 0;
		cartItems.forEach((item) => {
			total += item.subtotal;
		});
		setSubtotal(total);
	};

	const handleRemoveItem = async (itemId) => {
		try {
			const token = localStorage.getItem('token');

			if (token) {
				await axios.delete(
					`http://https://whale-app-tlndf.ondigitalocean.app/api/delete/${itemId}/`,
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);
				getCartItems();
			}
		} catch (error) {
			console.error('Error removing item from cart:', error.message);
		}
	};

	const handleAddQuantity = async (itemId) => {
		try {
			const token = localStorage.getItem('token');

			if (token) {
				await axios.patch(
					`http://https://whale-app-tlndf.ondigitalocean.app/api/add/${itemId}/`,
					null,
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);
				getCartItems();
			}
		} catch (error) {
			console.error('Error adding quantity:', error.message);
		}
	};

	const handleMinusQuantity = async (itemId) => {
		try {
			const token = localStorage.getItem('token');

			if (token) {
				await axios.patch(
					`http://https://whale-app-tlndf.ondigitalocean.app/api/subtract/${itemId}/`,
					null,
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);
				getCartItems();
			}
		} catch (error) {
			console.error('Error subtracting quantity:', error.message);
		}
	};

	const buyNow = async (productId) => {
		try {
			const token = localStorage.getItem('token');
			const phoneNumber = '0797382426';
			const price = parseInt(totalAmount);

			if (token) {
				const response = await axios.post(
					`http://https://whale-app-tlndf.ondigitalocean.app/api/payment/`,
					{
						price,
						phone_number: phoneNumber,
					},
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);

				if (response.status === 201) {
					console.log('Payment successful');
					setShowModal(true);
				} else {
					console.error('Failed to process payment');
					setShowModal(true);
					--testing;
				}
			}
		} catch (error) {
			console.error('Error processing payment:', error.message);
		}
	};

	return (
		<div className='lg:container mx-auto p-5'>
			<div className='m-10'>
				<h3 className='text-center text-3xl font-bold'>
					Shopping Cart
				</h3>
			</div>
			{showModal && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
					<div className='bg-white p-8 rounded-lg'>
						<h2 className='text-2xl font-bold mb-4'>Success!</h2>
						<img src={gif} alt='' />
						<p>Check your phone for payment prompt.</p>
						<p>Bridging the digital divide</p>
						<p></p>
						<button
							className='mt-4 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none'
							onClick={() => setShowModal(false)}
						>
							Close
						</button>
					</div>
				</div>
			)}
			<div className='grid md:grid-cols-12 md:gap-5 md:m-5'>
				<div className='md:col-span-9 col-span-12'>
					<div className=''>
						{cartItems.map((item) => (
							<div
								key={item.id}
								className='grid grid-cols-12 gap-5 mb-4 border border-gray-300 rounded-xl p-3'
							>
								<div className='col-span-5 md:col-span-3'>
									<img
										className='object-cover'
										src={item.product.image}
										alt={item.product.name}
										style={{
											width: '150px',
											height: '150px',
											objectFit: 'cover',
											display: 'flex',
										}}
									/>
								</div>

								<div className='col-span-10 md:col-span-9 flex flex-col justify-between'>
									<div>
										<p className='text-lg font-semibold'>
											{item.product.name}
										</p>
										<p className='text-sm text-gray-600'>
											{item.product.description}
										</p>
									</div>
									<div className='flex justify-between items-center'>
										<p className='text-lg font-semibold text-red-500'>
											${item.product.price}
										</p>
										<div className='flex items-center'>
											<button
												className='text-white px-1 rounded-xl hover:text-gray-700 focus:outline-none'
												onClick={() =>
													handleMinusQuantity(item.id)
												}
											>
												<DashCircle color='red' />
											</button>
											<span className='mx-1'>
												{item.quantity}
											</span>
											<button
												className=' text-white  px-1 rounded-xl hover:text-gray-700 focus:outline-none'
												onClick={() =>
													handleAddQuantity(item.id)
												}
											>
												<PlusCircle color='blue' />
											</button>
										</div>
									</div>
									<button
										className='w-1/4 mt-2 bg-gray-700  text-white text-sm font-semibold rounded-md py-1 px-3 focus:outline-none ml-auto hover:bg-red-800'
										onClick={() =>
											handleRemoveItem(item.id)
										}
									>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='md:col-span-3 col-span-12 border rounded-xl'>
					<div className='p-3'>
						<p className='font-bold mb-3'>Cart Total</p>
						<div className=''>
							<div className='flex justify-between p-3'>
								<small className='font-bold text-[15px]'>
									SubTotal
								</small>
								<small>${subtotal.toFixed(2)}</small>
							</div>
							<hr />
							<div className='flex justify-between p-3'>
								<small className='font-bold text-[15px] text-red-600'>
									Shipping
								</small>
								<small>${shippingAmount.toFixed(2)}</small>
							</div>
							<hr />
							<div className='flex justify-between p-3'>
								<small className='font-bold text-[15px]'>
									Total
								</small>
								<small>${totalAmount.toFixed(2)}</small>
							</div>
							<br />
							<div className='p-3'>
								<Link
									to='#'
									className='bg-blue-700  text-white text-sm font-semibold rounded-md p-3 hover:bg-gray-800 focus:outline-none ml-auto'
									onClick={buyNow}
								>
									Checkout
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
