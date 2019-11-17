import { Avatar, List, PageHeader, Spin, Tag } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class CandidatePage extends Component {
  state = {
    candidates: null
  };

  async componentDidMount() {
    const candidates = await this.props.contract.getCandidateList(
      'e38997ad5c457'
    );
    this.setState({ candidates });
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
      <div>
        <PageHeader className="header-container" title="Applied Candidates" />
        <List
          className="container"
          itemLayout="horizontal"
          dataSource={candidates}
          renderItem={item => (
            <List.Item
              actions={[
                <Link
                  to={{
                    pathname: `/employees/${item.employeeID}`,
                    state: { isCandidate: true, employee: item }
                  }}
                >
                  View Profile
                </Link>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.employeeImage} />}
                title={
                  <Link
                    to={{
                      pathname: `/employees/${item.employeeID}`,
                      state: { isCandidate: true, employee: item }
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

export default CandidatePage;
