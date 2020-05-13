import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { toggleCreateModal } from 'core/redux/modals/actions';
import { createGravatar } from 'core/redux/gravatars/actions';

const CreateModal = (props) => {
  const { dispatchToggleCreateModal, dispatchCreateGravatar, createModal } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { displayName } = values;
    dispatchCreateGravatar(displayName);
    dispatchToggleCreateModal();
  };

  return (
    <Modal
      visible={createModal}
      title="Create Gravatar"
      okText="Submit"
      onCancel={() => dispatchToggleCreateModal()}
      footer={[
        <Button form="createGravatarForm" key="submit" htmlType="submit">
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          displayName: null,
        }}
        layout="vertical"
        name="createGravatarForm"
      >
        <Form.Item name="displayName" label="Gravatar Display Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchToggleCreateModal: () => dispatch(toggleCreateModal()),
  dispatchCreateGravatar: (displayName) => dispatch(createGravatar(displayName)),
});

export default connect(null, mapDispatchToProps)(CreateModal);
