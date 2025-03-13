
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { users } from "./data";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaGithub,
  FaShare,
  FaSave,
  FaTiktok,
} from "react-icons/fa";

const BusinessCard = () => {
  const { username } = useParams();
  const userData = users[username];
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  if (!userData) {
    return <div className="text-center p-8">User not found</div>;
  }

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: userData.name,
      text: `Check out ${userData.name}'s business card`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showNotification("Shared successfully!");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showNotification("Link copied to clipboard!");
      } else {
        const tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.value = window.location.href;
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showNotification("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      showNotification("Unable to share. Please try again.");
    }
  };

  const handleCall = (phoneNumber) => {
    try {
      // Format phone number to ensure it works on mobile
      const formattedPhone = phoneNumber.replace(/\D/g, "");
      window.location.href = `tel:${formattedPhone}`;
    } catch (error) {
      console.error("Error making call:", error);
      showNotification("Unable to initiate call. Please try manually.");
    }
  };

  const handleEmail = (email) => {
    try {
      // Add subject and body to make email more informative
      const subject = encodeURIComponent(
        `Contact from ${userData.name}'s Business Card`
      );
      const body = encodeURIComponent(
        `Hi ${userData.name},\n\nI found your business card and would like to connect with you.\n\nBest regards,`
      );
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    } catch (error) {
      console.error("Error sending email:", error);
      showNotification("Unable to open email client. Please try manually.");
    }
  };

  const handleSave = async () => {
    const displayName = `${userData.name}${
      userData.nickname ? ` (${userData.nickname})` : ""
    }`;

    try {
      // Try modern Contacts API first
      if ("contacts" in navigator && "ContactsManager" in window) {
        const props = ["name", "tel", "email", "address", "url"];
        const supported = await navigator.contacts.getProperties();

        if (supported.length > 0) {
          const contact = {
            name: [displayName],
            tel: [userData.phone],
            email: [userData.email],
            address: [userData.address],
            url: Object.values(userData.social).filter(Boolean),
          };

          const handles = await navigator.contacts.select(props);
          await handles[0].setContactInfo(contact);
          showNotification("Contact saved successfully!");
          return;
        }
      }

      // Fallback to vCard download
      const vCard = generateVCard(userData, displayName);
      const blob = new Blob([vCard], { type: "text/vcard" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${displayName.replace(/[^a-z0-9]/gi, "_")}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showNotification("Contact file downloaded!");
    } catch (error) {
      console.error("Error saving contact:", error);
      showNotification("Unable to save contact. Please try again.");
    }
  };

  const generateVCard = (userData, displayName) => {
    const social = Object.entries(userData.social)
      .filter(([, value]) => value)
      .map(([platform, value]) => `X-SOCIALPROFILE;TYPE=${platform}:${value}`)
      .join("\n");

    return `BEGIN:VCARD
VERSION:3.0
FN:${displayName}
N:${userData.name.split(" ").reverse().join(";")};;;
${userData.nickname ? `NICKNAME:${userData.nickname}\n` : ""}
TEL;TYPE=CELL:${userData.phone}
EMAIL;TYPE=WORK:${userData.email}
ADR;TYPE=WORK:;;${userData.address}
NOTE:${userData.summary}\n${userData.professions.join(
      ", "
    )}\n${userData.companies.join(", ")}
${social}
END:VCARD`;
  };

  const actionButtons = [
    {
      icon: <FaPhone />,
      text: "CALL",
      action: () => handleCall(userData.phone),
    },
    {
      icon: <FaEnvelope />,
      text: "EMAIL",
      action: () => handleEmail(userData.email),
    },
    {
      icon: <FaSave />,
      text: "SAVE",
      action: handleSave,
    },
    {
      icon: <FaShare />,
      text: "SHARE",
      action: handleShare,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
  };

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
      },
    },
  };

  const floatAnimation = {
    y: [-5, 5],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  const scaleRotateVariants = {
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
      y: -2,
    },
    tap: { scale: 0.95 },
  };

  const slideInVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen max-w-screen text-black bg-gray-100 py-3 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="p-3">
          {/* Header Section */}
          <motion.div className="flex flex-col items-center">
            <motion.div
              className="max-w-md w-full mx-auto bg-purple-700 p-8 rounded-lg shadow-lg text-white text-center"
              variants={headerVariants}
              animate={{ scale: [0.9, 1], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
            >
              {/* Profile Image */}
              <motion.img
                src={userData.profilePic}
                alt={userData.name}
                className="w-24 h-24 sm:w-16 sm:h-16 rounded-full mx-auto mb-4"
                variants={scaleRotateVariants}
                whileHover="hover"
                animate={floatAnimation}
              />

              {/* Name and Nickname */}
              <motion.h1
                className="text-2xl sm:text-xl font-bold"
                variants={slideInVariants}
              >
                {userData.name}
              </motion.h1>
              <motion.h2
                className="text-xl sm:text-lg"
                variants={slideInVariants}
              >
                ({userData.nickname})
              </motion.h2>

              {/* Professions */}
              <motion.p className="mt-4 flex flex-wrap justify-center gap-1">
                {userData.professions.map((profession, index) => (
                  <motion.span
                    key={index}
                    className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "#7c3aed",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {profession}
                  </motion.span>
                ))}
              </motion.p>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
                {actionButtons.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={item.action}
                    className="flex flex-col items-center p-3 rounded-lg bg-purple-600 text-white shadow-md"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div animate={floatAnimation}>
                      {item.icon}
                    </motion.div>
                    <p className="text-sm font-medium mt-1">{item.text}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
          {/* Content Sections */}
          <AnimatePresence>
            {[
              {
                title: "About Me",
                content: userData.summary,
              },
              {
                title: "Contact Information",
                content: (
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{
                        x: 10,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                    >
                      <FaPhone className="text-purple-700" />
                      <a
                        href={`tel:${userData.phone}`}
                        className="text-gray-700 hover:underline"
                      >
                        Phone: {userData.phone}
                      </a>
                    </motion.div>
                    <hr className="border-gray-200" />
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{
                        x: 10,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                    >
                      <FaEnvelope className="text-purple-700" />
                      <a
                        href={`mailto:${userData.email}`}
                        className="text-gray-700 hover:underline"
                      >
                        Email: {userData.email}
                      </a>
                    </motion.div>
                    <hr className="border-gray-200" />
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{
                        x: 10,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                    >
                      <FaMapMarkerAlt className="text-purple-700" />
                      <span className="text-gray-700">
                        Address: {userData.address}
                      </span>
                    </motion.div>
                  </div>
                ),
              },
              {
                title: "Companies & Positions",
                content: (
                  <ul className="mt-2 space-y-3">
                    {userData.companies.map((company, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10, color: "#7c3aed" }}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-purple-600">•</span>
                        <span className="text-gray-700">{company}</span>
                      </motion.li>
                    ))}
                  </ul>
                ),
              },
              {
                title: "Social Media",
                content: (
                  <div className="flex flex-wrap justify-center space-x-8 gap-2">
                    {Object.entries(userData.social).map(
                      ([platform, url], index) => {
                        if (!url) return null;
                        const Icon = {
                          instagram: FaInstagram,
                          linkedin: FaLinkedin,
                          facebook: FaFacebook,
                          twitter: FaTwitter,
                          tiktok: FaTiktok,
                          github: FaGithub,
                          website: FaGlobe,
                        }[platform];

                        return (
                          <motion.a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{
                              scale: 1.2,
                              rotate: 360,
                              transition: { type: "spring", stiffness: 300 },
                            }}
                          >
                            <Icon
                              className={`text-3xl ${
                                platform === "instagram"
                                  ? "text-pink-500"
                                  : platform === "linkedin"
                                  ? "text-blue-600"
                                  : platform === "facebook"
                                  ? "text-blue-500"
                                  : platform === "twitter"
                                  ? "text-blue-400"
                                  : "text-gray-600"
                              }`}
                            />
                          </motion.a>
                        );
                      }
                    )}
                  </div>
                ),
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <motion.h2
                  className="text-xl sm:text-lg font-semibold mb-4 text-center text-purple-700"
                  whileHover={{ scale: 1.05 }}
                >
                  {section.title}
                </motion.h2>
                <hr className="border-gray-300 mb-4" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {section.content}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BusinessCard;
