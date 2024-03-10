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
export interface GetOneEmployeeData extends GetEmployeesResponse {}

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
