import React, { useState } from "react";
import { RightOutlined } from '@ant-design/icons';
import { Breadcrumb, Tabs } from "antd";

import "./styles.scss";
import "./../../../ui/styles/tab.scss";

import ScheduleHello from "./component/ScheduleHello";
import ScheduleWeather from "./component/ScheduleWeather";

const { TabPane } = Tabs;
const Schedule = () => {
  const [ active, setActive ] = useState("hello")
  return (
    <div className="style_table_hd_bank">
      <Breadcrumb className="flex-auto breadcb" separator={<RightOutlined />}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item className="breadcb__last">Schedule</Breadcrumb.Item>
      </Breadcrumb>
      <div className="action">
        <Tabs defaultActiveKey="hello" className="tabs-large" onChange={(key: string) => setActive(key)} >1
          <TabPane tab={"List Hello"} key="hello">
            <ScheduleHello scheduleType={active} />
          </TabPane>
          <TabPane tab={"List Weather"} key="weather" >
            <ScheduleWeather scheduleType={active} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default Schedule;
