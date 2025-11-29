const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-50 mb-6">About Innospace</h1>
          <p className="text-xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
            We innovate every corner of your space with creative interior design solutions 
            that blend functionality with aesthetic appeal, transforming houses into homes 
            and offices into inspiring workspaces.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-50 mb-6">Our Story</h2>
              <div className="space-y-4 text-amber-100 leading-relaxed">
                <p>
                  Founded with a passion for transforming spaces, Innospace began as a vision to make 
                  exceptional interior design accessible to everyone. Our journey started with a simple 
                  belief that every space has the potential to inspire and elevate the lives of those who inhabit it.
                </p>
                <p>
                  Over the years, we have grown from a small team of dedicated designers to a comprehensive 
                  interior design studio, serving clients across residential and commercial projects. Our 
                  commitment to innovation, quality, and personalized service has made us a trusted name 
                  in the industry.
                </p>
                <p>
                  Today, we continue to push the boundaries of design, incorporating the latest trends 
                  while honoring timeless principles of functionality and beauty.
                </p>
              </div>
            </div>
            <div className="bg-gray-800 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center text-amber-200">
                <div className="w-24 h-24 bg-amber-400 rounded-full mx-auto mb-4"></div>
                <p>Our Story Image</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-amber-50 mb-4">Our Mission</h3>
              <p className="text-amber-100 leading-relaxed">
                To create exceptional interior spaces that enhance the quality of life for our clients 
                by combining innovative design concepts with practical functionality, sustainable practices, 
                and personalized attention to detail.
              </p>
            </div>
            <div className="bg-green-900/50 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold text-amber-50 mb-4">Our Vision</h3>
              <p className="text-amber-100 leading-relaxed">
                To be the leading interior design studio recognized for transforming spaces into 
                inspiring environments that reflect our clients' personalities while promoting 
                wellness, productivity, and joy in everyday living.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide every project and interaction we have with our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">
                Constantly exploring new design trends and technologies to create cutting-edge solutions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Passion</h4>
              <p className="text-gray-600 text-sm">
                Bringing enthusiasm and creativity to every project, no matter the size or scope.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality</h4>
              <p className="text-gray-600 text-sm">
                Maintaining the highest standards in materials, craftsmanship, and client service.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Collaboration</h4>
              <p className="text-gray-600 text-sm">
                Working closely with clients to ensure their vision becomes reality.
              </p>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive interior design services cover every aspect of creating beautiful, functional spaces.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Residential Design</h4>
              <p className="text-gray-600 mb-4">
                Transform your home with personalized interior design solutions that reflect your lifestyle and preferences.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Living rooms & bedrooms</li>
                <li>• Kitchens & bathrooms</li>
                <li>• Home offices & studies</li>
                <li>• Outdoor spaces</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Commercial Design</h4>
              <p className="text-gray-600 mb-4">
                Create inspiring work environments that enhance productivity and reflect your brand identity.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Office spaces</li>
                <li>• Retail stores</li>
                <li>• Restaurants & cafes</li>
                <li>• Hotels & hospitality</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Consultation Services</h4>
              <p className="text-gray-600 mb-4">
                Expert advice and guidance to help you make informed decisions about your space.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Design consultation</li>
                <li>• Space planning</li>
                <li>• Color schemes</li>
                <li>• Furniture selection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Innospace?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We combine creativity, expertise, and personalized service to deliver exceptional results.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Personalized Approach</h4>
                    <p className="text-gray-600">Every project is unique. We take the time to understand your needs, preferences, and lifestyle.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h4>
                    <p className="text-gray-600">Our skilled designers bring years of experience and fresh perspectives to every project.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality Materials</h4>
                    <p className="text-gray-600">We source premium materials and work with trusted suppliers to ensure lasting beauty.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Timely Delivery</h4>
                    <p className="text-gray-600">We respect your schedule and work efficiently to complete projects on time and within budget.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">5</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Ongoing Support</h4>
                    <p className="text-gray-600">Our relationship doesn't end at project completion. We provide continued support and maintenance advice.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">6</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Transparent Pricing</h4>
                    <p className="text-gray-600">No hidden costs or surprises. We provide clear, detailed quotes and keep you informed throughout.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's work together to create the interior of your dreams. Contact us today for a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Free Consultation
            </button>
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              View Our Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;