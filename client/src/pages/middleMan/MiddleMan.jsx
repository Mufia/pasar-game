import React from 'react'
import "./MiddleMan.scss"
import Mmcard from "../../components/mmCard/MmCard";
import { midman } from "../../data";

const MiddleMan = () => {

  return (
    <div className='midman'>
      <div className="container">
        <div className="cards">
          {midman.map((midman) => (
            <Mmcard key={midman.id} midman={midman}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MiddleMan