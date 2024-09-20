import axios, { CreateAxiosDefaults, AxiosRequestConfig, AxiosError } from 'axios';
import { get, isFunction, set, toLower } from 'lodash';
import validStatus from './interceptors/valid-status';
import extractData from './interceptors/extract-data';
import transformData from './interceptors/transform-data';
import { Modal, ModalFuncProps } from 'antd';
import { IConfig, AXIOS_INSTANCE_REF, DEFAULT_METHOD } from './types';
import { getToken } from '../common';

const createDefaultAxiosInstance = (options: CreateAxiosDefaults) => {
  const instance = axios.create({
    withCredentials: true,
    ...options,
  });
  // request interceptor 先添加后执行
  instance.interceptors.request.use(transformData);
  instance.interceptors.response.use(validStatus);
  instance.interceptors.response.use(extractData);
  return instance;
};

const axiosService =
  (options: AxiosRequestConfig = {}) =>
  async (config: IConfig = {}) => {
    const newOption = { ...options };
    // 处理默认值
    newOption.method = toLower(newOption.method) || DEFAULT_METHOD;
    const { ignoreError, customError } = config;
    // 缓存 axios 实例
    if (!(axiosService as any)[AXIOS_INSTANCE_REF]) {
      (axiosService as any)[AXIOS_INSTANCE_REF] = createDefaultAxiosInstance(newOption);
    }

    const instance = (axiosService as any)[AXIOS_INSTANCE_REF];
    const serviceConfig = { ...newOption, ...config };
    const token = getToken();
    if (token) {
      set(serviceConfig, 'headers.Authorization', token);
    }

    try {
      return await instance.request(serviceConfig);
    } catch (err) {
      if (!ignoreError) {
        const errorConfig = { ...serviceConfig };
        const callback = () => {
          showModal(err as AxiosError);
          throw err;
        };
        if (isFunction(customError)) {
          return customError(err as Error, errorConfig, callback);
        }
        return callback();
      }
    }
  };

const showModal = (err: AxiosError) => {
  Modal.destroyAll()
  let config = {
    title: '提示',
    content: get(err, 'response.data.detail', err.message),
    closable: true,
    destroyOnClose: true,
  } as ModalFuncProps;

  if (err.status === 401) {
    Modal.error({
      ...config,
      okText: '登录',
      onOk: () => {
        window.location.href = '/login';
      },
    });
    return;
  }
  const modal = Modal.error({
    ...config,
    okText: '关闭',
    onOk: () => {
      modal.destroy();
    },
    okButtonProps: {
      type: 'default',
      autoFocus: false,
    },
  });
};

export default axiosService;
