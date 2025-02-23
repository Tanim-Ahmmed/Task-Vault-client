import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="min-h-screen bg-base-100 pt-16">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10" />

        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            Simplify Your Task Management with{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TaskVault
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Organize, track, and complete your tasks effortlessly. Stay productive, collaborate seamlessly, and achieve your goals with ease.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all flex items-center">
                Get Started
              
              </Link>
            </div>
          </div>
        </div>
      </div>
   
    </div>
    );
};

export default Home;