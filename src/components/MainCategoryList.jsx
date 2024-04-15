import axios from 'axios';
import { useEffect, useState } from 'react';
import '../index.css';

export const MainCategoryList = ({ isOpen }) => {
	const [mainItem, setMainItem] = useState([]);

	useEffect(() => {
		if (!isOpen) {
			getMainItem();
		}
	}, [isOpen]);

	const getMainItem = async () => {
		const url = 'http://127.0.0.1:8000/api/main-category/';
		try {
			const response = await axios(url);
			setMainItem(response.data);
		} catch (error) {
			console.error('Error fetching main categories:', error);
		}
	};

	return (
		<div className='container mx-auto block md:block border rounded-lg'>
			<ul>
				<li className='bg-blue-500 text-white p-3 font-bold rounded-t-lg'>
					All Categories
				</li>
				{mainItem.map((item, index) => (
					<li key={index} className='px-3 py-2 mt-1 border-b-2'>
						<a
							href={`/category/${item.id}/`}
							style={{ color: 'black', textDecoration: 'none' }}
						>
							{item.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};
