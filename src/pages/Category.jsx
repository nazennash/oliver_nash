import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AfterNav } from '../components/AfterNav';

export const Category = () => {
	const { categoryId } = useParams();

	const [categoryProducts, setCategoryProducts] = useState([]);
	const [uniqueSubCategories, setUniqueSubCategories] = useState([]);
	const [uniqueSubTypeCategories, setUniqueSubTypeCategories] = useState([]);
	const [uniqueCategories, setUniqueCategories] = useState([]);
	const [uniqueBrands, setUniqueBrands] = useState([]);

	useEffect(() => {
		getCategoryProducts(categoryId);
	}, [categoryId]);

	const getCategoryProducts = async (mainCategoryId) => {
		try {
			const url = `http://127.0.0.1:8000/api/products/category/${mainCategoryId}/`;
			const response = await axios.get(url);
			setCategoryProducts(response.data);

			const subCategories = new Set();
			const subTypeCategories = new Set();
			const categories = new Set();
			const brands = new Set();

			response.data.forEach((product) => {
				subCategories.add(product.sub_category.name);
				subTypeCategories.add(product.sub_type_category.name);
				categories.add(product.name);
				brands.add(product.brand);
			});

			setUniqueSubCategories(Array.from(subCategories));
			setUniqueSubTypeCategories(Array.from(subTypeCategories));
			setUniqueCategories(Array.from(categories));
			setUniqueBrands(Array.from(brands));
		} catch (error) {
			console.error('Error fetching category products:', error);
		}
	};

	return (
		<div className='container mx-auto mt-5 p-5'>
			<div className='mb-5'>
				<form className='block md:hidden'>
					<input
						type='text'
						// value={searchQuery}
						// onChange={handleInputChange}
						placeholder='Search...'
						className='border border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none flex-1'
					/>
				</form>
			</div>
			<div className='grid lg:grid-cols-12 gap-5'>
				<div className='lg:col-span-3 hidden md:block'>
					<div className=''>
						<Link to='#' className='' aria-current='true'>
							Main Categories
						</Link>

						{uniqueSubCategories.map((category, index) => (
							<Link key={index} to='#' className=''>
								{category}
							</Link>
						))}
					</div>

					<div className=''>
						<Link to='#' className='' aria-current='true'>
							Categories
						</Link>

						{uniqueSubTypeCategories.map((category, index) => (
							<Link key={index} to='#' className=''>
								{category}
							</Link>
						))}
					</div>

					<div className=''>
						<Link to='#' className='' aria-current='true'>
							Sub-Categories
						</Link>

						{uniqueCategories.map((category, index) => (
							<Link key={index} to='#' className=''>
								{category}
							</Link>
						))}
					</div>

					<div className='list-group'>
						<Link to='#' className='' aria-current='true'>
							Brand
						</Link>

						{uniqueBrands.map((brand, index) => (
							<Link key={index} to='#' className=''>
								{brand}
							</Link>
						))}
					</div>
				</div>

				<div className='lg:col-span-8'>
					<div className=''>
						<small className=''></small>
					</div>
					{categoryProducts.map((product, index) => (
						<div
							className='border p-5 mb-5 rounded-lg grid grid-cols-12'
							key={index}
						>
							<div className='lg:col-span-3 col-span-12 lg:mt-5'>
								<img
									className='object-cover object-center w-[150px] h-[100px]'
									src={product.image}
									alt={product.name}
									style={{
										width: '100px',
										height: '100px',
										objectFit: 'cover',
										margin: 'auto',
									}}
								/>
							</div>

							<div className='lg:col-span-9 col-span-12'>
								<h5 className='text-xl font-bold'>
									{product.brand}
								</h5>
								<small className='text-red-600 text-[14px] font-bold'>
									Price: {product.discounted_price}
								</small>
								<br />
								<small className=''>
									<del>{product.price}</del>
								</small>
								<br />
								<small className=''>
									{product.description}
								</small>
								<br />
								<br />
								<Link
									to={`/details/${product.id}`}
									className='bg-blue-500 p-4 rounded-md text-[14px] text-white py-2 '
								>
									View details
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
