// import Link from 'next/link';
// import logoImg from '../../assets/logo.svg';

export default function FooterAbout({companyTitle}: {companyTitle?: string}) {
	const title = companyTitle || '© Inversiones Belén C.A Rif. J-40535587-5';
	return (
		<>
			{/* <div className='page-footer__logo'>
				<Link href='/'>
					<a>
						<img src={logoImg.src} width={logoImg.width} height={logoImg.height} alt={title} />
					</a>
				</Link>
			</div> */}
			<div className='page-footer__company-info'>
				<p className='title'>{title}</p>
			</div>
			<div className='page-footer__disclaimer'>
				Este sitio web y su contenido se proporcionan «tal cual» y «según
				disponibilidad», sin garantías ni declaraciones de ningún tipo, ya sean
				expresas o implícitas. La información sobre precios y disponibilidad
				está sujeta a cambios sin previo aviso.
			</div>
		</>
	);
}