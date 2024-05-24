import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem('token')
	);
	const [cartItemCount, setCartItemCount] = useState(0);

	useEffect(() => {
		getCartItemCount();
		const interval = setInterval(getCartItemCount, 10000);

		return () => clearInterval(interval);
	}, []);

	const getCartItemCount = async () => {
		try {
			const token = localStorage.getItem('token');

			if (token) {
				const response = await axios.get(
					'https://whale-app-tlndf.ondigitalocean.app/api/cart/',
					{
						headers: {
							Authorization: `Token ${token}`,
						},
					}
				);

				if (response.status === 200) {
					const totalQuantity = response.data.cart_items.reduce(
						(total, item) => total + item.quantity,
						0
					);
					setCartItemCount(totalQuantity);
				}
			}
		} catch (error) {
			console.error('Error fetching cart items:', error.message);
		}
	};

	const handleLogout = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				console.error('Token not found');
				return;
			}

			const response = await axios.post(
				'https://whale-app-tlndf.ondigitalocean.app/api/logout/',
				{},
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);

			console.log('Logout response:', response);

			if (response.status === 200) {
				localStorage.removeItem('token');
				setIsLoggedIn(false);
				window.location.reload();
			} else {
				console.error('Logout failed');
			}
		} catch (error) {
			console.error('Error logging out:', error.message);
		}
	};

	const [searchQuery, setSearchQuery] = useState('');

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Search query:', searchQuery);
	};

	return (
		<div>
			<header className='text-gray-600 body-font bg-gray-50 shadow-md'>
				<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
					<a
						className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
						href='/'
					>
						<span className='ml-3 text-xl font-bold'>Pinacore</span>
					</a>
					<nav className='md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center'>
						{isLoggedIn ? (
							<>
								<a className='mr-5 hover:text-gray-900'>
									<span>Messages</span>
								</a>
								<Link
									to='orders'
									className='mr-5 hover:text-gray-900'
								>
									<span>Orders</span>
								</Link>
								<Link
									to='cart'
									className='mr-5 hover:text-gray-900'
								>
									<span>
										Cart:
										<span
											className='bg-blue-500 p-1 text-white rounded-2xl text-[12px] font-bold'
											id='cart-count'
										>
											{cartItemCount}
										</span>
									</span>
								</Link>
								<button
									className='mr-5 hover:text-gray-900'
									onClick={handleLogout}
								>
									<span>Logout</span>
								</button>
							</>
						) : (
							<>
								<a className='mr-5 hover:text-gray-900'>
									<span>
										Cart:
										<span
											className='bg-blue-500 p-1 text-white rounded-2xl text-[12px] font-bold'
											id='cart-count'
										>
											{cartItemCount}
										</span>
									</span>
								</a>
								<a
									className='mr-5 hover:text-gray-900'
									href='register'
								>
									<span>Login</span>
								</a>
							</>
						)}
					</nav>
					<form onSubmit={handleSubmit} className='hidden md:block'>
						<input
							type='text'
							value={searchQuery}
							onChange={handleInputChange}
							placeholder='Search...'
							className='border border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none flex-1'
						/>
					</form>
				</div>
			</header>
		</div>
	);
};
