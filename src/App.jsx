import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Homepage } from './pages/Homepage';
import { Details } from './pages/Details';
import { Category } from './pages/Category';
import { Cart } from './pages/Cart';
import { Register } from './pages/Login/Register';
import { PageNotFound } from './pages/PageNotFound';
import { Orders } from './pages/Order';

export default function App() {
	return (
		<div id='root'>
			<BrowserRouter>
				<Navbar />
				<div className='root-container'>
					<Routes>
						<Route path='/' element={<Homepage />} />
						<Route path='*' element={<PageNotFound />} />
						<Route
							path='/details/:productId'
							element={<Details />}
						/>
						<Route
							path='/category/:categoryId'
							element={<Category />}
						/>
						<Route path='/cart' element={<Cart />} />
						<Route path='/orders' element={<Orders />} />
						<Route path='/register' element={<Register />} />
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}
