import styles from './index.less';
import React, { useState } from 'react';
import { TableFooter, BaseTable, PageContainer } from 'qimai_designpro';


export default function Welcome() {
	const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 20,
  });
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: ['西湖区湖底公园1号'],
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: [
        '西湖区湖底公园1号',
        '西湖区湖底公园2号',
        '西湖区湖底公园3号',
        '西湖区湖底公园4号',
      ],
    },
    {
      key: '3',
      name: '胡彦天',
      age: 52,
      address: ['西湖区湖底公园1号'],
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <PageContainer
      content="管理员"
      footer={
        dataSource.length ? (
          <TableFooter
            pageNav={{
              total: dataSource.length,
              current: searchParams.page,
              pageSize: searchParams.limit,
            }}
            onPageChange={(pageNumber, pageSize) => {
              setSearchParams({
                ...searchParams,
                page: pageNumber,
                limit: pageSize,
              });
            }}
          />
        ) : null
      }
    >
      <BaseTable dataSource={dataSource} columns={columns} />
    </PageContainer>
  );
}
