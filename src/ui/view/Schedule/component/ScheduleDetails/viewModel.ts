import ScheduleDetailsInteractor from "@useCases/scheduleDetails";
import { useSetRecoilState } from "recoil";
import { ScheduleDetailsPaginationStore } from "src/core/store/scheduleDetails";

const useScheduleDetails = () => {
  const setPaginationScheduleDetails = useSetRecoilState(
    ScheduleDetailsPaginationStore
  );
  const {
    getListScheduleDetails,
    removeScheduleDetails,
  } = new ScheduleDetailsInteractor();

  const getListDetails = async (secheduleId, info) => {
    return await getListScheduleDetails(secheduleId, info).then((res) => {
      setPaginationScheduleDetails(res);
    });
  };
  const remove = async (scheduleDetailId, info) => {
    return await removeScheduleDetails(
      scheduleDetailId
    ).then(async (res) => {});
  };
  return {
    getListDetails,
    remove,
  };
};
export default useScheduleDetails;
