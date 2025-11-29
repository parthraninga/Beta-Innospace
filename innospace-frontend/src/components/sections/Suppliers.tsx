const Suppliers = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-50 mb-6">
            Our Global <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">Suppliers</span>
          </h2>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto">
            We partner with the best global suppliers to bring you premium quality materials and furnishings.
          </p>
        </div>
        {/* TODO: Add suppliers logo grid */}
      </div>
    </section>
  );
};

export default Suppliers;