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

  addPerformanceReview = async () => {
    //fix this
    console.log(this.state.date);
    this.props.contract.addPerformanceReview('e38997ad5c457', this.state.employee[0], this.state.review, Date.UTC(2019, 11), {from: this.props.account});
  }

  handleDateChange = (e) => {
    this.setState({time: e.target.value});
  }

  handleReviewChange = (e) => {
    this.setState({review: e.target.value});
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
          <Form.Item label="Review" value={this.state.review} onChange={this.handleReviewChange}>
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.addPerformanceReview}>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddReviewPage;
