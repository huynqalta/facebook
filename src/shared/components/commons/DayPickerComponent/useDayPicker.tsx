import React, { useMemo, useRef } from "react";
interface IGetValuesDayPicker {
  values: Array<string>;
}

const useDayPicker = () => {
  const refDayPicker = useRef({
    triggerSetType: null,
    triggerGetValues: null,
    triggerDisabled: null,
    triggerSetValues: null,
  });

  return useMemo(() => {
    return {
      refDayPicker,
      setTypeDayPicker: (type: "weekly" | "monthly" | "yearly") =>
        refDayPicker.current.triggerSetType(type),
      setValues: (value: Array<string>) =>
        refDayPicker.current.triggerSetValues(value),
      getValues: (): (() => IGetValuesDayPicker) =>
        refDayPicker.current.triggerGetValues(),
      disabled: () => refDayPicker.current.triggerDisabled(),
    };
  }, []);
};
export default useDayPicker;
