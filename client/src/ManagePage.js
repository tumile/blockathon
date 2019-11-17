import React from 'react';
import { Link } from 'react-router-dom';
import {
  PageHeader,
  Button,
  Row,
  Statistic,
  List,
  Skeleton,
  Avatar
} from 'antd';

const ManagePage = () => {
  const list = [
    { employeeName: 'Larry Page', employeeID: 0 },
    { employeeName: 'Sundar Pichai', employeeID: 1 },
    { employeeName: 'Jeff Dean', employeeID: 2 }
  ];
  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Employees Management"
        subTitle="Manage employee performance profile"
        extra={[
          <Button key="1" type="primary">
            Add Employee
          </Button>
        ]}
      >
        <Row type="flex">
          <Statistic title="Total Employees" value="10" />
          <Statistic
            title="Quarter"
            value="Quarter 1 - 2020"
            style={{
              margin: '0 32px'
            }}
          />
          <Statistic title="Need review" value="3" />
        </Row>
      </PageHeader>
      <List
        className="loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[
              <Link to={`/employees/${item.employeeID}`}>View Profile</Link>,
              <a key="list-loadmore-more">Add Review</a>
            ]}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  <Link to={`/employees/${item.employeeID}`}>
                    {item.employeeName}
                  </Link>
                }
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ManagePage;
