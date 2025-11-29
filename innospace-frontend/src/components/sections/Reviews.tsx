const Reviews = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-green-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-50 mb-6">
            Customer <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Reviews</span>
          </h2>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto">
            See what our satisfied clients have to say about their interior design experience with us.
          </p>
        </div>
        {/* TODO: Add customer reviews carousel */}
      </div>
    </section>
  );
};

export default Reviews;