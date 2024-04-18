import React, { useState } from 'react';
import { List } from 'react-bootstrap-icons';
import { MainCategoryList } from './MainCategoryList'; // Import the MainCategoryList component

export const AfterNav = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// State for the search query
	const [searchQuery, setSearchQuery] = useState('');

	// Event handler for input change
	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	// Event handler for form submit (optional)
	const handleSubmit = (event) => {
		event.preventDefault();
		// Perform search logic here (e.g., navigate to search results page)
		// console.log('Search query:', searchQuery);
	};

	return (
		<div>
			<div className=''>
				<div className='container mx-auto p-5 flex justify-between items-center'>
					<button className='mb-4' onClick={toggleMenu}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 16 16'
							width='30'
							height='30'
							fill='currentColor'
							className='bi bi-list'
						>
							<path
								fillRule='evenodd'
								d={
									isOpen
										? 'M3 9a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z'
										: 'M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
								}
							/>
						</svg>
					</button>

					<form onSubmit={handleSubmit} className='block md:hidden'>
						<input
							type='text'
							value={searchQuery}
							onChange={handleInputChange}
							placeholder='Search...'
							className='border border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none flex-1'
						/>
					</form>
				</div>
			</div>
			<div className='block'>{isOpen && <MainCategoryList />}</div>
		</div>
	);
};
