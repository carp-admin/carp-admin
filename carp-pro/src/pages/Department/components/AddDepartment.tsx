import {
  ModalForm,
  ProFormInstance,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { createDepartment, getDepartmentTree } from '@/services/carp-admin/department';
import { useRef } from 'react';
interface Props {
  open: boolean;
  onClose: (refresh?: boolean) => void;
}
export default ({ onClose, open }: Props) => {
  const formRef = useRef<ProFormInstance>();
  return (
    <ModalForm
      formRef={formRef}
      modalProps={{
        maskClosable: false,
        onCancel: () => {
          onClose();
        },
        afterClose: () => {
          formRef.current?.resetFields();
        },
      }}
      open={open}
      title={'新增部门'}
      layout={'horizontal'}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      onFinish={async (v) => {
        const { errorMessage } = await createDepartment(v as API.CreateDepartmentDto);
        if (errorMessage) {
        } else {
          onClose(true);
        }
      }}
    >
      <ProFormText label={'部门名称'} rules={[{ required: true, type: 'string' }]} name={'name'} />
      <ProFormTreeSelect
        name={'parentId'}
        allowClear
        // @ts-ignore
        request={async () => {
          const { data } = await getDepartmentTree();
          return data;
        }}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id', children: 'children' },
        }}
        label={'上级部门'}
      />
      <ProFormSwitch
        name={'status'}
        label={'状态'}
        fieldProps={{
          checkedChildren: '开启',
          unCheckedChildren: '停用',
        }}
      />
      <ProFormTextArea name={'remark'} label={'备注'} />
    </ModalForm>
  );
};
