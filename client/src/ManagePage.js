import { Avatar, Button, List, PageHeader, Spin } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class ManagePage extends Component {
  state = {
    employees: null
  };

  async componentDidMount() {
    const employees = await this.props.contract.getEmployeeList(
      'e38997ad5c457'
    );
    this.setState({ employees });
  }

  render() {
    const { employees } = this.state;
    if (!employees) {
      return (
        <div className="screen-center">
          <Spin size="large" />
        </div>
      );
    }
    return (
      <div>
        <PageHeader
          className="nav-container"
          ghost={false}
          onBack={() => window.history.back()}
          title="Employees Management"
          subTitle="Quarter 1 - 2020"
          extra={[
            <Button type="primary" key="1">
              Add Employee
            </Button>
          ]}
        />
        <List
          className="container"
          itemLayout="horizontal"
          dataSource={employees}
          renderItem={item => (
            <List.Item
              actions={[
                <Link
                  to={{
                    pathname: `/employees/${item.employeeID}`,
                    state: { employee: item }
                  }}
                >
                  View Profile
                </Link>,
                <a>Add Review</a>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.employeeImage} />}
                title={item.employeeName}
                description={item.employeeTitle}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ManagePage;
