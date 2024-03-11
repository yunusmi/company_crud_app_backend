import { Dialect } from 'sequelize';

export interface DBConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
  };
}

export interface RequestParams {
  id: number;
}

export interface BranchRequestParams extends RequestParams {}
export interface GetEmployeesParams extends RequestParams {}
export interface UpdateEmployeeParams extends RequestParams {}
export interface DeleteEmployeeParams extends RequestParams {}
export interface UpdateBranchRequestBody extends CreateBranchRequestBody {}
export interface CreateInventoryRequestBody extends GetInventoriesResponse {}
export interface GetOneEmployeeData extends GetEmployeesResponse {}
export interface GetInventoryDataParams extends RequestParams {}
export interface UpdateInventoryDataParams extends RequestParams {}
export interface UpdateInventoryResponse extends GetInventoriesResponse {}
export interface DeleteInventoryParams extends RequestParams {}

export interface CreateBranchRequestBody {
  branch_name: string;
}

export interface GetBranchesResponse {
  branch_id: number;
  branch_name: string;
}

export interface CreateEmployeeRequestBody {
  first_name: string;
  last_name: string;
  branch_id: number;
}

export interface GetEmployeesResponse {
  employee_id: number;
  first_name: string;
  last_name: string;
  branch_id: number;
  branch_name?: string;
}

export interface UpdateEmployeeRequestBody {
  first_name: string;
  last_name: string;
  branch_id: number;
}

export interface GetInventoriesResponse {
  inventory_id?: number;
  product_id: number;
  quantity_in_stock: number;
}

export interface UpdateInventoryRequestBody {
  quantity_in_stock: number;
}
