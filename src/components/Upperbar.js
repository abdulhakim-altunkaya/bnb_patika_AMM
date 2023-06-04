import React from 'react';
import { useNavigate } from 'react-router-dom';

function Upperbar() {
  const navigate = useNavigate();

  return (
    <div className='upperbarDiv'>
      <div className='upperbarLogoDiv'>
        <img src="logo.png" id='logo'
        alt="logo of page. You can click on it to go to main page"/>
      </div>
      <div className='upperbarButtonsDiv'>
            <span className='button6' onClick={ () => navigate("/") } >TOKEN OPERATIONS</span>
            <span className='button6' onClick={ () => navigate("/swap") } >SWAP OPERATIONS</span>
      </div>

    </div>
  )
}

export default Upperbar