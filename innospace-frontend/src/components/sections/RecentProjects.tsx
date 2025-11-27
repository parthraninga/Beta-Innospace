const RecentProjects = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our latest completed interior design projects showcasing our expertise 
            across different spaces and styles.
          </p>
        </div>
        {/* TODO: Add recent projects grid */}
      </div>
    </section>
  );
};

export default RecentProjects;