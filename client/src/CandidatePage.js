import { Avatar, List, Spin } from 'antd';
import React, { Component } from 'react';
import './App.css';

class CandidatePage extends Component {
  state = {
    candidates: null
  };

  async componentDidMount() {
    const employee = this.props.location.state.employee;
    const employeeID = this.props.match.params.id;
    const reviews = await this.props.contract.getPerformanceReviews(employeeID);
    this.setState({ employee, reviews });
  }

  render() {
    const { candidates } = this.state;
    if (!candidates) {
      return (
        <div className="screen-center">
          <Spin size="large" />
        </div>
      );
    }
    return (
      <div className="container">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={listData}
          renderItem={item => (
            <List.Item key={item.title}>
              <List.Item.Meta
                avatar={<Avatar src={item.employeeImage} />}
                title={<a href={item.employeeId}>{item.employeeName}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default CandidatePage;
