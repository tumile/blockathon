import React, { Component } from 'react';
import TruffleContract from 'truffle-contract';
import './App.css';
import HireBlockContract from './contracts/HireBlock.json';
import getWeb3 from './getWeb3';
import { Menu, Icon, Spin } from 'antd';

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

    // const response = await contract.addCompany(
    //   'Google',
    //   'https://banner2.cleanpng.com/20180324/iww/kisspng-google-logo-g-suite-google-5ab6f1cee66464.5739288415219388949437.jpg',
    //   { from: account }
    // );

    const response = await contract.getEmployeeList(0);

    console.log(response);
  };

  render() {
    if (!this.state.contract) {
      return (
        <div className="screen-center">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div>
        <Menu mode="horizontal" style={{ textAlign: 'right' }}>
          <Menu.Item key="search">
            <Icon type="file-search" />
            Lookup
          </Menu.Item>
          <Menu.Item key="manage">
            <Icon type="appstore" />
            Manage
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default App;
