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
import AddReviewPage from "./AddReviewPage"

class App extends Component {
    state = { account: null, contract: null }

    componentDidMount = async () => {
        try {
            const web3 = await getWeb3()
            const instance = TruffleContract(HireBlockContract)
            instance.setProvider(web3.currentProvider)
            const contract = await instance.deployed()
            const accounts = await web3.eth.getAccounts()
            const account = accounts[0]
            this.setState({ account, contract }, this.init)

            var employees = await contract.getEmployeeList("e38997ad5c457")
            console.log(employees)
            console.log(employees[1][0])
            console.log(await contract.getPerformanceReviews(employees[1][0]))
        } catch (err) {
            console.error(err)
        }
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
                                Applied Candidates
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
                        <Route path="/addreview/:id">
                            <AddReviewPage contract={this.state.contract} />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App
