import React, { Component } from 'react';
import TruffleContract from 'truffle-contract';
import './App.css';
import HireBlockContract from './contracts/HireBlock.json';
import getWeb3 from './getWeb3';

class App extends Component {
  state = { storageValue: 0, account: null, contract: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();

      const instance = TruffleContract(HireBlockContract);
      instance.setProvider(web3.currentProvider);

      const contract = await instance.deployed();

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      this.setState({ account, contract });
    } catch (err) {
      console.error(err);
    }
  };

  runExample = async () => {
    const { account, contract } = this.state;

    const response = await contract.addCompany(
      'Google',
      'https://banner2.cleanpng.com/20180324/iww/kisspng-google-logo-g-suite-google-5ab6f1cee66464.5739288415219388949437.jpg',
      { from: account }
    );

    console.log(response);
  };

  render() {
    if (!this.state.contract) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        <button onClick={this.runExample}>Add money</button>
      </div>
    );
  }
}

export default App;
