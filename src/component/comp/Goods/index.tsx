import react, { memo, useState } from 'react';
import {
  BaseModal,
  BaseTable,
  TableFooter,
  PageContainer,
} from 'qimai_designpro';
import { SimpleSearchForm } from "../../SimpleSearchForm";
import { goodsSource } from '@/mock';
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
      title="选择商品"
      width={920}
      onCancel={handleCancel}
      onOk={handleOk}
    >
        <div className={styles.container}>
            <SimpleSearchForm onChange={searchForm} placeholder='请输入商品关键词'/>
            <BaseTable
                className={styles.table}
                dataSource={goodsSource()}
                rowSelection={rowSelection}
                columns={[
                    {
                    title: '活动',
                    dataIndex: 'name',
                    },
                    {
                    title: '价格',
                    dataIndex: 'price',
                    },
                    {
                    title: '销量',
                    dataIndex: 'num',
                    },
                    {
                    title: '库存',
                    dataIndex: 'left',
                    },
                ]}
            />
        </div>
    </BaseModal>
  );
});
