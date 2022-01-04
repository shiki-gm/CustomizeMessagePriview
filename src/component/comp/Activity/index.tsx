import react, { memo } from 'react';
import { useState } from 'react';
import {
  BaseModal,
  BaseTable,
  TableFooter,
  PageContainer,
} from 'qimai_designpro';
import { SimpleSearchForm } from "../../SimpleSearchForm";
import { activitSource } from '@/mock';
import { Space } from 'antd';
import styles from "../index.less";

interface Props {
  visible: boolean;
  onChange: (data?: {}) => void;
}

export default memo((props: Props) => {
  const { visible = false, onChange } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleOk = () => {
    onChange({ data: selectedRowKeys });
  };

  const onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleCancel = () => {
    setSelectedRowKeys([])
    onChange();
  };

  const searchForm = (data: string) => {
      console.log('datra', data);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <BaseModal
    destroyOnClose
      visible={visible}
      title="添加营销活动"
      width={920}
      onCancel={handleCancel}
      onOk={handleOk}
    >
        <div className={styles.container}>
            <SimpleSearchForm onChange={searchForm} placeholder='搜索活动'/>
            <BaseTable
                className={styles.table}
                pagination={false}
                dataSource={activitSource()}
                rowSelection={rowSelection}
                columns={[
                    {
                    title: '活动',
                    dataIndex: 'name',
                    },
                    {
                    title: '创建时间',
                    dataIndex: 'created',
                    },
                ]}
            />
        </div>
    </BaseModal>
  );
});
