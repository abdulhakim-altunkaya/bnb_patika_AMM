import React from 'react'

function Upperbar() {
  return (
    <div className='upperbarDiv'>
      <div className='upperbarLogoDiv'>
        <img src="logo.png" id='logo'
        alt="logo of page. You can click on it to go to main page"/>
      </div>
      <div className='upperbarButtonsDiv'>
            <span className='button6' >TOKEN OPERATIONS</span>
            <span className='button6' >SWAP OPERATIONS</span>
      </div>

    </div>
  )
}

export default Upperbar