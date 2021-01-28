import TagInteractor from "@useCases/tag";
import TicketInteractor from "@useCases/ticket";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TicketStore } from "src/core/store/ticket";
import { TagPaginationStore } from "src/core/store/tag";
import moment from "moment";
import { convertDateUTC, deleteLastItemInPage } from "@helper/functions";
import TagEntities from 'src/core/entities/tag/tag';
export const useTag = () => {
  const createForm = (value, registerDayPicker) => {
    const convert = new TagEntities();
    const data = {
      tagName: value.tagName,
      tagComment: value.tagComment,
      ticketTypeId: value.ticketTypeId,
      repeatType: convert.convertRepeatType(value.repeatType),
      tagCode: value.tagCode,
      timeStart: value.timeTag? moment(value.timeTag[0]).format("HH:mm:ss"): undefined,
      timeEnd: value.timeTag? moment(value.timeTag[1]).format("HH:mm:ss"): undefined,
      // dateStart: moment.utc(`${ moment(value.rangeDate[0]).format("YYYY-MM-DD") } 00:00:00`).format(),
      dateStart: value.rangeDate? value.rangeDate[0].utc().format(): undefined,
      dateEnd: value.rangeDate? value.rangeDate[1].utc().format(): undefined,
      repeatValue: registerDayPicker.getValues().values? registerDayPicker.getValues().values : undefined,
    };
    value.tagId && Object.assign(data, { tagId: value.tagId });
    return data;
  };

  const [paginationTag, setPaginationTag] = useRecoilState(TagPaginationStore);
  const { getListTag, addTag, deleteTag, editTag } = new TagInteractor();

  // phải truyền vào cái PAGINATION
  const getList = async (
    info = paginationTag.info,
    search = paginationTag.options.search
  ) => {
    return await getListTag(info, search).then((res) => {
      setPaginationTag(res);
    });
  };

  const add = async (value, registerDayPicker) => {
    const formAdd = createForm(value, registerDayPicker);
    return await addTag(formAdd).then(async (res) => {
      return await getList();
    });
  };

  const edit = async (value, registerDayPicker) => {
    const formEdit = createForm(value, registerDayPicker);
    return await editTag(formEdit).then(async () => {
      return await getList();
    });
  };

  const del = async (id, pag) => {
    return await deleteTag(id).then(async (res) => {
      let pagination = deleteLastItemInPage(pag);
      return await getList(pagination);
    });
  };

  return {
    getList,
    add,
    del,
    edit,
  };
};

export const useTicket = () => {
  const { getListTicket } = new TicketInteractor();
  const setListTicket = useSetRecoilState(TicketStore);
  const getTicket = async () => {
    return await getListTicket().then((res) => {
      setListTicket(res);
    });
  };
  return {
    getTicket,
  };
};
