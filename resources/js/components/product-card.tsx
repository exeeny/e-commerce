import { Product } from "@/types"
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function ProductCard({ product }: { product: Product }) {
    return (<>
        <Card>
            <CardHeader>
                <CardTitle><Link href={route('product.show', product.id)} prefetch>
                    {product.name}
                </Link></CardTitle>
            </CardHeader>
            <CardContent>
                <Link href={route('product.show', product.id)} prefetch>
                    <Tooltip>

                        <TooltipContent>
                            <p>{product.stock} in stock</p>
                        </TooltipContent>
                        <TooltipTrigger>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="mt-2 rounded-md border border-gray-200 dark:border-neutral-700"
                            /></TooltipTrigger></Tooltip>
                </Link>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                </span>
                <Link href={route('add_to_cart')} method='post' data={{ product_id: product.id }}>
                    <Button>
                        Add to cart
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    </>
    )
}

export default ProductCard