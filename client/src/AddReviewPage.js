import { Button, DatePicker, Form, Input, PageHeader, Spin } from 'antd';
import React, { Component } from 'react';

const { MonthPicker } = DatePicker;
class AddReviewPage extends Component {
  state = {
    employee: null,
    timestamp: null,
    review: null
  };

  componentDidMount() {
    const { employee } = this.props.location.state;
    this.setState({ employee });
  }

  onSubmit = e => {
    e.preventDefault();
    const { employee, timestamp, review } = this.state;
    this.props.contract
      .addPerformanceReview(
        'e38997ad5c457',
        employee.employeeID,
        review,
        timestamp,
        { from: this.props.account }
      )
      .then(() => {
        window.history.back();
        console.log('heyyyy');
      });
  };

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
        <Form className="container" onSubmit={this.onSubmit}>
          <Form.Item label="Time">
            <DatePicker
              onChange={date =>
                this.setState({ timestamp: date.utc(date).valueOf() })
              }
            />
          </Form.Item>
          <Form.Item label="Review">
            <Input.TextArea
              rows={6}
              onChange={e => this.setState({ review: e.target.value })}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddReviewPage;
