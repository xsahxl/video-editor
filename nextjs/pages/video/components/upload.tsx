import React, { FC } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, UploadFile, UploadProps } from 'antd';

interface IProps {
  value?: UploadFile<any>[] | undefined;
  onChange?: (files: File[]) => void;
}

const UploadComponent: FC<IProps> = ({ value, onChange }) => {
  const handleChange = (info: any) => {
    const { fileList } = info;
    onChange?.(fileList); // 将文件传递给父组件
  };

  const config: UploadProps = {
    name: 'files',
    fileList: value,
    multiple: true,
    onChange: handleChange,
  };

  return (
    <Upload.Dragger {...config}>
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <p className='ant-upload-text'>Click or drag file to this area to upload</p>
      <p className='ant-upload-hint'>
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
      </p>
    </Upload.Dragger>
  );
};

export default UploadComponent;
