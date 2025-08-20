import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FantasyCreator from '../components/FantasyCreator/FantasyCreator';
const CreateFantasyPage = () => {
  return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#141414] text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-6">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to home
        </Link>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Create Your Fantasy
          </h1>
          <p className="text-xl text-gray-300 text-center mb-10">
            Design your perfect scenario by customizing every detail of your
            experience.
          </p>
          <FantasyCreator />
        </div>
      </main>
      <Footer />
    </div>;
};
export default CreateFantasyPage;