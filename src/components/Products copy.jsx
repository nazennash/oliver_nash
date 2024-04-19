import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = async () => {
		try {
			const url = 'http://127.0.0.1:8000/api/products/';
			const response = await axios.get(url);
			setProducts(response.data);
		} catch (error) {
			console.error('Error fetching products:', error.message);
		}
	};

	const addToCart = async (productId) => {
		try {
			const response = await axios.post(
				`http://127.0.0.1:8000/api/add-to-cart/${productId}/`,
				null,
				{
					withCredentials: true,
				}
			);

			if (response.status === 201) {
				console.log('Product added to cart successfully');
			} else {
				console.error('Failed to add product to cart');
			}
		} catch (error) {
			console.error('Error adding product to cart:', error.message);
		}
	};

	return (
		<div className='container mx-auto'>
			<div className='px-6 mb-1 '>
				<span className='font-bold text-[22px]'>Products | </span>
				<span>
					Don't miss the current offers until the end of April
				</span>

				<div className='grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-3 md:gap-5 grid-cols-2 gap-2 mt-10'>
					{products.map((product, index) => (
						<div key={index}>
							<div
								className='border rounded-xl mx-auto p-5'
								key={index}
							>
								<span
									className='bg-blue-500 text-white p-1 rounded-xl text-[12px] font-bold'
									style={{ width: '40px' }}
								>
									<span>{product.discount_percentage}%</span>
								</span>

								<a className='block relative h-30 rounded overflow-hidden'>
									<img
										alt={product.name}
										className='object-cover object-center w-[150px] h-[100px] '
										src={product.image}
									/>
								</a>
								<div className='mt-4'>
									<h3 className='font-bold text-[13px] mb-2 '>
										{product.brand}
									</h3>
									<div className='mt-4 mb-2'>
										<div className='flex justify-between items-center'>
											<h2 className='text-red-500 font-bold text-lg'>
												{product.discounted_price}
											</h2>
											<h2 className='text-gray-900  text-[15px] font-light line-through'>
												{product.price}
											</h2>
										</div>
									</div>

									<button
										onClick={() => addToCart(product.id)}
										className='bg-blue-500 p-2 rounded-md text-[13px] text-white font-bold py-1'
									>
										Add to Cart
									</button>
								</div>
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
