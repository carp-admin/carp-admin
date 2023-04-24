declare namespace API {
  type Admin = {
    /** 用户id */
    id: string;
    /** 用户名 */
    username: string;
    /** 邮箱 */
    email?: string;
    /** 手机号 */
    mobile?: string;
    /** 微信 */
    wechat?: string;
    /** QQ */
    qq?: string;
    /** 头像 */
    avatar?: string;
    /** 密码 */
    password?: string;
    /** 备注 */
    remark?: string;
    /** 部门 */
    department?: Department;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
    /** 删除时间 */
    deletedAt?: string;
  };

  type AdminControllerFindOneParams = {
    id: string;
  };

  type CreateAdminDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 邮箱 */
    email: string;
    /** 手机号 */
    mobile: string;
    /** 备注 */
    remark: string;
  };

  type CreateDepartmentDto = {
    /** 部门名称 */
    name: string;
    /** 部门状态：true可用；false禁用 */
    status: boolean;
    /** 备注信息 */
    remark: string;
    /** 父级分类id */
    parentId: string;
  };

  type deleteAdminParams = {
    /** 管理员id */
    id: string;
  };

  type deleteDepartmentParams = {
    /** 部门id */
    id: string;
  };

  type Department = {
    /** 唯一id */
    id: string;
    /** 部门名称 */
    name: string;
    /** 部门状态：1可用；0禁用 */
    status: boolean;
    /** 备注信息 */
    remark: string;
    /** 父级分类 */
    parent: IntersectionDepartment;
    /** 子分类 */
    children: IntersectionDepartment[];
    /** 账号列表 */
    adminList: string[];
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
    /** 删除时间 */
    deletedAt?: string;
  };

  type DepartmentControllerFindOneParams = {
    id: string;
  };

  type getAdminListParams = {
    /** 当前页码 */
    current?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 用户名 */
    username?: string;
    /** 邮箱 */
    email?: string;
    /** 手机号 */
    mobile?: string;
    /** qq */
    qq?: string;
    /** 微信 */
    wechat?: string;
    /** 部门id */
    departmentId?: string[];
    /** 开始时间:YYYY-MM-DD HH:mm:SS */
    startDate?: string;
    /** 结束时间:YYYY-MM-DD HH:mm:SS */
    endDate?: string;
  };

  type IntersectionDepartment = {
    /** 唯一id */
    id: string;
    /** 部门名称 */
    name: string;
    /** 部门状态：1可用；0禁用 */
    status: boolean;
    /** 备注信息 */
    remark: string;
    /** 父级分类 */
    parent: IntersectionDepartment;
    /** 子分类 */
    children: IntersectionDepartment[];
    /** 账号列表 */
    adminList: string[];
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
    /** 删除时间 */
    deletedAt?: string;
  };

  type LoginAdminDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 用户类型:account|mobile */
    type: string;
  };

  type LoginResponseDto = {
    /** 用户token */
    token: string;
    /** currentAuthority */
    currentAuthority: string;
    /** 状态 */
    status: string;
    /** 用户类型 */
    type: 'account' | 'mobile';
  };

  type OutAdminDto = {
    /** 状态 */
    success: boolean;
  };

  type PaginatedDto = {
    /** 状态：true表示成功；false表示失败 */
    success: boolean;
    /** 提示信息 */
    errorMessage?: string;
  };

  type ResponseArrayDto = {
    /** 状态：true表示成功；false表示失败 */
    success: boolean;
    /** 提示信息 */
    errorMessage?: string;
  };

  type ResponseMapDto = {
    /** true表示接口请求成功，不代表业务逻辑成成 */
    success: boolean;
    /** 提示信息：有错误才会有提示，没有错误为空 */
    errorMessage?: string;
  };

  type UpdateAdminDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password?: string;
    /** 邮箱 */
    email: string;
    /** 手机号 */
    mobile: string;
    /** 备注 */
    remark: string;
  };

  type updateAdminParams = {
    /** 管理员id */
    id: string;
  };

  type UpdateDepartmentDto = {
    /** 部门名称 */
    name: string;
    /** 部门状态：true可用；false禁用 */
    status: boolean;
    /** 备注信息 */
    remark: string;
    /** 父级分类id */
    parentId: string;
  };

  type updateDepartmentParams = {
    id: string;
  };
}
