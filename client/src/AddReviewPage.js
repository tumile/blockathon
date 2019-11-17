import React, { Component } from "react"
import { Link } from "react-router-dom"
import { PageHeader, Button, DatePicker, Form, Input } from "antd"

const { MonthPicker } = DatePicker
class AddReviewPage extends Component {
    handleSubmit = e => {
        e.preventDefault()
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        }
        const config = {
            rules: [
                {
                    type: "object",
                    required: true,
                    message: "Please select time!"
                }
            ]
        }

        return (
            <div
                style={{
                    padding: 10
                }}
            >
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Add Review"
                    subTitle="Add performance review for Sundar Pichai"
                ></PageHeader>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Time">
                        <MonthPicker />
                    </Form.Item>
                    <Form.Item label="Review">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 }
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default AddReviewPage
