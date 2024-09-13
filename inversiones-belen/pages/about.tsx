import {GetServerSideProps} from 'next';
import {apiClient} from '../lib/api';
import {makeAllMenus} from '../lib/menu';
import {IMenuItem} from '../@types/components';
import MainLayout from '../layouts/Main';

export default function ShippingPage({mainMenu, footerMenu}: IPageProps) {
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu}>
			<div className={'container-xxl'}>
				<h1 className='page-heading page-heading_h1  page-heading_m-h1 text-black bg-white'>Acerca de</h1>
				<div className='text-container'>
					<p className='text-bg-white'>
          Elaboración, venta y reparación de todo tipo de calzado. Maracaibo Estado Zulia Av 68 entre calle 127-128
					</p>
				</div>
			</div>
		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps<IPageProps> = async () => {
	const categoryTree = await apiClient.catalog.getCategoryTree({menu: 'category'});

	const menus = makeAllMenus({categoryTree});

	return {
		props: {
			...menus
		}
	};
};

interface IPageProps {
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
}