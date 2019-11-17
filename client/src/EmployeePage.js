import { Button, List, PageHeader, Spin } from 'antd';
import React, { Component } from 'react';
import './App.css';

class EmployeePage extends Component {
  state = {
    employee: null,
    reviews: null
  };

  async componentDidMount() {
    const employee = this.props.location.state.employee;
    const employeeID = this.props.match.params.id;
    const reviews = await this.props.contract.getPerformanceReviews(employeeID);
    this.setState({ employee, reviews });
  }

  render() {
    const { reviews, employee } = this.state;
    if (!reviews) {
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
          title={employee.employeeName}
          extra={[
            <Button key="1" type="info">
              Add Review
            </Button>
          ]}
          avatar={{ src: employee.employeeImage }}
        ></PageHeader>
        <List
          className="container"
          itemLayout="horizontal"
          dataSource={reviews}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={new Date(Number(item.timestamp)).toDateString()}
                description={item.review}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default EmployeePage;
