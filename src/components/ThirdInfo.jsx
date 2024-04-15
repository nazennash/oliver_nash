import React from 'react';
import { Phone, ShieldCheck, Truck } from 'react-bootstrap-icons';

export const ThirdInfo = () => {
	return (
		<div>
			<div className='container mx-auto my-10 gap-7 grid lg:grid-cols-3 md:gap-20 md:grid-cols-2 md:p-5 shadow-md'>
				<div className='col-span-1 text-center'>
					<Truck size={25} className='inline-block my-2 font-bold' />
					<h1 className='text-xl font-bold'>
						FREE AND FAST DELIVERY
					</h1>
					<p className='text-[15px] my-2'>
						Free delivery for all orders over Kshs.10000
					</p>
				</div>
				<div className='col-span-1 text-center my-2'>
					<Phone size={25} className='inline-block' />
					<h1 className='text-xl font-bold'>24/7 CUSTOMER SERVICE</h1>
					<p className='text-[15px] my-2'>
						Friendly 24/7 customer support
					</p>
				</div>
				<div className='col-span-1 text-center my-2'>
					<ShieldCheck size={25} className='inline-block' />
					<h1 className='text-xl font-bold'>MONEY BACK GUARANTEE</h1>
					<p className='text-[15px] my-2'>
						We return money within 30 days
					</p>
				</div>
			</div>
			<br />
			<br />
		</div>
	);
};
