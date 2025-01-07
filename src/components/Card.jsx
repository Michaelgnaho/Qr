import React from 'react'
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';


function Card() {
	const ContactInfo = ({ icon, text, label }) => (
		<div className="mb-4">
			<div className="flex items-center mb-2">
				<i className={`${icon} text-gray-500 mr-2`}></i>
				<span className="text-gray-700">{text}</span>
			</div>
			<div className="text-gray-500">{label}</div>
		</div>
	);

	const SocialMediaIcon = ({ href, icon, color }) => (
		<a href={href} className={`${color}`}>
			<i className={`${icon} fa-2x`}></i>
		</a>
	);
  
	return (<>
	
		<div className="max-w-md mx-auto bg-purple-700 p-8 rounded-lg shadow-lg">
			<img src="https://placehold.co/100x100" alt="Profile picture of a person" className="w-24 h-24 rounded-full mx-auto mb-4" />
			<h1 className="text-2xl font-bold">SEN. OLAFARE COMFORT OLADUNNI</h1> <hr></hr>
			<h2 className="text-xl">(TheAdunni)</h2>
			<p className="mt-4">
				Communications Expert,<br />
				Digital Creator, Gender Equality Advocate, Public Speaker, Youth Empowerment Advocate,<br />
				Environmental Advocate,<br />
				Social Media Manager,<br />
				Community Developer
			</p>
			<div className="mt-8 flex justify-around">
				<div className="text-center">
					<i className="fas fa-phone-alt text-2xl"></i>
					<p>CALL</p>
				</div>
				<div className="text-center">
					<i className="fas fa-envelope text-2xl"></i>
					<p>EMAIL</p>
				</div>
			</div>
		</div>

<div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg mt-10">
<div className="mb-4">
	<p className="text-gray-700">
		I empower communities through tailored strategies, youth mentorship, and advocacy; provide professional culinary service through my Dunnies Signature Limited while driving innovation with TheAdunni Media Agency.
	</p>
</div>
<ContactInfo icon="fas fa-phone-alt" label="Mobile" text="07013805937"  />
<ContactInfo icon="fas fa-envelope" text="comfortoladunni0@gmail.com" label="Email" />
<ContactInfo icon="fas fa-briefcase" text="CEO, Dunnies Signature Limited; CEO, Adunni Save A Girl Foundation; Founder, The Adunni Mentorship Hub; Founder, TheAdunni Media Agency" label="Communications Expert, Digital Creator, Gender Equality Advocate, Public Speaker, Youth Empowerment Advocate, Environmental Advocate, Social Media Manager, Community Developer" />
<div className="mt-6">
	<div className="text-gray-700 mb-2">Social Media</div>
	<div className="flex space-x-4">
			  <FaInstagram className="text-2xl text-pink-500 hover:text-pink-600" />
			  <FaLinkedin className="text-2xl text-pink-500 hover:text-pink-600" />
			  <FaFacebook className="text-2xl text-pink-500 hover:text-pink-600" />
			  <FaTwitter className="text-2xl text-pink-500 hover:text-pink-600" />
	</div>
</div>
</div>
		

</>

	);
}

export default Card