import React from 'react';

const WaButton = ({ phoneNumber, message, }) => {
  const handleClick = () => {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    
    <button onClick={handleClick}>Hubungi</button>
  );
};

export default WaButton;