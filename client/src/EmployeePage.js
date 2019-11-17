import React from "react"
import { Link } from "react-router-dom"
import { PageHeader, Button, List, Skeleton } from "antd"

class EmployeePage extends React.Component {
    render() {
        console.log(this.props.match)
        const reviews = [
            {
                timestamp: "10/10/2019",
                review:
                    "He had changed a lot after our last conversation, back to hardworking now"
            },
            {
                timestamp: "03/10/2019",
                review:
                    "He lately spent a lot of time partying, not making progress"
            },
            {
                timestamp: "01/10/2019",
                review: "He worked very hard, decent employee"
            }
        ]
        return (
            <div
                style={{
                    padding: 10
                }}
            >
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Sundar Pichai"
                    extra={[
                        <Button key="1" type="info">
                            <Link to={`/addreview/0`}>Add Review</Link>
                        </Button>
                    ]}
                    avatar={{
                        src:
                            "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
                    }}
                ></PageHeader>
                <List
                    className="loadmore-list"
                    itemLayout="horizontal"
                    dataSource={reviews}
                    renderItem={item => (
                        <List.Item>
                            <Skeleton
                                avatar
                                title={false}
                                loading={false}
                                active
                            >
                                <List.Item.Meta
                                    title={item.timestamp}
                                    description={item.review}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default EmployeePage
