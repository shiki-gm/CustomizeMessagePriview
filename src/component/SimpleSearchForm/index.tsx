import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';

export const SimpleSearchForm = (props: {
  onChange: (data: string) => void;
  placeholder?: string;
}) => {
  const { onChange, placeholder = '请输入查询内容' } = props;
  const [value, setValue] = useState<string>('');


  return (
    <Space>
      <Input
        min={1}
        max={10}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <Button
        type="primary"
        onClick={() => {
          onChange(value);
        }}
      >
        查询
      </Button>
    </Space>
  );
};
