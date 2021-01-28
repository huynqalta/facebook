import React from "react"
import { Button, Form, Input, Space } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const ObjectValue = props => {
    return <Form.Item label="PARAMETER VALUE">
        <Form.List name="parameterValue">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(field => (
                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                label="KEY"
                                name={[field.name, 'key']}
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="VALUE"
                                name={[field.name, 'value']}
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add value
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    </Form.Item>
}

export default ObjectValue