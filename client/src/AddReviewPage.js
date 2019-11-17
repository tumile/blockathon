import { Button, DatePicker, Form, Input, PageHeader, Spin } from 'antd';
import React, { Component } from 'react';

const { MonthPicker } = DatePicker;
class AddReviewPage extends Component {
  state = {
    employee: null
  };

  componentDidMount() {
    const { employee } = this.props.location.state;
    console.log(this.props.location.state);

    this.setState({ employee });
  }

  render() {
    const { employee } = this.state;
    if (!employee) {
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
          title="Add Review"
          subTitle={`Add performance review for ${employee.employeeName}`}
        />
        <Form className="container">
          <Form.Item label="Time">
            <MonthPicker />
          </Form.Item>
          <Form.Item label="Review">
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddReviewPage;
