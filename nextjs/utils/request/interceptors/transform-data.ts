import { InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { isArray, isPlainObject } from 'lodash';
import qs from 'qs';
import { IConfig, CONTENT_TYPE } from '../types';

type IParams = InternalAxiosRequestConfig & IConfig;

const getPostData = (config: IParams) => {
  if (isPlainObject(config.json)) {
    return {
      data: JSON.stringify(config.json),
      headers: {
        ...config.headers,
        'Content-Type': CONTENT_TYPE.json,
      } as AxiosRequestHeaders,
    };
  }
  if (isPlainObject(config.form)) {
    const formData = new FormData();
    const data = config.form;
    for (const key in data) {
     if (isArray(data[key])) {
      for (const item of data[key]) {
        formData.append(key, item);
      }
     }else{
      formData.append(key, data[key]);
     }
    }
   
    return {
      data: formData,
      headers: {
        ...config.headers,
        // 'Content-Type': CONTENT_TYPE.form, // 不需要手动设置
      } as AxiosRequestHeaders,
    };
  }
};

// 处理 DELETE 请求
const handleDeleteRequest = (config: IParams) => {
  if (isPlainObject(config.params)) {
    return {
      ...config,
      url: `${config.url}?${qs.stringify(config.params, { indices: false })}`,
      params: undefined,
    };
  }
  return config;
};

export default (config: IParams) => {
  if (config.method === 'get') {
    return {
      ...config,
      paramsSerializer: (p: Record<string, any>) => qs.stringify(p, { indices: false }),
    };
  }

  if (config.method === 'delete') {
    return handleDeleteRequest(config);
  }

  return { ...config, ...getPostData(config) };
};