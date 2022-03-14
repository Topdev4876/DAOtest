import logo from './logo.svg';
import './App.css';
import {useMetaMask,MetaMaskProvider} from 'metamask-react';
import contract from './DAOFactory.json';
import erc1155 from './Cryptotoken.json';
import dao from './CryptonDAO.json'
import { ethers } from 'ethers'; 
import { useState } from 'react';

const { ethereum } = window;
const contractAddress = "0xA097360dbD421af6132B25FB2d62b3f41e87a9C0"
const abi = contract.abi;

function App() {
  const { status, connect, account } = useMetaMask();
  const [address,setaddress]=useState('0xce9659d0D1821aF4b575d058dd670eff851826ce')
  const [name,setname]=useState('Monkey')
  const [symbol,setsymbol]=useState('MK')
  const [minQuorum,setminQuorum]=useState('100')
  const [feeRate,setfeeRate]=useState('10')
  const [whiteaddress,setwhiteaddress]=useState()
  const [Dipositamount,setDipositamount]=useState("100")
  const [withdraw,setwithdraw]=useState("100")
  const [Proposaldsc,setProposaldsc]=useState()
  const [target,settarget]=useState()
  const [childcontr,setchild]=useState('0x10697A55C02AfCD1314c8a83B5392A39266e6b73')
  const [childcontrerc1155,setchildcontrerc1155]=useState('0x223eE5e0309EDc95A0b2Dec6101F333a8C8aBcdD')
  const [amount,setamount]=useState("100")
  const [propID,setpropID]=useState()
  const [decision,setdecision]=useState()
  const [ID,setID]=useState()


  async function startPublicsale(){

    // console.log(await nftContract.tokenURI(2))
    // console.log(await nftContract._baseURI())
    // await nftContract.setBaseURI("https://gateway.pinata.cloud/ipfs/QmSZ9eJ9njKJhXcG4J61PiC7vZCQVLsoSN69ZKTeUHT4Hx/")
  }


  async function mint( ){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(childcontrerc1155, erc1155.abi,signer);
    console.log(childcontrerc1155)
     await nftContract.mint(address,amount);
  }
  async function create(){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, abi,signer);
     await nftContract.createContract(minQuorum,feeRate,name,symbol)
  }
  async function get(){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, abi,signer);

    setchild(await nftContract.getMyContract());
    console.log(`child address is ${childcontr}`)
    setchildcontrerc1155(await nftContract.getMyerc20Contract());
    console.log(`child erc1155 address is ${childcontrerc1155}`)
    
  }
  async function setwhite(){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, abi,signer);
    
    // let etherAmount=0.1
    // await nftContract.adopt(id,{
    //   value: ethers.utils.parseEther(etherAmount.toString())
    // });
    
  }
  async function upgrade(){
      // await nftContract.setwhitelister(whiteaddress)
  }
  async function Diposit(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontr, dao.abi,signer);

    await nftContract.deposit(Dipositamount)
  }
  async function Withdraw(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontr, dao.abi,signer);
    nftContract.withdraw(withdraw)
  }
  async function addProposal(){

  }
  async function Vote(){

  }
  async function finishVoting(){

  }
  async function approve(){
    let  provider = new ethers.providers.Web3Provider(ethereum);
    let signer = provider.getSigner();
    let nftContract = new ethers.Contract(childcontrerc1155, erc1155.abi,signer);
    await nftContract.setApprovalForAll(childcontr,true)
  }
  return (
    <MetaMaskProvider>
    <div className="App">
      <header className="App-header">
        {/* <input type='text' value={whiteaddress} onChange={e=>setaddress(e.target.value)}> </input> */}
        <button onClick={connect}>connect</button>
        <div id="container">
                <div id="label">Create Settings</div>
          <label>Name</label>
          <input type="text" value={name} onChange={e => setname(e.target.value)}></input>
          <label>symbol</label>
          <input type="text" value={symbol} onChange={e => setsymbol(e.target.value)}></input>
        
        <div>
          <label>minQuorum</label>
          <input type="text" value={minQuorum} onChange={e => setminQuorum(e.target.value)}></input>
          <label>feeRate</label>
          <input type="text" value={feeRate} onChange={e => setfeeRate(e.target.value)}></input>
        </div>
        
        <div><button onClick={create}> Create Contract </button></div>
        </div>
        <div><button onClick={get}>GetMycontract</button></div>
        <div>
          <label>WhiteAddress</label>
          <input type="text" value={whiteaddress} onChange={e => setwhiteaddress(e.target.value)}></input>
          <button onClick={setwhite}>Set Whitelister</button>
        </div>
        <div>
          <label>Adress</label>
          <input type="text" value={address} onChange={e => setaddress(e.target.value)}></input>
          <label>Amount</label>
          <input type="text" value={amount} onChange={e => setamount(e.target.value)}></input>
          <br/>
          <button onClick={mint}>Mint</button>
        </div>
        <button onClick={approve}>approve</button>
        <div>
          <label>Diposit amount</label>
          <input type="text" value={Dipositamount} onChange={e => setDipositamount(e.target.value)}></input>
          <button onClick={Diposit}>Diposit</button>
        </div>
        <div>
          <label>withdraw amount</label>
          <input type="text" value={withdraw} onChange={e => setwithdraw(e.target.value)}></input>
          <button onClick={Withdraw}>Withdraw</button>
        </div>
        <div id="container">
          <div id="label">addProposal</div>
          <label>Description</label>
          <input type="text" value={Proposaldsc} onChange={e => setProposaldsc(e.target.value)}></input>
          <label>targetaddress</label>
          <input type="text" value={target} onChange={e => settarget(e.target.value)}></input>
          <button onClick={addProposal}>addProposal</button>
        </div>
        <div id="container">
          <div id="label">Vote Settings</div>
          <label>propID</label>
          <input type="text" value={propID} onChange={e => setpropID(e.target.value)}></input>
          <label>decision</label>
          <input type="checkbox" name="acceptRules" class="inline checkbox" id="checkbox1" value={decision} onChange={e => setdecision(e.target.value)}></input>
          <button onClick={Vote}>Vote</button>
          <br/>
          <label>finishVoting (id)</label>
          <input type="text" value={ID} onChange={e => setID(e.target.value)}></input>
          <button onClick={finishVoting}>finishVoting</button>
        </div>
        
      </header>
    </div>
    </MetaMaskProvider>
  );
}

export default App;
