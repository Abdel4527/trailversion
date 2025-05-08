import React from 'react';
import { HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi';
import { HiArrowPathRoundedSquare } from 'react-icons/hi2';

const FeaturesSection = () => {
    return (
        <section className="py-16 px-4 bg-gradient-to-r from-emerald-50 to-green-50">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* Feature 1 */}
                <div className="flex flex-col items-center">
                    <div className="p-6 bg-emerald-100 rounded-full mb-4 shadow-lg">
                        <HiShoppingBag className="text-3xl text-emerald-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        FREE INTERNATIONAL SHIPPING
                    </h4>
                    <p className="text-gray-600 text-sm">
                        On all orders over $100.00
                    </p>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col items-center">
                    <div className="p-6 bg-emerald-100 rounded-full mb-4 shadow-lg">
                        <HiArrowPathRoundedSquare className="text-3xl text-emerald-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        45 DAYS RETURN
                    </h4>
                    <p className="text-gray-600 text-sm">
                        Money back guarantee
                    </p>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col items-center">
                    <div className="p-6 bg-emerald-100 rounded-full mb-4 shadow-lg">
                        <HiOutlineCreditCard className="text-3xl text-emerald-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        SECURE CHECKOUT
                    </h4>
                    <p className="text-gray-600 text-sm">
                        100% secured checkout process
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;