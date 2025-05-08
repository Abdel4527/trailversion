import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, loading, error }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="bg-gray-200 animate-pulse h-96 rounded-lg"></div>
                ))}
            </div>
        );
    }

    if (error) {
        const errorMessage = typeof error === 'string' ? error : error.message || 'Something went wrong.';
        return <p className="text-center text-red-500">{errorMessage}</p>;
    }

    if (!loading && products?.length === 0) {
        return <p className="text-center">No products available.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(products || [])
                .filter((product) => product._id) // Ensure product has a valid _id
                .map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`} className="block">
                        <div className="bg-white p-4 rounded-lg">
                            <div className="w-full h-96 mb-4">
                                <img
                                    src={product.images?.[0]?.url || '/placeholder-image.jpg'} // Fallback to placeholder
                                    alt={product.images?.[0]?.altText || product.name || 'Product Image'}
                                    className="w-full h-full object-cover rounded-lg"
                                    draggable={false}
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-700">{product.currency} {product.price}</p>
                        </div>
                    </Link>
                ))}
        </div>
    );
};

export default ProductGrid;