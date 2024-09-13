import {IProduct} from 'boundless-api-client';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import ProductsList from '../components/ProductsList';
import MainLayout from '../layouts/Main';
import {apiClient} from '../lib/api';
import {makeAllMenus} from '../lib/menu';
// import VerticalMenu from '../components/VerticalMenu';
import {IMenuItem} from '../@types/components';
import SwiperSlider from '../components/SwiperSlider';
import mobileSlider1Img from '../assets/mobile-slider-1.jpeg';
// import CoverTextInCenter from '../components/CoverTextInCenter';
// import bgImg from '../assets/cover-bg.jpeg';
// import bgPortraitImg from '../assets/cover-bg-portrait.jpg';
import ProductsSliderByQuery from '../components/ProductsSliderByQuery';
import Reviews from '../components/Reviews';
import {IBasicSettings} from '../@types/settings';

import reviewWoman1 from '../assets/review-woman-1.png';

export default function IndexPage({products, mainMenu, footerMenu, basicSettings}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu} basicSettings={basicSettings}>
			<div className='container-xxl'>
				<MainPageSlider />
				<h1 className='page-heading page-heading_h1  page-heading_m-h1 bg-white text-black'>Zapatería</h1>
				<ProductsList
					products={products}
					className={'page-block'}
					itemClassName={'products__item_4-in-row'}
          categoryId={117}
          secondCategoryId={118}
				/>
        <h1 className='page-heading page-heading_h1  page-heading_m-h1 bg-white text-black'>Lubricantes y repuestos automotrices</h1>
				<ProductsList
					products={products}
					className={'page-block'}
					itemClassName={'products__item_4-in-row'}
          categoryId={116}
				/>
			</div>
			{/* <TextWithIcons
				columns={[
					{
						icon:  <FontAwesomeIcon icon={faBug} className={'text-with-icons__icon'} />,
						title: 'No resbala en las manos',
						comment: 'Revestimiento antideslizante - para mayor fiabilidad.'
					},
					{
						icon:  <FontAwesomeIcon icon={faShieldAlt} className={'text-with-icons__icon'} />,
						title: 'Protección adicional para el teléfono',
						comment: 'Revestimiento antideslizante - para mayor fiabilidad.'
					},
					{
						icon:  <FontAwesomeIcon icon={faSmile} className={'text-with-icons__icon'} />,
						title: 'Se ve bien',
						comment: 'Con nuestras fundas, su teléfono se verá aún mejor que sin ellas.'
					},
				]}
				fullWidth={true}
				className={'page-block'}
			/> */}
			<div className='container-xxl'>
				<ProductsSliderByQuery
					query={{collection: ['main-page'], sort: 'in_collection'}}
					title={'Ofertas especiales:'}
					wrapperClassName='page-block'
				/>
				<div className={'page-block'}>
					<h2 className={'text-center mb-4 bg-white text-black'}>Nuestro equipo:</h2>
					<Reviews
          className='bg-white text-black rounded p-5'
						reviews={[
							{
								image: <img src={reviewWoman1.src} className={'reviews__img'} />,
								title: 'Alonso Rafael Silva Higirio',
								jobTitle: 'Dueño',
								comment: 'Teléfono: 0414-9294828 | Fondo común'
							},
							{
								image: <img src={reviewWoman1.src} className={'reviews__img'} />,
								title: 'Nathanae  Silva rivera',
								jobTitle: 'Empleado',
								comment: 'Teléfono: 0424-6720816 | CI: 27263013'
							},
							{
								image: <img src={reviewWoman1.src} className={'reviews__img'} />,
								title: 'Jimmy Llorente',
								jobTitle: 'Empleado',
								comment: 'Teléfono: 0412-1660377 | CI: 23280503 '+''+'| Banesco'
							},
						]}
					/>
				</div>
			</div>
		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps<IIndexPageProps> = async () => {
	const categoryTree = await apiClient.catalog.getCategoryTree({menu: 'category'});
	const {products} = await apiClient.catalog.getProducts({collection: ['main-page'], sort: 'in_collection'});
	const basicSettings = await apiClient.system.fetchSettings(['system.locale', 'system.currency']) as IBasicSettings;

	const menus = makeAllMenus({categoryTree});

	return {
		props: {
			products,
			basicSettings,
			...menus
		}
	};
};

interface IIndexPageProps {
	products: IProduct[];
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
	basicSettings: IBasicSettings;
}

function 	MainPageSlider() {
	const slides = [
		{
			'img': mobileSlider1Img.src,
			'link': '',
			'caption': '',
			'captionPosition': 'bottom',
			'useFilling': true,
			'fillingColor': '#000000',
			'fillingOpacity': 0.40
		},
		// {
		// 	'img': mobileSlider2Img.src,
		// 	'link': '',
		// 	'caption': '',
		// 	'captionPosition': 'bottom',
		// 	'useFilling': true,
		// 	'fillingColor': '#000000',
		// 	'fillingOpacity': 0.4
		// }
	];

	return (
		<SwiperSlider
			showPrevNext
			// pagination='progressbar'
			size={'large'}
			slides={slides}
			className={'mb-4'}
		/>
	);
}