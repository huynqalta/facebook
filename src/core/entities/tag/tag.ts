export default class TagEntities {
  tagId: string = "";
  tagName: string = "";
  tagCode: string = "";
  tagComment: string = "";
  ticketTypeId: string = "";
  ticketType: any = "";
  repeatType: "None" | "Daily" | "Weekly";
  tagTimeStart: string = "";
  timeStart: string = "";
  tagTimeEnd: string = "";
  timeEnd: string = "";
  createdAt: string = "";
  updatedAt: string = "";
  dateEnd: string = "";
  dateStart: string = "";
  listValue: Array<string> = [];
  constructor(tags?) {
    if (tags) {
      Object.keys(this).forEach((tagItem) => {
        if (tagItem == "repeatType") {
          this[tagItem] = this.convertRepeatType(tags.repeatType, "comein");
        } else if (tags[tagItem]) {
          this[tagItem] = tags[tagItem];
        }
      });
    }
  }
  
  createListTag(listTag) {
    if (!Array.isArray(listTag)) return null;
    return listTag.map((item) => {
      return new TagEntities(item);
    });
  }
  //KHÔNG ĐƯỢC BẤM CTRL ALT F
  convertRepeatType(value = 'default', type?):any {
    if (type == "comein") {
      return {
        null: "",
        0: "None",
        1: "Daily",
        2: "Weekly",
        'default': "Undefine in tag entities"
      }[value]
    } else {
      return {
        "": undefined,
        "None": 0,
        "Daily": 1,
        "Weekly": 2,
        'default': undefined
      }[value]
    }
  }
}

const a = [{ None: 1 }, { Daily: 1 }];

const parseabc = (string) => {
  return a.map((x) => x["string"]);
};

console.log(parseabc("None"));
