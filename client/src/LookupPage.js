import { Avatar, List } from 'antd';
import React from 'react';
import './App.css';

const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    employeeName: 'John Doe',
    employeeImage:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    employeeAbout:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    lastestReview:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  });
}

const LookupPage = () => {
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
};

export default LookupPage;
