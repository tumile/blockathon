import React from "react"
import {
    PageHeader,
    Button,
    Row,
    Statistic,
    List,
    Skeleton,
    Avatar
} from "antd"
import { Link } from "react-router-dom"
import "./App.css"

const listData = []
for (let i = 0; i < 10; i++) {
    listData.push({
        employeeName: "John Doe",
        employeeImage:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        employeeAbout:
            "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        lastestReview:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
    })
}

const LookupPage = () => {
    const list = [
        { employeeName: "Larry Page", employeeID: 0 },
        { employeeName: "Sundar Pichai", employeeID: 1 },
        { employeeName: "Jeff Dean", employeeID: 2 }
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
                title="Applied Candidates"
                subTitle="See the profiles of all candidates applying to the role"
            ></PageHeader>
            <List
                className="loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Link to={`/employees/${item.employeeID}`}>
                                View Profile
                            </Link>
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
    )
}

export default LookupPage
