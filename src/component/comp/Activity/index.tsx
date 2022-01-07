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

export default (props: Props) => {
  const { visible = false, onChange } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleOk = () => {
    onChange({ data: selectedRows });
  };
  
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    console.log('selectedRows changed: ', selectedRows);
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);

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
}
