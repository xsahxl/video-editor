import { AxiosResponse } from 'axios';

export default (response: AxiosResponse) => {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  throw new Error(`Invalid response status code: ${status}`);
};
