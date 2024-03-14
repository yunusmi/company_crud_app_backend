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
export interface GetProductsParams extends RequestParams {}
export interface UpdateProductParams extends RequestParams {}
export interface DeleteProductParams extends RequestParams {}
export interface GetSalesParams extends RequestParams {}

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

export interface UpdateEmployeesResponse extends GetEmployeesResponse {}

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

export interface CreateProductRequestBody {
  quantity_in_stock?: number;
  product_name: string;
  price: number;
  branch_id: number;
}

export interface UpdateProductRequestBody extends CreateProductRequestBody {}
export interface UpdateProductResponse extends GetProductsResponse {}
export interface IncreaseProductInventoryResponse extends GetProductsResponse {
  sale_id: number;
}

export interface GetProductsResponse {
  product_id: number;
  product_name: string;
  price: number;
  branch_id: number;
}

export interface DeleteProductsResponse {
  deleted_product_rows: void;
  deleted_inventory_rows: number;
}

export interface CreateSaleRequestBody {
  product_id: number;
  employee_id: number;
  sale_date: string;
  quantity: number;
}

export interface UpdateSaleRequestBody extends CreateSaleRequestBody {}
export interface UpdateSaleParams extends RequestParams {}
export interface DeleteSaleParams extends RequestParams {}

export interface GetSalesResponse extends CreateSaleRequestBody {
  sale_id: number;
}

export interface UpdateSaleResponse extends GetSalesResponse {}

export interface SwaggerDefinition {
  parameters: any;
  in: string;
  name: string;
  type: string | number;
  required: boolean;
  description: string;
}

export interface SwaggerPaths {
  [path: string]: {
    [method: string]: SwaggerDefinition;
  };
}
