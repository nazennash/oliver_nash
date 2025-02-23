import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

export const NewArrivals = () => {
	const [newItems, setNewItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		getNewItems();
	}, [currentPage]); // Trigger effect when currentPage changes

	const getNewItems = async () => {
		try {
			const url = `https://whale-app-tlndf.ondigitalocean.app/api/new-arrivals/?page=${currentPage}`;
			const response = await axios.get(url);
			setNewItems(response.data.results); // Assuming pagination response contains 'results' field
		} catch (error) {
			console.error('Error fetching new items:', error.message);
		}
	};

	const addToCart = async (productId) => {
		try {
			const token = localStorage.getItem('token');

			if (token) {
				const response = await axios.post(
					`https://whale-app-tlndf.ondigitalocean.app/api/add-to-cart/${productId}/`,
					{ product_id: productId },
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

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div className='container mx-auto'>
			<div className='px-6 mb-1 '>
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

				<div className='mt-4 flex justify-center'>
					<button
						onClick={prevPage}
						disabled={currentPage === 1}
						className='mr-2 px-3 py-1 bg-blue-500 text-white rounded-md'
					>
						<ArrowLeft />
					</button>
					<button
						onClick={nextPage}
						disabled={!newItems.length}
						className='px-3 py-1 bg-blue-500 text-white rounded-md'
					>
						<ArrowRight />
					</button>
				</div>
			</div>
			<br />
			<hr />
			<br />
		</div>
	);
};
