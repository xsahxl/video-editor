import request from '@/utils/request';

export const generateVideo = request({
  url: '/api/generate_video',
  method: 'post',
});