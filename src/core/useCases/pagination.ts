import PaginationInfo from "@entities/paginationInfo";

class PaginationInteractor {
  getItemInPage(pagination: PaginationInfo, data) {
    return data?.slice(
      (pagination.current - 1) * pagination.pageSize,
      (pagination.current - 1) * pagination.pageSize + pagination.pageSize
    );
  }
}

export default PaginationInteractor;
