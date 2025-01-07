import React from 'react'; 
import { useParams } from 'react-router-dom';
import { users } from './data';
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const BusinessCard = () => {
  const { username } = useParams();
  const userData = users[username];

  if (!userData) {
    return <div className="text-center p-8">User not found</div>;
  }

  return ( <>
    <div className="min-h-screen text-black bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center">
            <div className="max-w-md mx-auto bg-purple-700 p-8 rounded-lg shadow-lg text-white text-center items-center justify-center">
              <img src={userData.profilePic} alt={userData.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h1 className="text-2xl font-bold">{userData.name}</h1> 
              <h2 className="text-xl">({userData.nickname})</h2>
              <p className="mt-4">
                {userData.professions.map((profession, index) => (
                  <span
                    key={index}
                    className="text-white px-3 py-1 rounded-full text-sm"
                  >
                    {profession}
                  </span>
                ))}
              </p>
              <div className="mt-8 flex justify-around">
                <div className="flex">
                  <FaPhone className="text-white-600 m-2" />
                  <p className='pt-1'>CALL</p>
                </div>
                <div className="flex">
                  <FaEnvelope className="text-white-600 m-2" />
                  <p className='pt-1'>EMAIL</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-center text-purple-700">About Me</h2>
            <hr className="border-gray-300 mb-4" />
            <p className='text-gray-700 text-center text-lg'>
              {userData.summary}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-center text-purple-700">Contact Information</h2>
            <hr className="border-gray-300 mb-4" />
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FaPhone className=" text-purple-700" />
                <a href={`tel:${userData.phone}`} className="text-gray-700 hover:underline">
                  {userData.phone}
                </a>
              </div>
              <hr className="border-gray-200" />
              <div className="flex items-center space-x-2">
                <FaEnvelope className=" text-purple-700" />
                <a href={`mailto:${userData.email}`} className="text-gray-700 hover:underline">
                  {userData.email}
                </a>
              </div>
              <hr className="border-gray-200" />
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className=" text-purple-700" />
                <span className="text-gray-700">{userData.address}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-center text-purple-700">Companies & Positions</h2>
            <hr className="border-gray-300 mb-4" />
            <ul className="mt-2 space-y-3">
              {userData.companies.map((company, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-purple-600">•</span>
                  <span className="text-gray-700">{company}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-center text-purple-700">Expertise</h2>
            <hr className="border-gray-300 mb-4" />
            <div className="mt-2 flex flex-wrap gap-2 justify-center">
              {userData.professions.map((profession, index) => (
                <span
                  key={index}
                  className="bg-purple-100 px-4 py-2 rounded-full text-sm text-purple-700 font-medium"
                >
                  {profession}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-center text-purple-700">Social Media</h2>
            <hr className="border-gray-300 mb-4" />
            <div className="flex justify-center space-x-8">
              <a href={userData.social.instagram} target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
                <FaInstagram className="text-3xl text-pink-500 hover:text-pink-600" />
              </a>
              <a href={userData.social.linkedin} target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
                <FaLinkedin className="text-3xl text-blue-600 hover:text-blue-700" />
              </a>
              <a href={userData.social.facebook} target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
                <FaFacebook className="text-3xl text-blue-500 hover:text-blue-600" />
              </a>
              <a href={userData.social.twitter} target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
                <FaTwitter className="text-3xl text-blue-400 hover:text-blue-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default BusinessCard;