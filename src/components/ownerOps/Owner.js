import React, {useState} from 'react';
import OwnerMintA from "./OwnerMintA";
import OwnerMintB from "./OwnerMintB";
import OwnerPause from "./OwnerPause";
import OwnerSetAddress from "./OwnerSetAddress";
import OwnerUpdateFee from "./OwnerUpdateFee";
import OwnerRemoveA from "./OwnerRemoveA";
import OwnerRemoveB from "./OwnerRemoveB";
import OwnerLeftovers from "./OwnerLeftovers";


function Owner() {

    let [displayDetails, setDisplayDetails] = useState(false);

    const toggleDetails = () => {
      setDisplayDetails(!displayDetails);
    }

    return (
        <div>
            <button className='button9' id='btnRed' onClick={toggleDetails}>Owner Operations</button>
            {
                displayDetails === true ?
                <>
                    <OwnerMintA />
                    <OwnerMintB />
                    <OwnerPause />
                    <OwnerSetAddress />
                    <OwnerUpdateFee />
                    <OwnerRemoveA />
                    <OwnerRemoveB />
                    <OwnerLeftovers />

                </>
                :
                <></>
            }
        </div>
    )
}

export default Owner