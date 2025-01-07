import React from 'react'; 
import { useParams } from 'react-router-dom';
import { users } from './data';
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaGithub, FaShare, FaSave } from 'react-icons/fa';

const BusinessCard = () => {
  const { username } = useParams();
  const userData = users[username];

  if (!userData) {
    return <div className="text-center p-8">User not found</div>;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: userData.name,
          text: `Check out ${userData.name}'s business card`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = async () => {
    const displayName = `Scan to know ${username} - ${userData.name}`;
    
    const contact = {
      name: [displayName],
      tel: [userData.phone],
      email: [userData.email],
      address: [userData.address],
      url: Object.values(userData.social)
    };
  
    try {
      if ('contacts' in navigator && 'ContactsManager' in window) {
        const props = ['name', 'tel', 'email', 'address', 'url'];
        const supported = await navigator.contacts.getProperties();
        if (supported.length > 0) {
          await navigator.contacts.select(props);
          const handles = await navigator.contacts.select(props);
          await handles[0].setContactInfo(contact);
          alert('Contact saved successfully!');
          return;
        }
      }
      throw new Error('Contact API not supported');
    } catch (error) {
      const vCardData = `BEGIN:VCARD
  VERSION:3.0
  N:${displayName};;;;
  FN:${displayName}
  TEL:${userData.phone}
  EMAIL:${userData.email}
  ADR:;;${userData.address}
  URL:${userData.social.website}
  NOTE:${userData.summary}
  END:VCARD`;
  
      const blob = new Blob([vCardData], { type: 'text/vcard' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${displayName}.vcf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen max-w-screen text-black bg-gray-100 py-3 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-3">
          <div className="flex flex-col items-center">
            <div className="max-w-md w-full mx-auto bg-purple-700 p-8 rounded-lg shadow-lg text-white text-center">
              <img src={userData.profilePic} alt={userData.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h1 className="text-2xl font-bold">{userData.name}</h1> 
              <h2 className="text-xl">({userData.nickname})</h2>
              <p className="mt-4 flex flex-wrap justify-center  gap-1">
                {userData.professions.map((profession, index) => (
                  <span
                    key={index}
                    className="bg-purple-600 text-white px-1 py-1 rounded-full text-sm"
                  >
                    {profession}
                  </span>
                ))}
              </p>
              
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
                <a 
                  href={`tel:${userData.phone}`} 
                  className="flex flex-col items-center p-3 rounded-lg bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                >
                  <FaPhone className="text-white text-xl mb-1" />
                  <p className="text-white text-sm font-medium">CALL</p>
                </a>
                <a 
                  href={`mailto:${userData.email}`} 
                  className="flex flex-col items-center p-3 rounded-lg bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                >
                  <FaEnvelope className="text-white text-xl mb-1" />
                  <p className="text-white text-sm font-medium">EMAIL</p>
                </a>
                <button 
                  onClick={handleSave} 
                  className="flex flex-col items-center p-3 rounded-lg bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                >
                  <FaSave className="text-white text-xl mb-1" />
                  <p className="text-white text-sm font-medium">SAVE</p>
                </button>
                <button 
                  onClick={handleShare} 
                  className="flex flex-col items-center p-3 rounded-lg bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                >
                  <FaShare className="text-white text-xl mb-1" />
                  <p className="text-white text-sm font-medium">SHARE</p>
                </button>
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
                <FaPhone className="text-purple-700" />
                <a href={`tel:${userData.phone}`} className="text-gray-700 hover:underline">
                  Phone: {userData.phone}
                </a>
              </div>
              <hr className="border-gray-200" />
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-purple-700" />
                <a href={`mailto:${userData.email}`} className="text-gray-700 hover:underline">
                  Email: {userData.email}
                </a>
              </div>
              <hr className="border-gray-200" />
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-purple-700" />
                <span className="text-gray-700">Address: {userData.address}</span>
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
              <a href={userData.social.github} target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
                <FaGithub className="text-3xl text-blue-400 hover:text-blue-500" />

              </a>
              <a href={userData.social.website} target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-transform">
                <FaGlobe className="text-3xl text-blue-400 hover:text-blue-500" />
                
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default BusinessCard;