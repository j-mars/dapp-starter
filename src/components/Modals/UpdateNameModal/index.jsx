import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { toggleUpdateNameModal } from 'core/redux/modals/actions';
import { updateGravatar } from 'core/redux/gravatars/actions';
import styles from '../style.module.scss';

const UpdateGravatar = (props) => {
  const { dispatchToggleUpdateNameModal, dispatchUpdateGravatar, updateNameModal } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { displayName } = values;
    dispatchUpdateGravatar(displayName);
    dispatchToggleUpdateNameModal();
  };

  return (
    <Modal
      visible={updateNameModal}
      title="Update Gravatar Name"
      okText="Submit"
      onCancel={() => dispatchToggleUpdateNameModal()}
      footer={[
        <div className={styles.sendButton}>
          <Button form="updateGravatarNameForm" key="submit" htmlType="submit">
            Submit
          </Button>
        </div>,
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

const mapDispatchToProps = (dispatch) => ({
  dispatchToggleUpdateNameModal: () => dispatch(toggleUpdateNameModal()),
  dispatchUpdateGravatar: (displayName) => dispatch(updateGravatar(displayName)),
});

export default connect(null, mapDispatchToProps)(UpdateGravatar);
