import React from 'react'
import { Link } from "react-router-dom";
import "./MmCard.scss"
import WaButton from '../waButton/WaButton';

function MmCard ({midman}) {


  const message = "Halo, Saya ingin menggunakan Jasa MIddleman Untuk bertransaksi di Pasar Game"

  return (
    <div className='MmCard'>
      <h2>{midman.name}</h2>
      <img src="/img/noavatar.jpg" alt="mm" />
      <div className="info">
        <div className="Whatsapp">
          <WaButton phoneNumber={midman.whatsapp} message={message}/>
        </div>
      </div>
    </div>
  )
}

export default MmCard;