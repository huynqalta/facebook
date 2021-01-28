import EmployeeInteractor from "@useCases/employee";
import GroupInteractor from "@useCases/employee/group";
import { useState } from "react";

interface IEditLang {
  edit: boolean;
  data?: any;
  type: "edit" | "add" | "";
}

const useEmployee = () => {
  const {
    getListEmployeeInteractor,
    getListEmployeeWithGroupInteractor,
    getListEmployeeWithTagInteractor,
    getDetailGroupInteractor,
    getDetailTagInteractor,
  } = new EmployeeInteractor();
  const [showModal, setShowModal] = useState<IEditLang>({
    edit: false,
    data: {},
    type: "",
  });

  return {
    getListEmployeeInteractor,
    getListEmployeeWithGroupInteractor,
    setShowModal,
    showModal,
    getDetailGroupInteractor,
    getListEmployeeWithTagInteractor,
    getDetailTagInteractor,
  };
};

export default useEmployee;
