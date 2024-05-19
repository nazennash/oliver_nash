import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Register() {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [name, setName] = useState('');
	const [otp, setOTP] = useState('');
	const [isRegistered, setIsRegistered] = useState(false);
	const [error, setError] = useState('');
	const [isLogin, setIsLogin] = useState(true);
	const [token, setToken] = useState();
	// console.log(localStorage.getItem('token'));
	const navigate = useNavigate();

	useEffect(() => {
		setToken(localStorage.getItem('token'));
		console.log('Token', token);
	}, [token]);

	const handlePhoneNumberChange = (event) => {
		setPhoneNumber(event.target.value);
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleOTPChange = (event) => {
		setOTP(event.target.value);
	};

	const handleToggle = () => {
		setIsLogin(!isLogin);
		setIsRegistered(false);
		setError('');
	};

	const handleRegistrationSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				'https://whale-app-tlndf.ondigitalocean.app/api/register/',
				{ phone_number: phoneNumber, name }
			);
			if (response.data.status === 200) {
				console;
				console.log('One', response.data.status);
				setIsRegistered(true);
				const token = response.data.data.token;
				localStorage.setItem('token', token);
				setToken(token);
				navigate('/');
			} else if (response.data.status === 409) {
				console.log('Two', response.data.detail);
				setError('Phone number is already registered');
				setIsLogin(false);
			}
		} catch (error) {
			setError(error.response?.data?.detail);
		}
	};

	const handleLoginSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				'https://whale-app-tlndf.ondigitalocean.app/api/login/',
				{ phone_number: phoneNumber }
			);
			if (response.status === 200) {
				setError('');
				setIsRegistered(true);
			} else if (response.status === 404) {
				setIsLogin(false);
				navigate('/register');
			} else {
				setError('Login failed');
			}
		} catch (error) {
			setError(error.response?.data?.detail || 'Login failed');
		}
	};

	const handleOTPSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				`https://whale-app-tlndf.ondigitalocean.app/api/validate_otp/${phoneNumber}/`,
				{ code: otp }
			);
			if (response.status === 200) {
				setError('');
				const token = response.data.data.token;
				console.log('Token from response:', token);
				localStorage.setItem('token', token);
				setToken(token);
				navigate('/');
				window.location.reload();
			} else {
				setError('OTP verification failed');
			}
		} catch (error) {
			setError(error.response?.data?.detail || 'OTP verification failed');
		}
	};

	return (
		<div className='md:mx-auto container flex items-center'>
			<div className=' mx-auto '>
				<form
					className='mx-3 shadow-md m-12 py-2 container'
					onSubmit={
						isRegistered
							? handleOTPSubmit
							: isLogin
							? handleLoginSubmit
							: handleRegistrationSubmit
					}
				>
					{error && <div className='alert alert-danger'>{error}</div>}
					{!isRegistered && !isLogin && (
						<div className='m-8'>
							<div className='mb-3'>
								<div className='mb-3 font-bold'>
									<label
										htmlFor='phoneNumberInput'
										className=''
									>
										Phone Number:
									</label>
								</div>
								<input
									type='tel'
									id='phoneNumberInput'
									value={phoneNumber}
									onChange={handlePhoneNumberChange}
									className='rounded-md w-full '
									placeholder='Enter your phone number'
									required
								/>
							</div>
							<div className='mb-6'>
								<div className='mb-3 font-bold'>
									<label
										htmlFor='nameInput'
										className='form-label'
									>
										Name:
									</label>
								</div>
								<input
									type='text'
									id='nameInput'
									value={name}
									onChange={handleNameChange}
									className='rounded-md w-full '
									placeholder='Enter your name'
									required
								/>
							</div>
							<button
								type='submit'
								className='bg-blue-500 p-2 rounded-lg w-full  text-white font-bold'
							>
								Register
							</button>
						</div>
					)}
					{!isRegistered && isLogin && (
						<div className='m-12'>
							<div className='mb-4'>
								<div className='mb-3 font-bold'>
									<label
										htmlFor='phoneNumberInput'
										className=''
									>
										Phone Number:
									</label>
								</div>
								<input
									type='tel'
									id='phoneNumberInput'
									value={phoneNumber}
									onChange={handlePhoneNumberChange}
									className='rounded-md w-full '
									placeholder='Enter your phone number'
									required
								/>
							</div>
							<button
								type='submit'
								className='bg-blue-500 p-2 rounded-lg w-full  text-white font-bold'
							>
								Login
							</button>
						</div>
					)}
					{isRegistered && (
						<div className='m-12'>
							<div className='mb-6'>
								<div className='mb-3 font-bold'>
									<label
										htmlFor='otpInput'
										className='form-label'
									>
										Enter OTP:
									</label>
								</div>
								<input
									type='text'
									id='otpInput'
									value={otp}
									onChange={handleOTPChange}
									className='rounded-md w-full '
									placeholder='Enter OTP'
									required
								/>
							</div>
							<button
								type='submit'
								className='bg-blue-500 p-2 rounded-lg w-full  text-white font-bold'
							>
								Verify OTP
							</button>
						</div>
					)}
					<div className='text-center'>
						<button
							type='button'
							onClick={handleToggle}
							className='btn btn-link'
						>
							{isLogin ? (
								<div>
									<span className='text-[16px]'>
										Don't have an account?
										<span className='font-bold text-red-500 px-1'>
											Register
										</span>
									</span>
								</div>
							) : (
								<div>
									<span className='text-[16px]'>
										Already have an account?
										<span className='font-bold text-red-500 px-1'>
											Login
										</span>
									</span>
								</div>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
