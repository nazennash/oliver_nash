import { FirstInfo } from '../components/FirstInfo';
import { Navbar } from '../components/Navbar';
import { NewArrivals } from '../components/NewArrivals';
import { Products } from '../components/Products';
import { SecondInfo } from '../components/SecondInfo';
import { ThirdInfo } from '../components/ThirdInfo';
import { BrowseByCategory } from '../components/BrowseByCategory';
import { Footer } from '../components/Footer';
import { SlideShow } from '../components/SlideShow';
import { MainCategoryList } from '../components/MainCategoryList';
import { AfterNav } from '../components/AfterNav';

export const Homepage = () => {
	return (
		<div>
			<Navbar />
			<div className='block md:hidden'>
				<AfterNav />
			</div>
			<div className='md:mt-5 border container mx-auto p-5 grid grid-cols-12 gap-5'>
				<div className='md:col-span-4 lg:col-span-3 hidden md:block'>
					<MainCategoryList />
				</div>
				<div className='col-span-12 md:col-span-8 lg:col-span-9 '>
					<SlideShow />
				</div>
				<br />
			</div>
			<FirstInfo />
			<SecondInfo />
			<NewArrivals />
			<Products />
			<ThirdInfo />
			<BrowseByCategory />
			<Footer />
		</div>
	);
};
