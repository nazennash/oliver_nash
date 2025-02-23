import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

export const Products = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		getProducts();
	}, [currentPage]); // Trigger effect when currentPage changes

	const getProducts = async () => {
		try {
			const url = `https://whale-app-tlndf.ondigitalocean.app/api/products/?page=${currentPage}`;
			const response = await axios.get(url);
			setProducts(response.data.results); // Assuming pagination response contains 'results' field
		} catch (error) {
			console.error('Error fetching products:', error.message);
		}
	};

	const addToCart = async (productId) => {
		try {
			const token = localStorage.getItem('token');
			const session_id = localStorage.getItem('session_id');

			if (token) {
				const response = await axios.post(
					`https://whale-app-tlndf.ondigitalocean.app/api/add-to-cart/${productId}/`,
					{ product_id: productId },
					{
						headers: {
							Authorization: `Token ${token}`,
							'X-Session-ID': session_id,
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
		<div>
			<div className='container mx-auto px-6 mb-1 '>
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
						className='px-3 py-1 bg-blue-500 text-white rounded-md'
					>
						<ArrowRight />
					</button>
				</div>
			</div>
			<br />
			<br />
			<hr />
		</div>
	);
};
