import React from 'react';
import { Input, Form, Button, Checkbox, Select, Upload } from 'antd';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './style.scss';
import UploadImage from '../UploadImage';

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      changePassword: false,
    }
  }

  handleSubmit = values => {
    this.props.onSubmit(values);
  };

  handleChangePassword = (e) => {
    this.setState({
      changePassword: !this.state.changePassword,
    })
  }

  render() {
    const { loading, toggleOpen, user, degrees } = this.props;
    const { changePassword } = this.state;

    return (
      <Form ref={this.formRef} initialValues={user} onFinish={this.handleSubmit}>
        <div className="dashboardAccount">
          <div className="accountProfile">
            <UploadImage key='upload-image' name='profileImage' initialValue={user && user['profileImage'] && user['profileImage'].path || ''} />
          </div>
          <div className="accountForm">
            <div className="basicInfo">
              <h3>Basic Information</h3>

              <div className="form">
                <Form.Item name="name" rules={[{ required: true, message: 'Name is required'}]} className="formGroup fullwidth">
                  <Input type="text" placeholder="Name" />
                </Form.Item>
                <Form.Item name="mobileNumber" rules={[({getFieldValue}) => ({
                  validator(rule, value) {
                    const fieldLength = value.toString().length
                    if (fieldLength === 10) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Must have 10 characters');
                  },
                })]} className="formGroup">
                  <Input type="number" placeholder="Mobile Number" />
                </Form.Item>
                <Form.Item name="gender" rules={[{ required: false, message: 'Gender is required'}]} className="formGroup">
                  <Select placeholder="Gender">
                    <Select.Option value='Male'>Male</Select.Option>
                    <Select.Option value='Female'>Female</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="city" rules={[{ required: false, message: 'City is required'}]} className="formGroup">
                  <Input type="text" placeholder="City" />
                </Form.Item>
                <Form.Item name="pincode" className="formGroup">
                  <Input type="number" placeholder="Pincode"/>
                </Form.Item>
                <Form.Item name="qualification" className="formGroup">
                  <Select
                    placeholder="Education Qualification"
                    filterOption={(input, option) =>
                    (option.props.children + "").toLowerCase().indexOf((input + "").toLowerCase()) >= 0
                  }>
                    <Select.Option value='HighSchool'>High School</Select.Option>
                    <Select.Option value='Graduate'>Graduate</Select.Option>
                    <Select.Option value='PostGraduate'>Post Graduate</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="stream" className="formGroup">
                  <Select
                    placeholder="Stream"
                    showSearch
                    filterOption={(input, option) =>
                    (option.props.children + "").toLowerCase().indexOf((input + "").toLowerCase()) >= 0
                  }>
                    {
                      degrees && (degrees || []).map((item, index) => (
                        <Select.Option key={index} value={item._id}>{item.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>
                <h3  className="accountInfo">Account Information</h3>
                <Form.Item name="email" rules={[{ required: true, message: 'Email is required'}]} className="formGroup">
                  <input type="email" disabled placeholder="Email"/>
                </Form.Item>
                {
                  user && user.social && user.social.platform === 'none' && (
                    <React.Fragment>
                      <Form.Item name="oldPassword" rules={[{ required: true, message: 'Old Password is required'}]} className="formGroup">
                        <Input type="password" placeholder="Old Password"/>
                      </Form.Item>
                      <Form.Item className="changePasswordBtn">
                          <Button onClick={() => this.handleChangePassword()}>{changePassword ? 'Hide Change Password' : 'Change Password'}</Button>
                      </Form.Item>
                      {
                        changePassword && (
                          <React.Fragment>
                            <h3  className="accountInfo">Change Password</h3>
                            <Form.Item name="newPassword" className="formGroup" rules={[{
                              required: true,
                              message: 'New Password is Required!'
                            }, {
                              min: 6,
                              message: 'Must have more than 6 characters'
                            }]}>
                              <Input type="password" placeholder="New Password"/>
                            </Form.Item>
                            <Form.Item name="confirmPassword" dependencies={['newPassword']} rules={[{
                              required: true,
                              message: 'Confirm Password is Required!'
                            }, ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject('Password does not match!');
                              },
                            })
                            ]} className="formGroup">
                              <input type="password" placeholder="Confirm Password"/>
                            </Form.Item>
                          </React.Fragment>
                        )
                      }
                    </React.Fragment>
                  )
                }

                <Form.Item className="formGroup fullwidth">
                  <Button htmlType="submit">Save</Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

AccountForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object,
  loading: PropTypes.bool,
};

export default AccountForm;
