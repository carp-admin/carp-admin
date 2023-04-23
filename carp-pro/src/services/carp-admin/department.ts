// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建部门 POST /admin/department */
export async function createDepartment(
  body: API.CreateDepartmentDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseMapDto & { data?: Record<string, any> }>('/admin/department', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/department/${param0} */
export async function DepartmentControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DepartmentControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/admin/department/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除部门 DELETE /admin/department/${param0} */
export async function deleteDepartment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDepartmentParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseMapDto & { data?: Record<string, any> }>(
    `/admin/department/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 更新部门 PATCH /admin/department/${param0} */
export async function updateDepartment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateDepartmentParams,
  body: API.UpdateDepartmentDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseMapDto & { data?: Record<string, any> }>(
    `/admin/department/${param0}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  );
}

/** 获得部门树状结构 GET /admin/department/departmentTree */
export async function getDepartmentTree(options?: { [key: string]: any }) {
  return request<API.ResponseArrayDto & { data?: API.Department[] }>(
    '/admin/department/departmentTree',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
