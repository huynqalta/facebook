import React from "react"
import { Button, Form, Input, Space } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const ArrayValue = props => {
    return <Form.Item label="PARAMETER VALUE">
        <Form.List name="parameterValue">
            {(fields, { add, remove }) => {
                return <>
                    {fields.map((field, index) => (
                        <div key={field.key} className="flex align-center">
                            <Form.Item style={{ width: "100%" }} name={index} rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                        </div>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add value
                        </Button>
                    </Form.Item>
                </>
            }}
        </Form.List>
    </Form.Item>
}

export default ArrayValue