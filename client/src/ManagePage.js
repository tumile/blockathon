import { Avatar, Button, List, PageHeader, Spin, Tag } from 'antd';
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
          className="header-container"
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
                <Link
                  to={{
                    pathname: `/review/${item.employeeID}`,
                    state: { employee: item }
                  }}
                >
                  Add Review
                </Link>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.employeeImage} />}
                title={
                  <Link
                    to={{
                      pathname: `/employees/${item.employeeID}`,
                      state: { employee: item }
                    }}
                  >
                    {item.employeeName}
                  </Link>
                }
                description={<Tag color="blue">{item.employeeTitle}</Tag>}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default ManagePage;
