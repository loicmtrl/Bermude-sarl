import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductPrice from './product-price';
import { Product } from '@/types';
import Rating from './rating';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-0'>
        <Link href={`/product/${product.slug}`} className='block w-full'>
          <div className='relative w-full aspect-[4/5] overflow-hidden rounded-md bg-secondary'>
            <Image
              src={
                product.images?.[0] ?? '/images/sample-products/placeholder.png'
              }
              alt={product.name}
              fill
              sizes='(min-width: 1024px) 250px, (min-width: 768px) 220px, 100vw'
              priority={true}
              className='object-cover'
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className='p-4 grid gap-4'>
        <div className='text-xs'>{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className='text-sm font-medium'>{product.name}</h2>
        </Link>
        <div className='flex-between gap-4'>
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-destructive'>En rupture de stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
