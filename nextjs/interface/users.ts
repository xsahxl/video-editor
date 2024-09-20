export interface IUserDataType {
  id: number;
  user_id: number;
  origin_video_url: string;
  title: string;
  description: string;
  status: number;
  phone: string;
  error_message?: string;
}

export enum EStatus {
  audit = 1, // 审核中
  queue = 2, // 排队中
  training = 3, // 训练中
  training_success = 0, // 训练完成
  training_fail = -1, // 训练失败
  fail = -2, // 审核失败
}

export const StatusList = [
  {
    label: '审核中',
    value: EStatus.audit,
  },
  {
    label: '排队中',
    value: EStatus.queue,
  },
  {
    label: '训练中',
    value: EStatus.training,
  },
  {
    label: '训练完成',
    value: EStatus.training_success,
  },
  {
    label: '训练失败',
    value: EStatus.training_fail,
  },
  {
    label: '审核失败',
    value: EStatus.fail,
  },
];
