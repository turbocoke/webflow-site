import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LanderCard from '../components/LanderCard';
import { mockLanders } from '../data/mockData';
import { MicIcon, SparklesIcon } from 'lucide-react';
const LandingPage = () => {
  return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#141414] text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Chat with Famous Voices</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience unique conversations with your favorite celebrities using
            our advanced Gabber voice technology. Choose from our pre-made
            scenarios or create your own fantasy.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center bg-[#65e8a4] bg-opacity-20 rounded-lg px-4 py-2">
              <MicIcon className="w-5 h-5 mr-2 text-[#65e8a4]" />
              <span>Authentic Voice Cloning</span>
            </div>
            <div className="flex items-center bg-[#65e8a4] bg-opacity-20 rounded-lg px-4 py-2">
              <SparklesIcon className="w-5 h-5 mr-2 text-[#65e8a4]" />
              <span>Endless Scenarios</span>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Chat Landers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockLanders.map(lander => <Link to={`/lander/${lander.id}`} key={lander.id}>
                <LanderCard lander={lander} />
              </Link>)}
          </div>
        </section>
        <section className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Create Your Own Fantasy</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose any voice and customize the perfect scenario to create your
            unique experience.
          </p>
          <Link to="/create-fantasy">
            <button className="bg-gradient-to-r from-[#65e8a4] to-[#41966a] hover:from-[#41966a] hover:to-[#41966a] text-black font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>;
};
export default LandingPage;