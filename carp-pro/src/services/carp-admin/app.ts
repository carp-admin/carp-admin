// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 初始化数据 GET /admin */
export async function initSystem(options?: { [key: string]: any }) {
  return request<API.ResponseMapDto & { data?: Record<string, any> }>('/admin', {
    method: 'GET',
    ...(options || {}),
  });
}
