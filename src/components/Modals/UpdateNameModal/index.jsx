import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { toggleUpdateNameModal } from 'core/redux/modals/actions';

const UpdateGravatar = (props) => {
  const { dispatchToggleUpdateNameModal, updateNameModal } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    dispatchToggleUpdateNameModal();
  };

  return (
    <Modal
      visible={updateNameModal}
      title="Update Gravatar Name"
      okText="Submit"
      onCancel={() => dispatchToggleUpdateNameModal()}
      footer={[
        <Button form="updateGravatarNameForm" key="submit" htmlType="submit">
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
        name="updateGravatarNameForm"
      >
        <Form.Item name="displayName" label="Gravatar Display Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  updateNameModal: state.modals.updateNameModal,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchToggleUpdateNameModal: () => dispatch(toggleUpdateNameModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGravatar);
