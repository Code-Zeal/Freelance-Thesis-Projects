import {IProduct} from 'boundless-api-client';
import clsx from 'clsx';
import {useAppDispatch} from '../../hooks/redux';
import {addItem2Cart} from '../../redux/actions/cart';
import {getProductUrl} from '../../lib/urls';
import ProductListImage from './ProductImage';
import ProductPrice from './ProductPrice';
import {TQuery} from '../../@types/common';
import Link from 'next/link';
import ProductLabels from '../product/Labels';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons/faCartPlus';
import NoImage from '../NoImage';
import {productImgRatio} from '../../lib/imgs';
import {TThumbRatio} from 'boundless-api-client';
import {findSellingPrice} from '../../lib/product';

export default function ProductItem({product, query, categoryId, className}: IProductItemProps) {
	const params = {...query};
	if (categoryId && categoryId !== product.default_category?.category_id) {
		Object.assign(params, {category: categoryId});
	}
	const productUrl = getProductUrl(product, params);
	const sellingPrice = findSellingPrice(product.prices);

	return (
		<li
			className={clsx('products__item', {
				'in-stock': product.in_stock,
				'out-of-stock': !product.in_stock
			}, className)}
			data-id={product.product_id}
			itemScope
			itemType='//schema.org/Product'
		>
			<div className='products__item-wrapper'>
				<ProductImage product={product}
											productUrl={productUrl} />
				<h4 className='products__title'>
					<Link href={productUrl} itemProp='url'>
						<span itemProp='name'>{product.title}</span>
					</Link>
				</h4>

				<div className={'products__offer-row'}>
					<div className='products__offer'>
						{sellingPrice && <ProductPrice price={sellingPrice} />}
					</div>
					<Product2Cart product={product} />
				</div>
			</div>
			<ProductSchemaOrgMarkup product={product} />
		</li>
	);
}

function Product2Cart({product}: {product: IProduct}) {
	const dispatch = useAppDispatch();
	const onAddToCart = () => dispatch(addItem2Cart(product.item_id, 1));

	return (
		<div className={clsx('products__to-cart', {
			'products__to-cart_in-stock': product.in_stock,
			'products__to-cart_out-stock': !product.in_stock,
		})}>
			
		</div>
	);
}

function ProductImage({product, productUrl}: {product: IProduct, productUrl: string}) {
	const img = product.images!.find(({is_default}) => is_default);

	return (
		<Link href={productUrl} className={'products__image'}>
			{img
					? <ProductListImage image={img} alt={img.alt || product.title} />
					: <NoImage ratio={productImgRatio || TThumbRatio['1-1']} />
			}
			<ProductLabels labels={product.labels!} className={'product__labels_small product__labels_column'} />
		</Link>
	);
}

function ProductSchemaOrgMarkup({product}: {product: IProduct}) {
	const schemaAvailability = product.in_stock ? '//schema.org/InStock' : '//schema.org/OutOfStock';
	const sellingPrice = findSellingPrice(product.prices);

	return (
		<>
			<meta itemProp='productID' content={String(product.product_id)} />
			<meta itemProp='brand' content={product.manufacturer?.title || ''} />
			<meta itemProp='sku' content={product.sku || ''} />
			{sellingPrice &&
				(sellingPrice?.min
						?
						<div itemProp='offers' itemScope itemType='//schema.org/AggregateOffer'>
							<meta itemProp='lowPrice' content={String(sellingPrice.min)} />
							<meta itemProp='highPrice' content={String(sellingPrice.max)} />
							<meta itemProp='priceCurrency' content={sellingPrice.currency_alias?.toUpperCase()} />
							<link itemProp='availability' href={schemaAvailability} />
						</div>
						:
						<div itemProp='offers' itemScope itemType='//schema.org/Offer'>
							<meta itemProp='price' content={String(sellingPrice.value)} />
							<meta itemProp='priceCurrency' content={sellingPrice.currency_alias?.toUpperCase()} />
							<link itemProp='availability' href={schemaAvailability} />
						</div>
				)
			}
		</>
	);
}

interface IProductItemProps {
	product: IProduct;
	query: TQuery;
	categoryId?: number;
	className?: string;
}