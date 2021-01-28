import React, { useEffect } from "react"
import { Form, Input, Checkbox, Radio, Button, Select } from "antd"
import { useParams } from "react-router"
import { useAsync } from "@hook/useAsync"
import useArticleByCategory from "./viewModel"
import { useQuery } from "@helper/functions"
import LoadingComponent from "@components/commons/LoadingComponent/loadingComponent"

const FormArticle = (props) => {
    let query: any = useQuery()
    const categoryCode = query.get("categoryCode")
    const articleId = query.get("articleId")

    const { add, edit, listLanguage, handleChangeLang, prepareData, form } = useArticleByCategory(categoryCode)

    const [ asyncAdd, asyncEdit, asyncPreareData ] = useAsync(add, edit, prepareData)

    useEffect(() => {
        asyncPreareData.execute(articleId)
    }, [ articleId ])

    const onFinish = () => {
        const values = form.getFieldsValue()

        if (articleId) {
            asyncEdit.execute(values)
        } else {
            asyncAdd.execute(values)
        }
    }

    return <Form form={form} onFinish={onFinish}>
        <Form.Item name="languageCode" label="languageCode">
            <Select onChange={(lang) => {
                handleChangeLang(lang)
            }}>
                {listLanguage.map(item => {
                    return <Select.Option value={item.languageCode}>{item.languageName}</Select.Option>
                })}
            </Select>
        </Form.Item>
        <Form.Item name="articleName" label="articleName">
            <Input />
        </Form.Item>
        <Form.Item name="articleTag" label="articleTag">
            <Input />
        </Form.Item>
        <Form.Item name="articleIcon" label="articleIcon">
            <Input />
        </Form.Item>
        <Form.Item name="articleDisplayDate" label="articleDisplayDate">
            <Input />
        </Form.Item>
        <Form.Item name="articleRelatednewDisplay" label="articleRelatednewDisplay">
            <Input />
        </Form.Item>
        <Form.Item name="articleBackground" label="articleBackground">
            <Input />
        </Form.Item>


        <Form.Item name="articleLanguageLinkInternal" label="articleLanguageLinkInternal">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageImage" label="articleLanguageImage">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageThumbnail" label="articleLanguageThumbnail">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageLink" label="articleLanguageLink">
            <Input />
        </Form.Item>
        <Form.Item name="articleIdLink" label="articleIdLink">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageTitle" label="articleLanguageTitle">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageContent" label="articleLanguageContent">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageContent2" label="articleLanguageContent2">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageContent3" label="articleLanguageContent3">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageDescription" label="articleLanguageDescription">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageSpecitalCharacter" label="articleLanguageSpecitalCharacter">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageToDay" label="articleLanguageToDay">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageDeparture" label="articleLanguageDeparture">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageDestination" label="articleLanguageDestination">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageCurrentcy" label="articleLanguageCurrentcy">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageMoney" label="articleLanguageMoney">
            <Input />
        </Form.Item>
        <Form.Item name="articleLanguageRouteType" label="articleLanguageRouteType">
            <Input />
        </Form.Item>
        <Form.Item>
            <div className="flex justify-end">
                <Button onClick={history.back}>Cancel</Button>
                <Button loading={asyncAdd.status == "loading" || asyncEdit.status == "loading"} htmlType="submit">Submit</Button>
            </div>
        </Form.Item>
    </Form>
}

export default FormArticle