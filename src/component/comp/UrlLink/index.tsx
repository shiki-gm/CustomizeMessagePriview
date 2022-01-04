import react, { memo, useState } from 'react';
import { Modal, Button, Space, Form, Input } from 'antd';

interface Props {
  visible: boolean;
  onChange: (data?: {}) => void;
}

export default memo((props: Props) => {
  const { visible = false, onChange } = props;
  const [value, setValue] = useState('');
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // console.log(values);
    onChange({ data: values.urlLink });
  };

  return (
    <Modal
      title="链接"
      destroyOnClose
      visible={visible}
      onCancel={e => onChange()}
      footer={
        // <div className='qimai-basemodal-footer'>
        <Button onClick={form.submit} type="primary">
          确定
        </Button>
        // </div>
      }
    >
      <Form
        preserve={false}
        form={form}
        onFinish={onFinish}
        scrollToFirstError={{
          behavior: 'smooth',
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          name="urlLink"
          label="添加链接地址"
          rules={[
            { required: true, message: '请输入链接地址' },
            {
              pattern: /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/,
              message: '请输入正确的链接地址',
            },
          ]}
        >
          <Input
            placeholder="以http或https开头的链接"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
