import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import { useAccount } from "../Store.js";

function LowForm() {
  const zustandContract = useAccount(state => state.contract);

  let[contractCode, setContractCode] = useState("");
  let[responseChatgpt, setResponseChatgpt] = useState("");
  let[manual, setManual] = useState("block");
  let[disableButton7, setDisableButton7] = useState(false);

  const api = process.env.REACT_APP_CHATGPT_API;
  const configuration = new Configuration({apiKey: api});
  const openai = new OpenAIApi(configuration);



  const handleSubmit = async (e) => {
    setManual("none");
    e.preventDefault();
    setDisableButton7(true);
    const txResponse = await zustandContract.makePayment();
    if(txResponse === false) {
      setResponseChatgpt("You need to pay 1 CONTOR. To get 1 CONTOR, go to Token Operations section");
      setDisableButton7(false);
      setManual("block");
      return;
    }
    const formInput = ` ${contractCode} `;
    const response = await openai.createCompletion({
        prompt: formInput,
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 1000
    });
    const message = response.data.choices[0].text;
    setResponseChatgpt(message);
    setDisableButton7(false);
  }

  



  return (

    <div className='smallFormDiv'>

      <h2>SUBMIT YOUR CONTRACT</h2>
      <p>Before submitting the contract, please make sure you upload only one contract at a time. Do not upload multiple contracts.
      </p>
      <form onSubmit={handleSubmit} className='contractSubmitForm'>
          <textArea type="text" value={contractCode} onChange={ e => setContractCode(e.target.value) } required></textArea>
          {disableButton7 === true ? 
            <input type="submit" value="Wait..." disabled className='button-87'/>
          :
            <input type="submit" value="Send" className='button-87'/>
          }
          
      </form>
      <p>{responseChatgpt}</p>
      <div style={{display: `${manual}`}}>
      <strong>To audit contract:</strong> <br />
      <strong>1.</strong> Make sure you have Metamask in your browser and Fantom testnet inside <br />
      <strong>2.</strong> Connect this site to your Metamask. <br />
      <strong>3.</strong> Go to "Token Operations" of website, buy 12 CONTOR for 1 FTM. Then come here to audit your contract. <br />
      <strong>4.</strong> Copy paste your contract to form area and click "send". Confirm Metamask transaction and wait 25 seconds.
      Answer will appear here.
     </div>
    </div>
  )
}

export default LowForm;

