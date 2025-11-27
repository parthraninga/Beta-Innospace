import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { category } = useParams();
  
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 capitalize">
            {category?.replace('-', ' ')} Designs
          </h1>
          <p className="text-lg text-gray-600">Browse our {category} interior design collection</p>
        </div>
        {/* TODO: Add category-specific design grid */}
      </div>
    </div>
  );
};

export default CategoryPage;