import { Card, Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

import useChangePassword from '@reportify/hooks/auth/useChangePassword';
import { Helmet } from 'react-helmet-async';

const ChangePassword = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { changePassword, isLoading } = useChangePassword();
  const title = intl.formatMessage({ id: 'field.changepw' })  

  const onFinish = (values: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    const { currentPassword, newPassword } = values;
    changePassword(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          form.resetFields();
        },
      }
    );
  };

  return (
    <>
      <Helmet title={title} />

      <div className="pt-4">
        <div className="title-underline">
          <h5 style={{ margin: 0 }}>{title}</h5>
        </div>
      </div>    
        <Card style={{ maxWidth: 600, margin: '0 auto', borderRadius: '12px' }}>
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#666', margin: 0 }}>
              {intl.formatMessage({ id: 'profile.securityDescription' })}
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label={intl.formatMessage({ id: 'field.currentPassword' })}
              name="currentPassword"
              rules={[
                { 
                  required: true, 
                  message: intl.formatMessage({ id: 'validation.currentPasswordRequired' }) 
                }
              ]}
            >
              <Input.Password 
                placeholder={intl.formatMessage({ id: 'input.currentPassword' })}
                size="large"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              label={intl.formatMessage({ id: 'field.newPassword' })}
              name="newPassword"
              rules={[
                { 
                  required: true, 
                  message: intl.formatMessage({ id: 'validation.newPasswordRequired' }) 
                },
                { 
                  min: 8, 
                  message: intl.formatMessage({ id: 'validation.passwordMinLength' }) 
                }
              ]}
            >
              <Input.Password 
                placeholder={intl.formatMessage({ id: 'input.newPassword' })}
                size="large"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              label={intl.formatMessage({ id: 'field.confirmpassword' })}
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { 
                  required: true, 
                  message: intl.formatMessage({ id: 'validation.confirmPasswordRequired' }) 
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(intl.formatMessage({ id: 'validation.passwordNotMatch' }))
                    );
                  },
                }),
              ]}
            >
              <Input.Password 
                placeholder={intl.formatMessage({ id: 'input.confirmPassword' })}
                size="large"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<LockOutlined />}
                loading={isLoading}
                size="large"
                block
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  height: '48px',
                  borderRadius: '12px',
                  fontWeight: 600,
                }}
              >
                {intl.formatMessage({ id: 'button.changePassword' })}
              </Button>
            </Form.Item>
          </Form>

          <div style={{ 
            marginTop: 24, 
            padding: '16px', 
            background: '#f0f7ff', 
            borderRadius: '8px',
            border: '1px solid #d6e4ff'
          }}>
            <h4 style={{ marginBottom: 8, color: '#1890ff' }}>
              💡 {intl.formatMessage({ id: 'profile.securityTips' })}:
            </h4>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#666' }}>
              <li>{intl.formatMessage({ id: 'profile.tip1' })}</li>
              <li>{intl.formatMessage({ id: 'profile.tip2' })}</li>
              <li>{intl.formatMessage({ id: 'profile.tip3' })}</li>
              <li>{intl.formatMessage({ id: 'profile.tip4' })}</li>
            </ul>
          </div>
        </Card>
    </>
  );
};

export default ChangePassword;
