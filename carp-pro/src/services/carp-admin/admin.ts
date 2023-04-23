// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 管理员列表 GET /admin/admin */
export async function getAdminList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAdminListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.PaginatedDto & {
      data?: API.Admin[];
      total?: number;
      totalPage?: number;
      current?: number;
      pageSize?: number;
    }
  >('/admin/admin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增 POST /admin/admin */
export async function addAdmin(body: API.CreateAdminDto, options?: { [key: string]: any }) {
  return request<API.ResponseMapDto & { data?: Record<string, any> }>('/admin/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/admin/${param0} */
export async function AdminControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AdminControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/admin/admin/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除管理员 DELETE /admin/admin/${param0} */
export async function deleteAdmin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAdminParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseMapDto & { data?: Record<string, any> }>(`/admin/admin/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新管理员 PATCH /admin/admin/${param0} */
export async function updateAdmin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAdminParams,
  body: API.UpdateAdminDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseMapDto & { data?: Record<string, any> }>(`/admin/admin/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 当前登录用户 GET /admin/admin/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.ResponseMapDto & { data?: API.Admin }>('/admin/admin/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录 POST /admin/admin/login */
export async function login(body: API.LoginAdminDto, options?: { [key: string]: any }) {
  return request<API.ResponseMapDto & { data?: API.LoginResponseDto }>('/admin/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出 POST /admin/admin/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.ResponseMapDto & { data?: API.OutAdminDto }>('/admin/admin/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
