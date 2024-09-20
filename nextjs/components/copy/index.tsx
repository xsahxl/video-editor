import React, { FC, PropsWithChildren, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { empty } from '@/utils/common';

type Props = PropsWithChildren & {
  text: string;
};
const Copy: FC<Props> = ({ text, children }) => {
  const handleCopy = () => {
    message.success('已成功复制到剪切板！');
  };
  if (!text) return empty();

  return (
    <div className={styles['copy-container']}>
      {children}
      <CopyToClipboard text={text} onCopy={handleCopy}>
        <CopyOutlined className={styles['copy-icon']} />
      </CopyToClipboard>
    </div>
  );
};

export default Copy;
