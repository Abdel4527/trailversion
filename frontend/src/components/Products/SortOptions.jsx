import React from 'react';
import { useSearchParams } from 'react-router-dom';


const SortOptions = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    

    const handleSortChange = (e) => {
        const sortBy = e.target.value;
        searchParams.set('sortBy', sortBy);
        setSearchParams(searchParams);
    };

    return (
        <div className='mb-4 flex items-center justify-end'>
            <label htmlFor='sort' className='mr-2 text-gray-700 font-medium'>Sort by:</label>

            <select 
                id='sort' 
                onChange={handleSortChange}
                value={searchParams.get('sortBy') || ''}
                className='border border-gray-300 rounded-md p-2'
            >
                <option value=''>Default</option>
                <option value='priceAsc'>Price: Low to High</option>
                <option value='priceDesc'>Price: High to Low</option>
                <option value='popularity'>Popularity</option>
                
            </select>
            
        </div>
    );
};

export default SortOptions;