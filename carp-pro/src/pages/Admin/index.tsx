import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Col, message, Popconfirm, Row, Tree } from 'antd';
import { deleteDepartment, getDepartmentTree } from '@/services/carp-admin/department';
import { Key, useEffect, useRef, useState } from 'react';
import { deleteAdmin, getAdminList } from '@/services/carp-admin/admin';
import { PlusOutlined } from '@ant-design/icons';

export default () => {
  const [treeData, setTreeData] = useState<API.Department[]>([]);
  const actionRef = useRef<ActionType>();
  const [params, setParams] = useState({});
  useEffect(() => {
    getDepartmentTree().then(({ data }) => {
      // @ts-ignore
      setTreeData(data);
    });
  }, []);
  const columns: ProColumns<API.Admin>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      copyable: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      copyable: true,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      copyable: true,
    },
    {
      title: 'QQ',
      dataIndex: 'qq',
      copyable: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (_, record) => [
        <Button key={'edit'} type={'primary'} onClick={() => {}}>
          编辑
        </Button>,
        <Popconfirm
          key={'delete'}
          title={'是否确认删除'}
          onConfirm={async () => {
            const { errorMessage } = await deleteAdmin({ id: record.id });
            if (errorMessage) {
              message.error(errorMessage);
            } else {
              actionRef.current?.reload();
              message.success('删除成功');
            }
          }}
        >
          <Button type={'primary'} danger={true}>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];
  function onSelect(selectedKeys: Key[]) {
    setParams({ departmentId: selectedKeys[0] });
  }
  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={5}>
          {treeData?.length > 0 && (
            <Tree
              onSelect={onSelect}
              defaultExpandAll
              // @ts-ignore
              treeData={treeData}
              fieldNames={{ title: 'name', key: 'id', children: 'children' }}
            />
          )}
        </Col>
        <Col span={19}>
          <ProTable
            actionRef={actionRef}
            search={{
              defaultCollapsed: false,
            }}
            params={params}
            columns={columns}
            request={getAdminList}
            toolBarRender={() => [
              <Button key="add" type="primary" onClick={() => {}}>
                <PlusOutlined />
                新增账号
              </Button>,
            ]}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};
