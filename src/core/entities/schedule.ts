class Schedule {
  scheduleName: string = ""
  scheduleDescription: string = ""
  scheduleDateStart: string = ""
  scheduleDateEnd: string = ""
  scheduleTimeStart: string = ""
  scheduleTimeEnd: string = ""
  scheduleValues: Array<string>
  scheduleType: "hello" | "weather" | "meeting"
  repeatType: "none" | "dayly" | "weekly" | "monthly" | "yearly"
  keyCode: Array<{
    key: string,
    value: Array<string>
  }>
  schedulePriority: number
  scheduleCreatedAt: string = ""
  scheduleDetails: Array<{
    keyCode: string,
    scheduleDetailId: string,
    keyCodeValue: string
  }>
  scheduleId: string = ""
  scheduleUpdatedAt: string = ""
  scheduleValueData: string = ""

  constructor(schedule?) {
    if (schedule) {
      Object.keys(this).forEach((key) => {
        switch (key) {
          case "scheduleType":
            this[ key ] = this.convertScheduleType(schedule.scheduleType, "entities")
            break;
          case "keyCode":
            this[ key ] = schedule[ 'scheduleDetails' ]
            break;
          case "repeatType":
            this[ key ] = this.convertRepeatType(schedule.repeatType, "entities")
            break;
          default:
            this[ key ] = schedule[ key ];
            break;
        }
      });
    }
  }
  createListSchedule(listSchedule) {
    if (!Array.isArray(listSchedule)) return [];

    return listSchedule.map(schedule => {
      return new Schedule(schedule);
    })
  }

  convertScheduleType(value, type?: "entities"): any {
    if (type == "entities") {
      switch (value) {
        case 1:
          return "hello";
        case 2:
          return "weather";
        default:
          return "meeting";
      }
    } else {
      switch (value) {
        case "hello":
          return 1;
        case "weather":
          return 2
        default:
          return 3;
      }
    }
  }

  convertRepeatType(value, type?: "entities"): any {
    if (type == "entities") {
      switch (value) {
        case 0:
          return "none"
        case 1:
          return "daily"
        case 2:
          return "weekly"
        case 3:
          return "monthly"
        case 4:
          return "yearly"
      }
    }
    else {
      switch (value) {
        case "none":
          return 0
        case "daily":
          return 1
        case "weekly":
          return 2
        case 'monthly':
          return 3
        case "yearly":
          return 4
      }
    }
  }
}

export default Schedule;
