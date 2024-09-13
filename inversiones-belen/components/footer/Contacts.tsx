import {faWhatsapp} from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function FooterContacts() {
	return (
		<>
			<h3 className='page-footer__header'>Contáctenos</h3>
			<p className='page-footer__icon-w-link'>
				<span className='icon'>
					<FontAwesomeIcon icon={faWhatsapp}/>
				</span>
				<a className='link' href='tel:04149294828'>04149294828</a>
			</p>
			<p className='page-footer__icon-w-link'>
				<span className='icon'>
					<FontAwesomeIcon icon={faMapMarkerAlt}/>
				</span>
				<a className='link' href='https://www.google.com/maps/place/Avenida+68+%26+Calle+127,+Maracaibo+4004,+Zulia/@10.588704,-71.6765358,17z/data=!3m1!4b1!4m6!3m5!1s0x8e8990b6729383eb:0x46e8993af23d45bc!8m2!3d10.588704!4d-71.6739609!16s%2Fg%2F11ggzln2mq?entry=ttu'>Maracaibo estado Zulia AV 68 entre calle 127-128</a>
			</p>
		</>
	);
}