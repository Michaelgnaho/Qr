// import React from "react";
// import { useParams } from "react-router-dom";
// import { users } from "./data";
// import { motion, AnimatePresence } from "framer-motion";

// import {
//   FaInstagram,
//   FaLinkedin,
//   FaFacebook,
//   FaTwitter,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaGlobe,
//   FaGithub,
//   FaShare,
//   FaSave,
//   FaTiktok,
// } from "react-icons/fa";

// const BusinessCard = () => {
//   const { username } = useParams();
//   const userData = users[username];

//   if (!userData) {
//     return <div className="text-center p-8">User not found</div>;
//   }

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: userData.name,
//           text: `Check out ${userData.name}'s business card`,
//           url: window.location.href,
//         });
//       } catch (error) {
//         console.error("Error sharing:", error);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert("Link copied to clipboard!");
//     }
//   };

//   const handleSave = async () => {
//     const displayName = `${userData.name} - ${userData.nickname}`;

//     // Create a formatted string of social media URLs
//     const socialUrls = Object.entries(userData.social)
//       .filter(([_, value]) => value) // Filter out empty values
//       .map(([_, value]) => value)
//       .join("\n");

//     // Create a formatted string of professions
//     const professionsStr = Array.isArray(userData.professions)
//       ? userData.professions.join(", ")
//       : "";

//     // Create a formatted string of companies
//     const companiesStr = Array.isArray(userData.companies)
//       ? userData.companies.join(", ")
//       : "";

//     try {
//       if ("contacts" in navigator && "ContactsManager" in window) {
//         const props = ["name", "tel", "email", "address", "url"];
//         const supported = await navigator.contacts.getProperties();
//         if (supported.length > 0) {
//           const contact = {
//             name: [displayName],
//             tel: [userData.phone],
//             email: [userData.email],
//             address: [userData.address],
//             url: Object.values(userData.social).filter(Boolean),
//           };

//           await navigator.contacts.select(props);
//           const handles = await navigator.contacts.select(props);
//           await handles[0].setContactInfo(contact);
//           alert("Contact saved successfully!");
//           return;
//         }
//       }

//       // If Contacts API is not supported, fall back to vCard
//       const vCardData = `BEGIN:VCARD
// VERSION:3.0
// FN:${displayName}
// N:${userData.name};;;;
// NICKNAME:${userData.nickname}
// TEL:${userData.phone}
// EMAIL:${userData.email}
// ADR:;;${userData.address}
// NOTE:${userData.summary}\n\nProfessions: ${professionsStr}\nCompanies: ${companiesStr}
// URL:${socialUrls}
// END:VCARD`;

//       const blob = new Blob([vCardData], { type: "text/vcard" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `${displayName}.vcf`);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error saving contact:", error);
//       alert("There was an error saving the contact. Please try again.");
//     }
//   };

//   // Rest of the component remains the same...
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         damping: 20,
//         stiffness: 300,
//       },
//     },
//   };

//   const headerVariants = {
//     hidden: { y: -20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         damping: 15,
//         stiffness: 200,
//       },
//     },
//   };

//   const floatAnimation = {
//     y: [-5, 5],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       repeatType: "reverse",
//       ease: "easeInOut",
//     },
//   };

//   const scaleRotateVariants = {
//     hover: {
//       scale: 1.1,
//       rotate: 360,
//       transition: { duration: 0.5 },
//     },
//   };

//   const buttonVariants = {
//     hover: {
//       scale: 1.05,
//       boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
//       y: -2,
//     },
//     tap: { scale: 0.95 },
//   };

//   const slideInVariants = {
//     hidden: { x: -50, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         damping: 20,
//         stiffness: 300,
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="min-h-screen max-w-screen text-black bg-gray-100 py-3 px-4"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <motion.div
//         className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
//         variants={cardVariants}
//         whileHover={{ scale: 1.02 }}
//         transition={{ type: "spring", stiffness: 400 }}
//       >
//         <div className="p-3">
//           <motion.div className="flex flex-col items-center">
//             <motion.div
//               className="max-w-md w-full mx-auto bg-purple-700 p-8 rounded-lg shadow-lg text-white text-center"
//               variants={headerVariants}
//               animate={{ scale: [0.9, 1], opacity: [0, 1] }}
//               transition={{ duration: 0.5 }}
//             >
//               <motion.img
//                 src={userData.profilePic}
//                 alt={userData.name}
//                 className="w-24 h-24 sm:w-16 sm:h-16 rounded-full mx-auto mb-4"
//                 variants={scaleRotateVariants}
//                 whileHover="hover"
//                 animate={floatAnimation}
//               />
//               <motion.h1
//                 className="text-2xl sm:text-xl font-bold"
//                 variants={slideInVariants}
//               >
//                 {userData.name}
//               </motion.h1>
//               <motion.h2
//                 className="text-xl sm:text-lg"
//                 variants={slideInVariants}
//               >
//                 ({userData.nickname})
//               </motion.h2>

//               <motion.p className="mt-4 flex flex-wrap justify-center gap-1">
//                 {userData.professions.map((profession, index) => (
//                   <motion.span
//                     key={index}
//                     className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm"
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{
//                       scale: 1.1,
//                       backgroundColor: "#7c3aed",
//                       transition: { duration: 0.2 },
//                     }}
//                   >
//                     {profession}
//                   </motion.span>
//                 ))}
//               </motion.p>

//               <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
//                 {[
//                   {
//                     icon: <FaPhone />,
//                     text: "CALL",
//                     href: `tel:${userData.phone}`,
//                   },
//                   {
//                     icon: <FaEnvelope />,
//                     text: "EMAIL",
//                     href: `mailto:${userData.email}`,
//                   },
//                   { icon: <FaSave />, text: "SAVE", onClick: handleSave },
//                   { icon: <FaShare />, text: "SHARE", onClick: handleShare },
//                 ].map((item, index) => (
//                   <motion.button
//                     key={index}
//                     onClick={item.onClick}
//                     className="flex flex-col items-center p-3 rounded-lg bg-purple-600 text-white shadow-md"
//                     variants={buttonVariants}
//                     whileHover="hover"
//                     whileTap="tap"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     <motion.div animate={floatAnimation}>
//                       {item.icon}
//                     </motion.div>
//                     <p className="text-sm font-medium mt-1">{item.text}</p>
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>

//           <AnimatePresence>
//             {[
//               { title: "About Me", content: userData.summary },
//               {
//                 title: "Contact Information",
//                 content: (
//                   <div className="space-y-4">
//                     <motion.div
//                       className="flex items-center space-x-2"
//                       whileHover={{
//                         x: 10,
//                         transition: { type: "spring", stiffness: 300 },
//                       }}
//                     >
//                       <FaPhone className="text-purple-700" />
//                       <a
//                         href={`tel:${userData.phone}`}
//                         className="text-gray-700 hover:underline"
//                       >
//                         Phone: {userData.phone}
//                       </a>
//                     </motion.div>
//                     <hr className="border-gray-200" />
//                     <motion.div
//                       className="flex items-center space-x-2"
//                       whileHover={{
//                         x: 10,
//                         transition: { type: "spring", stiffness: 300 },
//                       }}
//                     >
//                       <FaEnvelope className="text-purple-700" />
//                       <a
//                         href={`mailto:${userData.email}`}
//                         className="text-gray-700 hover:underline"
//                       >
//                         Email: {userData.email}
//                       </a>
//                     </motion.div>
//                     <hr className="border-gray-200" />
//                     <motion.div
//                       className="flex items-center space-x-2"
//                       whileHover={{
//                         x: 10,
//                         transition: { type: "spring", stiffness: 300 },
//                       }}
//                     >
//                       <FaMapMarkerAlt className="text-purple-700" />
//                       <span className="text-gray-700">
//                         Address: {userData.address}
//                       </span>
//                     </motion.div>
//                   </div>
//                 ),
//               },
//               {
//                 title: "Companies & Positions",
//                 content: (
//                   <ul className="mt-2 space-y-3">
//                     {userData.companies.map((company, index) => (
//                       <motion.li
//                         key={index}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         whileHover={{ x: 10, color: "#7c3aed" }}
//                         className="flex items-center space-x-2"
//                       >
//                         <span className="text-purple-600">•</span>
//                         <span className="text-gray-700">{company}</span>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 ),
//               },
//               {
//                 title: "Social Media",
//                 content: (
//                   <div className="flex flex-wrap justify-center space-x-8 gap-2">
//                     {Object.entries(userData.social).map(
//                       ([platform, url], index) => {
//                         if (!url) return null;
//                         const Icon = {
//                           instagram: FaInstagram,
//                           linkedin: FaLinkedin,
//                           facebook: FaFacebook,
//                           twitter: FaTwitter,
//                           tiktok: FaTiktok,
//                           github: FaGithub,
//                           website: FaGlobe,
//                         }[platform];

//                         return (
//                           <motion.a
//                             key={platform}
//                             href={url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             initial={{ opacity: 0, scale: 0 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ delay: index * 0.1 }}
//                             whileHover={{
//                               scale: 1.2,
//                               rotate: 360,
//                               transition: { type: "spring", stiffness: 300 },
//                             }}
//                           >
//                             <Icon
//                               className={`text-3xl ${
//                                 platform === "instagram"
//                                   ? "text-pink-500"
//                                   : platform === "linkedin"
//                                   ? "text-blue-600"
//                                   : platform === "facebook"
//                                   ? "text-blue-500"
//                                   : platform === "twitter"
//                                   ? "text-blue-400"
//                                   : "text-gray-600"
//                               }`}
//                             />
//                           </motion.a>
//                         );
//                       }
//                     )}
//                   </div>
//                 ),
//               },
//             ].map((section, index) => (
//               <motion.div
//                 key={section.title}
//                 className="mt-8"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 + index * 0.1 }}
//               >
//                 <motion.h2
//                   className="text-xl sm:text-lg font-semibold mb-4 text-center text-purple-700"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   {section.title}
//                 </motion.h2>
//                 <hr className="border-gray-300 mb-4" />
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   {section.content}
//                 </motion.div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default BusinessCard;

import React from "react";
import { useParams } from "react-router-dom";
import { users } from "./data";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaShare,
  FaSave,
  FaGlobe,
} from "react-icons/fa";

const BusinessCard = () => {
  const { username } = useParams();
  const userData = users[username];

  if (!userData) {
    return <div className="text-center p-8">User not found</div>;
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: userData.name,
          text: `Check out ${userData.name}'s business card`,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleSave = async () => {
    const displayName = `${userData.name} - ${userData.nickname}`;
    const socialUrls = Object.values(userData.social || {})
      .filter(Boolean)
      .join("\n");
    const professionsStr = (userData.professions || []).join(", ");
    const companiesStr = (userData.companies || []).join(", ");

    try {
      const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${displayName}
NICKNAME:${userData.nickname}
TEL:${userData.phone || ""}
EMAIL:${userData.email || ""}
ADR:;;${userData.address || ""}
NOTE:${userData.summary || ""}
URL:${socialUrls}
END:VCARD`;

      const blob = new Blob([vCardData], { type: "text/vcard" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${displayName}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("There was an error saving the contact.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 py-3 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 text-center">
          <motion.img
            src={userData.profilePic}
            alt={userData.name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <h2 className="text-lg text-gray-600">({userData.nickname})</h2>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {(userData.professions || []).map((profession, index) => (
              <span
                key={index}
                className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
              >
                {profession}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              {
                icon: <FaPhone />,
                text: "Call",
                href: `tel:${userData.phone}`,
              },
              {
                icon: <FaEnvelope />,
                text: "Email",
                href: `mailto:${userData.email}`,
              },
              { icon: <FaSave />, text: "Save", onClick: handleSave },
              { icon: <FaShare />, text: "Share", onClick: handleShare },
            ].map((item, index) => (
              <motion.button
                key={index}
                onClick={item.onClick}
                className="flex items-center justify-center p-3 rounded-lg bg-purple-600 text-white"
              >
                {item.icon}
                <span className="ml-2">{item.text}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <p className="text-gray-600">
            <FaPhone className="inline text-purple-600" />{" "}
            {userData.phone || "N/A"}
          </p>
          <p className="text-gray-600">
            <FaEnvelope className="inline text-purple-600" />{" "}
            {userData.email || "N/A"}
          </p>
          <p className="text-gray-600">
            <FaMapMarkerAlt className="inline text-purple-600" />{" "}
            {userData.address || "N/A"}
          </p>
        </div>

        {userData.companies && userData.companies.length > 0 && (
          <div className="p-4 border-t">
            <h3 className="text-lg font-semibold">Companies</h3>
            <ul>
              {userData.companies.map((company, index) => (
                <li key={index} className="text-gray-600">
                  {company}
                </li>
              ))}
            </ul>
          </div>
        )}

        {userData.social && Object.keys(userData.social).length > 0 && (
          <div className="p-4 border-t">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div className="flex justify-center gap-4 mt-2">
              {Object.entries(userData.social).map(([platform, url], index) => {
                if (!url) return null;
                const Icon =
                  {
                    instagram: FaInstagram,
                    linkedin: FaLinkedin,
                    facebook: FaFacebook,
                    twitter: FaTwitter,
                    github: FaGithub,
                  }[platform.toLowerCase()] || FaGlobe;

                return (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="text-2xl text-purple-600 hover:text-purple-800" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BusinessCard;
