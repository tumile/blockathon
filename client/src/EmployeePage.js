import { Avatar, Button, PageHeader, Spin, Tag, Timeline } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class EmployeePage extends Component {
  state = {
    isCandidate: false,
    employee: null,
    reviews: null,
    companies: null
  };

  async componentDidMount() {
    const { employee, isCandidate } = this.props.location.state;
    const employeeID = this.props.match.params.id;
    const reviews = await this.props.contract.getPerformanceReviews(employeeID);
    const companies = {};
    for (let i = 0; i < reviews.length; i++) {
      if (i === 0 || reviews[i].companyID !== reviews[i - 1].companyID) {
        const company = await this.props.contract.getCompany(
          reviews[i].companyID
        );
        companies[reviews[i].companyID] = company;
      }
    }
    this.setState({ employee, isCandidate, reviews, companies });
  }

  renderReviews() {
    const { reviews, companies } = this.state;
    const items = [];
    for (let i = 0; i < reviews.length; i++) {
      const item = reviews[i];
      if (i === 0 || item.companyID !== reviews[i - 1].companyID) {
        items.push(
          <Timeline.Item
            dot={
              <Avatar
                shape="square"
                size={64}
                src={companies[item.companyID].companyImage}
              />
            }
          >
            <br />
            <br />
          </Timeline.Item>
        );
      }
      items.push(
        <Timeline.Item>
          <Tag color="blue">
            {new Date(Number(item.timestamp)).toDateString()}
          </Tag>
          <br />
          {item.review}
        </Timeline.Item>
      );
    }
    return items;
  }

  render() {
    const { reviews, employee, isCandidate } = this.state;
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
          className="header-container"
          onBack={() => window.history.back()}
          title={employee.employeeName}
          extra={
            isCandidate
              ? null
              : [
                  <Button key="1" type="primary">
                    <Link
                      to={{
                        pathname: `/review/${employee.employeeID}`,
                        state: { employee }
                      }}
                    >
                      Add Review
                    </Link>
                  </Button>
                ]
          }
          avatar={{ src: employee.employeeImage }}
        />
        <Timeline className="container" style={{ padding: 40 }}>
          {this.renderReviews()}
        </Timeline>
      </div>
    );
  }
}

export default EmployeePage;
