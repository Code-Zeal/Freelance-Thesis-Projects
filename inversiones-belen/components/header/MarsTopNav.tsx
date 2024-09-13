import {ReactNode} from 'react';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import {faShippingFast} from '@fortawesome/free-solid-svg-icons/faShippingFast';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function MarsTopNav() {
	return (
		<nav className={'mars-top-nav'}>
			<div className={'container-xxl mars-top-nav__container'}>
				<div className={'mars-top-nav__contacts'}>
					<Contact href={'tel:04149294828'}
									 label={'04149294828'}
									 icon={<FontAwesomeIcon icon={faPhoneAlt} />}
					/>
					<Contact href={'https://api.whatsapp.com/send?phone=584149294828'}
									 label={'04149294828'}
									 icon={<FontAwesomeIcon icon={faWhatsapp} />}
					/>
				</div>
				<div className={'mars-top-nav__note'}>
				</div>
				<ul className={'mars-top-nav__menu list-unstyled'}>
					{/* <li className={'mars-top-nav__menu-item'}>
						<Link href={'/shipping'} className='mars-top-nav__menu-link'>
            Envíos
						</Link>
					</li> */}
					<li className={'mars-top-nav__menu-item'}>
						<Link href={'/about'} className='mars-top-nav__menu-link'>
							Acerca de
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

const Contact = ({href, label, icon}: {href: string, label: string, icon?: ReactNode}) => {
	return (
		<div className={'mars-top-nav__contact'}>
			{icon &&
			<a className={'mars-top-nav__contact-icon'} href={href}>{icon}</a>}
			<a className={'mars-top-nav__contact-txt'} href={href}>
				{label}
			</a>
		</div>
	);
};