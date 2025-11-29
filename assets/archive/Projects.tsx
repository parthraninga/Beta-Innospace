import { useTheme } from '../contexts/ThemeContext';

const Projects = () => {
  const { theme } = useTheme();

  const projects = [
    { id: 1, title: "Modern Living Room", category: "Residential", description: "Contemporary design with clean lines and natural materials." },
    { id: 2, title: "Executive Office", category: "Commercial", description: "Professional workspace with modern amenities and ergonomic design." },
    { id: 3, title: "Luxury Bedroom", category: "Residential", description: "Elegant bedroom suite with premium finishes and custom furniture." },
    { id: 4, title: "Restaurant Interior", category: "Commercial", description: "Vibrant dining space with unique lighting and comfortable seating." },
    { id: 5, title: "Home Library", category: "Residential", description: "Cozy reading space with built-in shelving and warm lighting." },
    { id: 6, title: "Corporate Lobby", category: "Commercial", description: "Impressive entrance with modern art and sophisticated design elements." }
  ];

  return (
    <div className={`min-h-screen py-20 ${
      theme === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold mb-6 ${
            theme === 'dark' 
              ? 'text-amber-50' 
              : 'text-gray-900'
          }`}>
            Our <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' 
              ? 'text-amber-100' 
              : 'text-gray-600'
          }`}>
            Explore our portfolio of completed interior design projects showcasing innovation, creativity, and exceptional craftsmanship
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Residential', 'Commercial'].map((filter) => (
            <button
              key={filter}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700 text-amber-200 hover:text-amber-100 border border-gray-700 hover:border-amber-300/50'
                  : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-300 shadow-sm'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 hover:border-amber-300/30' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Project Image Placeholder */}
              <div className={`h-56 relative overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-gray-700' 
                  : 'bg-gray-200'
              }`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`text-center ${
                    theme === 'dark' 
                      ? 'text-gray-400' 
                      : 'text-gray-500'
                  }`}>
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">P{project.id}</span>
                    </div>
                    <span className="text-sm">Project Image</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
                    theme === 'dark'
                      ? 'bg-amber-900/30 text-amber-300'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {project.category}
                  </span>
                </div>
                
                <h3 className={`font-bold text-xl mb-3 group-hover:text-amber-400 transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-amber-50' 
                    : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                
                <p className={`text-sm leading-relaxed mb-6 ${
                  theme === 'dark' 
                    ? 'text-gray-300' 
                    : 'text-gray-600'
                }`}>
                  {project.description}
                </p>
                
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-amber-200 hover:text-amber-100 border border-gray-600 hover:border-amber-300/50' 
                    : 'bg-gray-800 hover:bg-gray-700 text-amber-100 hover:text-amber-50 border border-gray-700'
                }`}>
                  View Project Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
            theme === 'dark'
              ? 'bg-amber-600 hover:bg-amber-700 text-gray-900'
              : 'bg-gray-800 hover:bg-gray-700 text-amber-100'
          }`}>
            Load More Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;