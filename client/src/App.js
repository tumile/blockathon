import { Icon, Menu, Spin } from 'antd';
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import TruffleContract from 'truffle-contract';
import AddReviewPage from './AddReviewPage';
import './App.css';
import CandidatePage from './CandidatePage';
import HireBlockContract from './contracts/HireBlock.json';
import EmployeePage from './EmployeePage';
import getWeb3 from './getWeb3';
import ManagePage from './ManagePage';

class App extends Component {
  state = { account: null, contract: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const instance = TruffleContract(HireBlockContract);
      instance.setProvider(web3.currentProvider);
      const contract = await instance.deployed();
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      this.setState({ account, contract }, this.init);
    } catch (err) {
      console.error(err);
    }
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
      <Router>
        <div className="nav-container">
          <Menu mode="horizontal" className="nav">
            <Menu.Item key="name">
              <h1 style={{ margin: 0, color: '#1890ff', fontSize: 24 }}>
                HiredBlock
              </h1>
            </Menu.Item>
            <Menu.Item key="search">
              <Link to="/">
                <Icon type="file-search" />
                Candidates
              </Link>
            </Menu.Item>
            <Menu.Item key="manage">
              <Link to="/manage">
                <Icon type="appstore" />
                Manage
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <CandidatePage contract={this.state.contract} />}
          />
          <Route
            path="/manage"
            render={() => <ManagePage contract={this.state.contract} />}
          />
          <Route
            path="/employees/:id"
            render={props => (
              <EmployeePage {...props} contract={this.state.contract} />
            )}
          />
          <Route
            path="/review/:id"
            render={props => (
              <AddReviewPage {...props} contract={this.state.contract} account={this.state.account} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
