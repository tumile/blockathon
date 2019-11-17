import { Button, DatePicker, Form, Input, PageHeader, Spin } from 'antd';
import React, { Component } from 'react';

class AddReviewPage extends Component {
  state = {
    employee: null,
    date: null,
    review: null
  };

  componentDidMount() {
    const { employee } = this.props.location.state;
    this.setState({ employee });
  }

  addPerformanceReview = async e => {
    e.preventDefault();
    const { employee, date, review } = this.state;
    this.props.contract
      .addPerformanceReview(
        'e38997ad5c457',
        employee[0],
        review,
        Date.UTC(date.years, date.months, date.date),
        { from: this.props.account }
      )
      .then(() => window.history.back());
  };

  handleDateChange = e => {
    this.setState({ time: e.target.value });
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
        <Form className="container" onSubmit={this.addPerformanceReview}>
          <Form.Item label="Time">
            <DatePicker
              onChange={date => this.setState({ date: date.toObject() })}
            />
          </Form.Item>
          <Form.Item
            label="Review"
            value={this.state.review}
            onChange={e => this.setState({ review: e.target.value })}
          >
            <Input.TextArea rows={6} />
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
