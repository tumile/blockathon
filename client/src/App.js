import { Icon, Menu, Spin } from "antd"
import React, { Component } from "react"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import TruffleContract from "truffle-contract"
import "./App.css"
import HireBlockContract from "./contracts/HireBlock.json"
import getWeb3 from "./getWeb3"
import LookupPage from "./LookupPage"
import ManagePage from "./ManagePage"
import EmployeePage from "./EmployeePage"

class App extends Component {
    state = { account: null, contract: null }

<<<<<<< HEAD
    componentDidMount = async () => {
        try {
            const web3 = await getWeb3()
            const instance = TruffleContract(HireBlockContract)
            instance.setProvider(web3.currentProvider)
            const contract = await instance.deployed()
            const accounts = await web3.eth.getAccounts()
            const account = accounts[0]
            this.setState({ account, contract })
        } catch (err) {
            console.error(err)
        }
=======
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
>>>>>>> d32d7769f9c3cb055a1add0ae15bcd246296563e
    }

    render() {
        if (!this.state.contract) {
            return (
                <div className="screen-center">
                    <Spin size="large" />
                </div>
            )
        }
        return (
            <Router>
                <div>
                    <Menu mode="horizontal">
                        <Menu.Item key="search">
                            <Link to="/">
                                <Icon type="file-search" />
                                Lookup
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="manage">
                            <Link to="/manage">
                                <Icon type="appstore" />
                                Manage
                            </Link>
                        </Menu.Item>
                    </Menu>
                    <Switch>
                        <Route exact path="/">
                            <LookupPage contract={this.state.contract} />
                        </Route>
                        <Route path="/manage">
                            <ManagePage contract={this.state.contract} />
                        </Route>
                        <Route path="/employees/:id">
                            <EmployeePage contract={this.state.contract} />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
<<<<<<< HEAD
=======
    return (
      <Router>
        <div>
          <div className="nav-container">
            <Menu mode="horizontal">
              <Menu.Item key="search">
                <Link to="/">
                  <Icon type="file-search" />
                  Lookup
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
            <Route exact path="/">
              <LookupPage contract={this.state.contract} />
            </Route>
            <Route path="/manage">
              <ManagePage contract={this.state.contract} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
>>>>>>> d32d7769f9c3cb055a1add0ae15bcd246296563e
}

export default App
