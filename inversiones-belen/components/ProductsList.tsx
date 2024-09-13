import {IProduct} from 'boundless-api-client';
import {TQuery} from '../@types/common';
import ProductItem from './productsList/ProductItem';
import clsx from 'clsx';
import {useEffect, useState} from 'react';

export default function ProductsList({products, query = {}, categoryId, className, itemClassName,secondCategoryId}: IProductListProps) {
  const [productos, setProductos] = useState<IProduct[]>([]);
  useEffect(() => {
    if(categoryId && products){
      
      const result = products.filter((el)=>{
        if(el.default_category?.category_id === 115){
          el.default_category.category_id = 117;
        }
        
        return el.default_category?.category_id === categoryId || el.default_category?.category_id === secondCategoryId;
      });
      setProductos(result);
    }else{
      setProductos(products);
    }
  }, [products]);
	return (
		<ul className={clsx('products list-unstyled', className)}>
			{productos.map(product => (
				<ProductItem
					product={product}
					key={product.product_id}
					query={query}
					categoryId={categoryId}
					className={itemClassName}
				/>
			))}
		</ul>
	);
}

interface IProductListProps {
	products: IProduct[];
	query?: TQuery;
	categoryId?: number;
  secondCategoryId?:number;
	className?: string;
	itemClassName?: string;
}