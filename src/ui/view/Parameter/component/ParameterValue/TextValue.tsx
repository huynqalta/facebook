import { Input } from "antd"
import { Form } from "antd"
import React from "react"

const TextValue = props => {
    return <Form.Item name="parameterValue" label="PARAMETER VALUE" rules={[{ required: true }]}>
        <Input />
    </Form.Item>
}

export default TextValue