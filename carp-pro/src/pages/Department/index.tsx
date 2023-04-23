import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { deleteDepartment, getDepartmentTree } from '@/services/carp-admin/department';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import AddDepartment from '@/pages/Department/components/AddDepartment';
import UpdateDepartment, { UpdateProps } from '@/pages/Department/components/UpdateDepartment';

export default () => {
  const actionRef = useRef<ActionType>();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [updateProps, setUpdateProps] = useState<UpdateProps>({
    open: false,
  } as UpdateProps);
  const columns: ProColumns<API.Department>[] = [
    {
      title: '部门名称',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        true: { text: '启用', status: 'success' },
        false: { text: '停用', status: 'Warning' },
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '创建时间',
      valueType: 'option',
      width: 100,
      render: (_, record) => [
        <Button
          key={'edit'}
          type={'primary'}
          onClick={() => {
            setUpdateProps({ ...updateProps, open: true, department: record });
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          key={'delete'}
          title={'是否确认删除'}
          onConfirm={async () => {
            const { errorMessage } = await deleteDepartment({ id: record.id });
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
  return (
    <PageContainer>
      <AddDepartment
        open={openAddModal}
        onClose={(refresh?: boolean) => {
          if (refresh) {
            actionRef.current?.reload();
          }
          setOpenAddModal(false);
        }}
      />
      <UpdateDepartment
        {...updateProps}
        onClose={(refresh?: boolean) => {
          if (refresh) {
            if (refresh) {
              actionRef.current?.reload();
            }
          }
          setUpdateProps({ ...updateProps, open: false });
        }}
      />
      <ProTable
        expandable={{
          defaultExpandAllRows: true,
        }}
        actionRef={actionRef}
        search={false}
        rowKey={'id'}
        columns={columns}
        request={getDepartmentTree}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              setOpenAddModal(true);
            }}
          >
            <PlusOutlined />
            新增部门
          </Button>,
        ]}
      />
    </PageContainer>
  );
};
