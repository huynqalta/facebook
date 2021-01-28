import React, { useCallback, useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import { Select, Tag } from "antd";
import "react-day-picker/lib/style.css";
const dateFormat = require("dateformat");
import moment from "moment";

const { CheckableTag } = Tag;
const { Option } = Select;
interface Iprops {
  initType?: "none" | "norepeat" | "weekly" | "monthly" | "yearly";
  register?: any;
}
interface IDayPicker {
  values: Array<any>;
  valuesByType: Array<string>;
}

const Days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const defaultDaypicker: IDayPicker = {
  values: [],
  valuesByType: [],
};

const useControlDayPicker = (
  initType: "none" | "norepeat" | "weekly" | "monthly" | "yearly" = "monthly"
) => {
  const [daysPicker, setDaysPicker] = useState<IDayPicker>(defaultDaypicker);
  const [type, setType] = useState<
    "none" | "norepeat" | "weekly" | "monthly" | "yearly"
  >(initType);
  const handleDayClick = useCallback(
    (day, selected) => {
      if (selected) {
        const selectedIndex = daysPicker.values.findIndex((selectedDay) =>
          DateUtils.isSameDay(selectedDay, day)
        );
        setDaysPicker((pre) => {
          return {
            ...pre,
            values: pre.values.filter((item, index) => index !== selectedIndex),
            valuesByType: pre.valuesByType.filter(
              (item, index) => index !== selectedIndex
            ),
          };
        });
      } else {
        let valuesByType = "";

        switch (type) {
          case "monthly":
            valuesByType = dateFormat(day, "d");
            break;
          case "yearly":
            valuesByType = dateFormat(day, "dd/mm");
            break;
        }
        setDaysPicker((pre) => ({
          ...pre,
          values: [...pre.values, day],
          valuesByType: [...pre.valuesByType, valuesByType],
        }));
      }
    },
    [daysPicker, type]
  );
  const handleChange = useCallback(
    (values) => {
      console.log(values, "valuesvaluesvalues");

      setDaysPicker((pre) => ({
        ...pre,
        values: values,
        valuesByType: values,
      }));
    },
    [type]
  );
  return {
    daysPicker,
    type,
    setDays: handleDayClick,
    setDaysSelect: handleChange,
    setType,
    setDaysPicker,
  };
};

const DayPickerComponent = ({ initType = "monthly", register }: Iprops) => {
  const [selectedDaysofWeek, setSelectedDaysofWeek] = useState([]);

  let registerCurrent = null;
  if (register) registerCurrent = register.refDayPicker.current;
  const {
    daysPicker,
    type,
    setDays,
    setDaysSelect,
    setType,
    setDaysPicker,
  } = useControlDayPicker(initType);
  const [controllMonth, setControllMonth] = useState({
    next: false,
    pre: false,
  });

  //register
  if (registerCurrent) {
    registerCurrent.triggerSetType = (type) => {
      setType(type);
      setDaysPicker(defaultDaypicker);
    };
    registerCurrent.triggerGetValues = () => {
      return {
        values: daysPicker.valuesByType,
      };
    };
    registerCurrent.triggerDisabled = () => {
      setType("none");
    };
    registerCurrent.triggerSetValues = (values: Array<string>) => {
      setType((type) => {
        if (type == "weekly") {
          setDaysPicker((pre) => ({ ...pre, valuesByType: values }));
        }
        if (type == "monthly") {
          //values = ['1', '2', '4']
          setDaysPicker((pre) => ({
            values: values.map(
              (item: string) => new Date(2020, 7, parseInt(item))
            ),
            valuesByType: values,
          }));
        }
        if (type == "yearly") {
          const dataConvert = values.map((item) => {
            if (typeof item != "string") return;
            const dateSplit = item.split("/");
            return new Date(
              2021,
              parseInt(dateSplit[1]) - 1,
              parseInt(dateSplit[0])
            );
          });
          setDaysPicker(() => ({
            values: dataConvert,
            valuesByType: values,
          }));
        }
        return type;
      });
    };
  }

  if (type == "none") {
    return null;
  }
  const handleMonthChange = (value) => {
    const month = parseInt(moment(value).format("MM"));
    if (month == 12 || month == 1) {
      setControllMonth({
        next: month == 12,
        pre: month == 1,
      });
    } else {
      setControllMonth({
        next: false,
        pre: false,
      });
    }
  };

  //WEEKLY HOA
  const handleSelectedDaysofWeek = (tag, checked) => {
    const nextSelectedDaysofWeek = checked
      ? [...daysPicker.valuesByType, tag]
      : daysPicker.valuesByType.filter((t) => t !== tag);

    setDaysSelect(nextSelectedDaysofWeek);
    // setSelectedDaysofWeek(nextSelectedDaysofWeek);
  };

  console.log(daysPicker.valuesByType, "daysPicker.valuesByType");

  return (
    <>
      <span className="block mb-2 font-semibold">Lịch</span>
      <div
        className={`flex overflow-hidden  w-full ${
          type == "weekly" ? "h-auto" : "h-350"
        }`}
      >
        {type == "weekly" ? (
          <>
            {/* <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Days of week"
              onChange={(values: Array<string>) => setDaysSelect(values)}
              value={daysPicker.valuesByType}
            >
              {Days.map((item: string) => (
                <Option value={item}>{item}</Option>
              ))}
            </Select> */}
            {/* Code mới  */}
            <div className="listCheckedDay">
              {Days.map((tag) => (
                <CheckableTag
                  key={tag}
                  checked={daysPicker.valuesByType.indexOf(tag) > -1}
                  onChange={(checked) => handleSelectedDaysofWeek(tag, checked)}
                  className="listCheckedDay__day"
                >
                  {tag}
                </CheckableTag>
              ))}
            </div>
          </>
        ) : (
          <>
            <DayPicker
              selectedDays={daysPicker.values}
              onMonthChange={handleMonthChange}
              onDayClick={(day, { selected }) => setDays(day, selected)}
              month={type === "yearly" ? new Date() : new Date(2020, 7)}
              className={`${
                type === "monthly" && "header-invisible"
              } focus:outline-none ${
                type === "yearly" &&
                `${controllMonth.next && "DayPicker-button-next-disable"} ${
                  controllMonth.pre && "DayPicker-button-pre-disable"
                }`
              }`}
            />
            <div
              className="preview px-4 py-3 overflow-y-scroll rounded-l-none w-120 bg-grey-200 border-grey-100 border-solid border border-l-0 h-full"
              id="preview"
            >
              <span className="font-bold">Preview</span>
              <ul>
                {daysPicker.values.map((item) => {
                  return (
                    <li>
                      {type == "monthly" && dateFormat(item, "dS")}
                      {type == "yearly" && dateFormat(item, "mmmm dS")}
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default React.memo(DayPickerComponent);
