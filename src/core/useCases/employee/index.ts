import EmployeeService, { IRequestDeleteTag } from "@api/employee";
import EmployeeEntities from "@entities/employee";
import PaginationInfo from "@entities/paginationInfo";
import { ReverseObjectNumber } from "@helper/functions";

class EmployeeInteractor {
  getListEmployeeInteractor: (
    pagination: PaginationInfo,
    search?: string,
    sorter?
  ) => any;
  actionEmployeeInteractor: (request, employeeId?: string) => any;
  deleteEmployeeInteractor: (employeeId: string) => any;
  registerFaceEmployeeInteractor: (
    userId: string,
    file?: File,
    listTag?: Array<string>
  ) => any;
  getProfileEmployeeInteractor: (employeeId: string) => any;
  getDetailGroupInteractor: (groupId: string) => any;
  getDetailTagInteractor: (tagId: string) => any;
  getListEmployeeWithGroupInteractor: (pagination, option) => any;
  getListEmployeeWithTagInteractor: (pagination, option) => any;
  getFaceEmployeeInteractor: (employeeId: string) => any;
  deleteEmployeeImageInteractor: (employeeId: string, imageId: string) => any;
  // getFaceEmployeeInteractor: (employeeId: string) => any;
  deleteTagEmployeeInteractor: (
    employeeId: string,
    tagId: string,
    modeId: string
  ) => any;

  constructor() {
    const service = new EmployeeService();
    Object.keys(service).forEach((key) => {
      this[key] = service[key];
    });
    this.getListEmployeeInteractor = async (pagination, option) => {
      let request = {
        limit: pagination.pageSize,
        total: pagination.total,
        page: pagination.current,
        search: option.search || "",
      };
      return await service.getListEmployee(request).then((res) => {
        const pagination: PaginationInfo = {
          pageSize: res?.data?.data?.pageInfo.pageSize,
          total: res?.data?.data?.pageInfo.totalCount,
          current: res?.data?.data?.pageInfo.currentPage,
        };
        return {
          data: new EmployeeEntities().createListEmployee(
            res?.data?.data?.pagedData
          ),
          info: new PaginationInfo(pagination),
        };
      });
    };
    this.getListEmployeeWithGroupInteractor = async (pagination, option) => {
      let request = {
        limit: pagination.pageSize,
        total: pagination.total,
        page: pagination.current,
        search: option.search || "",
      };
      return await service
        .getListEmployeeWithGroup(request, option?.data?.groupId)
        .then((res) => {
          const pagination: PaginationInfo = {
            pageSize: res?.data?.data?.pageInfo.pageSize,
            total: res?.data?.data?.pageInfo.totalCount,
            current: res?.data?.data?.pageInfo.currentPage,
          };
          return {
            data: new EmployeeEntities().createListEmployee(
              res?.data?.data?.pagedData
            ),
            info: new PaginationInfo(pagination),
          };
        });
    };
    this.getListEmployeeWithTagInteractor = async (pagination, option) => {
      let request = {
        limit: pagination.pageSize,
        total: pagination.total,
        page: pagination.current,
        search: option.search || "",
      };
      return await service
        .getListEmployeeWithTag(request, option?.data?.tagId)
        .then((res) => {
          const pagination: PaginationInfo = {
            pageSize: res?.data?.data?.pageInfo.pageSize,
            total: res?.data?.data?.pageInfo.totalCount,
            current: res?.data?.data?.pageInfo.currentPage,
          };
          return {
            data: new EmployeeEntities().createListEmployee(
              res?.data?.data?.pagedData
            ),
            info: new PaginationInfo(pagination),
          };
        });
    };

    this.actionEmployeeInteractor = async (request, userId) => {
      const action = userId ? service.editEmployee : service.addEmployee;
      const employeeSend = new EmployeeEntities({ ...request, userId }).toRaw();
      // console.log(...employeeSend, "employeeSendemployeeSendemployeeSend");

      return await action(request, userId).then((res) => {
        return new EmployeeEntities(res?.data?.data);
      });
    };

    this.deleteEmployeeInteractor = async (userId: string) => {
      return await service.deleteEmployee(userId).then((res) => {
        return new EmployeeEntities(res?.data?.data);
      });
    };

    this.registerFaceEmployeeInteractor = async (userId, file, listTag) => {
      const formData = new FormData();
      file && formData.append("Image", file);
      if (listTag) {
        listTag.forEach((x) => formData.append("TagIdsParse", x));
      }
      return await service
        .registerFaceEmployee(formData, userId)
        .then((res) => {
          return new EmployeeEntities(res?.data?.data);
        });
    };

    this.getProfileEmployeeInteractor = async (employeeId) => {
      return await service.profileEmployee(employeeId).then((res) => {
        return new EmployeeEntities(res?.data?.data).toEntities();
      });
    };

    this.getFaceEmployeeInteractor = async (employeeId) => {
      return await service.profileFileEmployee(employeeId).then((res) => {
        return res?.data?.data;
      });
    };
    this.getDetailGroupInteractor = async (groupId) => {
      return await service.getDetailGroup(groupId).then((res) => {
        return res?.data?.data;
      });
    };
    this.getDetailTagInteractor = async (tagId) => {
      return await service.getDetailTag(tagId).then((res) => {
        return res?.data?.data;
      });
    };

    this.deleteEmployeeImageInteractor = async (
      employeeId,
      imageEmployeeId
    ) => {
      return await service
        .deleteEmployeeImage(employeeId, imageEmployeeId)
        .then((res) => {
          return res;
        });
    };

    this.deleteTagEmployeeInteractor = async (employeeId, tagId, modeId) => {
      const requestDelete: IRequestDeleteTag = {
        userId: employeeId,
        tagId,
        modeId,
      };
      return await service.deleteTagEmployee(requestDelete).then((res) => {
        return res?.data?.data;
      });
    };
  }
}

export default EmployeeInteractor;
