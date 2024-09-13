import Link from 'next/link';
import HeaderCart from '../cart/HeaderCart';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {MouseEvent} from 'react';
import {setIsOpened} from '../../redux/reducers/asideMenu';
// import logoImg from '../../assets/logo.svg';
import clsx from 'clsx';
import {RootState} from '../../redux/store';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons/faShoppingCart';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function MarsLogoRow() {
	const dispatch = useAppDispatch();

	const asideIsOpened = useAppSelector((state: RootState) => state.asideMenu.isOpened);
	const onHamburgerBtnClicked = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(setIsOpened(true));
	};

	return (
		<section className={'mars-logo-row'}>
			<div className={'container-xxl mars-logo-row__container'}>
				<div className={'mars-logo-row__logo-wrapper'}>
					<Link href={'/'} className={'mars-logo-row__logo'}>
						<span>Inversiones Belén C.A</span>
						{/* <img src={logoImg.src} alt={'Brand Shop'} /> */}
					</Link>
				</div>
				<div className={'mars-logo-row__welcome'}>
					Welcome to our shop. We are working for you!
				</div>
				
			</div>
		</section>
	);
}