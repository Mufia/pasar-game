import React from 'react';

const WaIcon = ({ phoneNumber, message, }) => {
  const handleClick = () => {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    
    <img src="/img/whatsapp.png" alt="" onClick={handleClick} />
  );
};

export default WaIcon;