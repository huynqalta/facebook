import Parameter from '@entities/parameter'
import ParameterIntoractor from '@useCases/parameter'
import { Input, Modal, Select, Form, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import ParameterValue from './ParameterValue'
const { addParameters, editParameters, getDetailParameter, getListParameters, removeParameter } = new ParameterIntoractor()

interface IProp {
    registerForm: any,
    registerTable: any,
    setParameterSelected: Function,
    parameterSelected: Parameter
}

const FormParameter = ({ registerForm, parameterSelected, registerTable, setParameterSelected }: IProp) => {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const [parameterType, setParameterType] = useState('text')

    useEffect(() => {
        if (!visible) return
        if (parameterSelected) {
            form.setFieldsValue(parameterSelected)
            setParameterType(parameterSelected.parameterType)
        } else {
            form.setFieldsValue({ parameterType: 'text' })
            setParameterType('text')
        }
    }, [visible])

    const handleCancle = () => {
        setVisible(false)
        registerTable.fetchData()
        form.resetFields()
        setParameterSelected(null)
    }

    if (registerForm) {
        registerForm.setVisible = setVisible
    }

    const onFinish = () => {
        const values = form.getFieldsValue()
        if (parameterSelected) {
            editParameters(parameterSelected.parameterKey, values).then(res => handleCancle())
        } else {
            addParameters(values).then(res => handleCancle())
        }
    }

    return <Modal footer={false} visible={visible} onCancel={handleCancle}>
        <Form form={form} onFinish={onFinish}>
            <Form.Item name='parameterName' label='PARAMETER KEY' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='parameterKey' label='PARAMETER NAME' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name='parameterType' label='PARAMETER TYPE' rules={[{ required: true }]}>
                <Select onChange={(value: string) => setParameterType(value)}>
                    <Select.Option value='text'>Text</Select.Option>
                    <Select.Option value='array'>Array</Select.Option>
                    <Select.Option value='object'>Object</Select.Option>
                </Select>
            </Form.Item>
            <ParameterValue type={parameterType} />
            <Form.Item>
                <div className='flex justify-end'>
                    <Button onClick={() => setVisible(false)}>Cancel</Button>
                    <Button loading={false} htmlType='submit'>Submit</Button>
                </div>
            </Form.Item>
        </Form>
    </Modal>
}

export default FormParameter