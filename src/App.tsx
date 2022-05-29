import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import Web3 from 'web3';
import ABI from "./abi";

import { AbiItem } from 'web3-utils'

declare global {
  interface Window { ethereum: any; }
}


function App() {

  const [num, setNum] = useState("")
  const [num2, setNum2] = useState("")
  const [account, setAccount] = useState<string>()

  //const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/510c76127b904e76a13ec09106657ea7"));
  // infura not support eth_sendTransaction, change to metamask provider
  const web3 = new Web3(window.ethereum);

  //set https://github.com/KishanV/smart-contract-web3-react-demo/blob/main/src/web3-handler/index.tsx

  const address = "0xb7c941777080a611a815E77Be0A5372Be6B650D3"
  const contract = new web3.eth.Contract(ABI as any[], address)


  function retrieve() {
    contract.methods.retrieve().call((_err: string, result: string) => {
      console.log(result)
      setNum(result)
    })
  }

  async function getAccount() {
    var accounts = await web3.eth.getAccounts()
    console.log(accounts)
    setAccount(accounts[0])
  }

  function store() {
    getAccount()
    contract.methods.store([12]).send({ from: account }, (err: string, result: string) => {
      console.log(err)
      console.log(result)
    })
  }

  return (
    <div className="App">
      <h1>This is my dApp!</h1>
      <p>Your Address: {num}</p>

      <button onClick={retrieve}>Retrieve</button>
      <button onClick={store}>Store</button>

    </div>
  );
}

export default App;
