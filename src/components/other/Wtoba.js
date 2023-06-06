import React, {useState} from 'react';
import WtobaMint from "./WtobaMint";
import WtobaBurn from "./WtobaBurn";

function WTokenB() {

  let[displayStatus, setDisplayStatus] = useState(false);

  const displayParts = async () => {
    setDisplayStatus(!displayStatus);
  }

  return (
    <div>
        <button className='button9' onClick={displayParts}>TokenB Operations</button>
        { displayStatus === true ?
          <>
            <WtobaMint />
            <WtobaBurn />
          </>
        :
          <></>
        }

    </div>
  )
}

export default WTokenB