import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetails = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, similarProducts, loading, error } = useSelector((state) => state.products);
    const { user, guestId } = useSelector((state) => state.auth);

    const [mainImage, setMainImage] = useState(null); // Initialize as null
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const productFetchId = productId || id;

    useEffect(() => {
        if (productFetchId && /^[a-fA-F0-9]{24}$/.test(productFetchId)) { // Validate ObjectId format
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts(productFetchId));
        } else {
            console.error('Invalid product ID:', productFetchId);
        }
    }, [productFetchId, dispatch]);

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url); // Set the first image as the main image
        } else {
            setMainImage(null); // Set to null if no images are available
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action) => {
        if (action === 'plus') setQuantity((prev) => prev + 1);
        if (action === 'minus' && quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error('Please select size and color before adding to cart.', {
                duration: 1000,
            });
            return;
        }
        setIsButtonDisabled(true);

        dispatch(
            addToCart({
                productId: productFetchId,
                quantity,
                size: selectedSize,
                color: selectedColor,
                guestId: guestId,
                userId: user?._id,
            })
        )
            .then(() => {
                toast.success('Product added to cart successfully!', {
                    duration: 1000,
                });
            })
            .finally(() => {
                setIsButtonDisabled(false);
            });
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    if (error) {
        return <div className="flex items-center justify-center h-screen">{error}</div>;
    }

    return (
        <div className="p-6">
            {selectedProduct && (
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Thumbnail */}
                        <div className="hidden md:flex flex-col space-y-4">
                            {selectedProduct.images?.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url || null}
                                    alt={image.altText || "Product Image"}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                                        mainImage === image.url ? "border-emerald-500" : "border-gray-300"
                                    } transition-all duration-300`}
                                    onClick={() => setMainImage(image.url)}
                                />
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="md:w-1/2">
                            <div className="mb-6">
                                {mainImage ? (
                                    <img
                                        src={mainImage}
                                        alt="Main Product"
                                        className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-500 hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
                                        <p className="text-gray-500">No Image Available</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="md:w-1/2">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {selectedProduct.name}
                            </h1>
                            <p className="text-lg text-gray-500 mb-2 line-through">
                                {selectedProduct.originalPrice && `$${selectedProduct.originalPrice}`}
                            </p>
                            <p className="text-2xl text-emerald-600 font-semibold mb-4">
                                {selectedProduct.currency} {selectedProduct.price}
                            </p>
                            <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

                            {/* Gender */}
                            <div className="mb-4">
                                <p className="text-gray-700 font-medium">Gender:</p>
                                <span
                                    className={`inline-block px-4 py-2 rounded-full text-white ${
                                        selectedProduct.gender === "Men"
                                            ? "bg-blue-500"
                                            : selectedProduct.gender === "Women"
                                            ? "bg-pink-500"
                                            : "bg-gray-500"
                                    }`}
                                >
                                    {selectedProduct.gender}
                                </span>
                            </div>

                            {/* Category */}
                            <div className="mb-4">
                                <p className="text-gray-700 font-medium">Category:</p>
                                <span className="inline-block px-4 py-2 rounded-full bg-gray-200 text-gray-800">
                                    {selectedProduct.category}
                                </span>
                            </div>

                            {/* Colors */}
                            <div className="mb-4">
                                <p className="text-gray-700 font-medium">Color:</p>
                                <div className="flex gap-2 mt-2">
                                    {selectedProduct.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full border ${
                                                selectedColor === color
                                                    ? "border-emerald-500 border-4"
                                                    : "border-gray-300"
                                            }`}
                                            style={{
                                                backgroundColor: color.toLowerCase(),
                                            }}
                                        ></button>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="mb-4">
                                <p className="text-gray-700 font-medium">Size:</p>
                                <div className="flex gap-2 mt-2">
                                    {selectedProduct.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded border ${
                                                selectedSize === size
                                                    ? "bg-emerald-500 text-white"
                                                    : "bg-gray-200 text-gray-800"
                                            } transition-all duration-300`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-6">
                                <p className="text-gray-700 font-medium">Quantity:</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <button
                                        className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300"
                                        onClick={() => handleQuantityChange("minus")}
                                    >
                                        -
                                    </button>
                                    <span className="text-lg">{quantity}</span>
                                    <button
                                        className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300"
                                        onClick={() => handleQuantityChange("plus")}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isButtonDisabled}
                                className={`w-full py-3 rounded-lg text-white font-semibold ${
                                    isButtonDisabled
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-emerald-500 hover:bg-emerald-600"
                                } transition-all duration-300`}
                            >
                                {isButtonDisabled ? "Adding..." : "Add to Cart"}
                            </button>

                            {/* Characteristics */}
                            <div className="mt-10">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Characteristics:
                                </h3>
                                <table className="w-full text-left text-sm text-gray-600">
                                    <tbody>
                                        <tr>
                                            <td className="py-2 font-medium">Brand:</td>
                                            <td className="py-2">{selectedProduct.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 font-medium">Material:</td>
                                            <td className="py-2">{selectedProduct.material}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Similar Products */}
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                            You may also like
                        </h2>
                        <ProductGrid products={similarProducts} loading={loading} error={error} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;