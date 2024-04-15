import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const NewArrivals = () => {
	const [newItems, setNewItems] = useState([]);

	useEffect(() => {
		getNewItems();
	}, []);

	const getNewItems = async () => {
		try {
			const url = 'http://127.0.0.1:8000/api/new-arrivals/';
			const response = await axios.get(url);
			console.log('data', response.data);
			setNewItems(response.data);
		} catch (error) {
			console.error('Error fetching new items:', error.message);
		}
	};

	const addToCart = async (productId) => {
		try {
			const token = localStorage.getItem('token');

			if (token) {
				const response = await axios.post(
					`http://127.0.0.1:8000/api/add-to-cart/${productId}/`,
					{ product_id: productId }, // Changed newItems.id to productId
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);

				if (response.status === 201) {
					console.log('Product added to cart successfully');
				} else {
					console.error('Failed to add product to cart');
				}
			}
		} catch (error) {
			console.error('Error adding product to cart:', error.message);
		}
	};

	return (
		<div>
			<div className='container mx-auto px-6 mb-1 '>
				<span className='font-bold text-[22px]'>New Arrivals | </span>
				<span>
					Don't miss this opportunity at a special discount Up
				</span>

				<div className='grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-3 md:gap-3 grid-cols-2 gap-2 mt-10'>
					{newItems.map((item, index) => (
						<div
							className='border rounded-xl mx-auto p-5'
							key={index}
						>
							<span
								className='bg-blue-500 text-white p-1 rounded-xl text-[12px] font-bold'
								style={{ width: '40px' }}
							>
								<span>{item.discount_percentage}%</span>
							</span>
							<a className='block relative h-30 rounded overflow-hidden'>
								<img
									alt={item.name}
									className='object-cover object-center w-[150px] h-[100px] '
									src={item.image}
								/>
							</a>
							<div className='mt-4'>
								<h3 className='font-bold text-[13px] mb-2 '>
									{item.brand}
								</h3>
								<div className='mt-4 mb-2'>
									<div className='flex justify-between items-center'>
										<h2 className='text-red-500 font-bold text-lg'>
											{item.discounted_price}
										</h2>
										<h2 className='text-gray-900  text-[15px] font-light line-through'>
											{item.price}
										</h2>
									</div>
								</div>

								<button
									onClick={() => addToCart(item.id)}
									className='bg-blue-500 p-2 rounded-md text-[13px] text-white font-bold py-1'
								>
									Add to Cart
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<br />
			<br />
		</div>
	);
};
