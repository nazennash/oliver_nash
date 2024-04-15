import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const BrowseByCategory = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		try {
			const url = 'http://127.0.0.1:8000/api/main-category/';
			const response = await axios.get(url);
			console.log('data', response.data);
			setCategories(response.data);
		} catch (error) {
			console.error('Error fetching new items:', error.message);
		}
	};

	return (
		<div>
			<div className='container mx-auto px-6 mb-1 '>
				<span className='font-bold text-[22px]'>
					Browse By Category |{' '}
				</span>
				<span>
					Don't miss this opportunity at a special discount Up
				</span>

				<div className='grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-3 md:gap-5 grid-cols-2 gap-2 mt-10'>
					{categories.map((category, index) => (
						<div
							className='border rounded-xl mx-auto p-5'
							key={index}
						>
							<a className='block relative h-30 rounded overflow-hidden'>
								<img
									alt={category.name}
									className='object-cover object-center w-[150px] h-[100px] '
									src={category.image}
								/>
							</a>
							<div className='mt-4'>
								<h3 className='font-bold text-[13px] mb-2 '>
									{category.name}
								</h3>
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
