import { useIntl } from 'react-intl'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Card, Typography } from 'antd'

import RequiredMark from '@reportify/components/RequiredMark'

import { useLogin } from '@reportify/hooks/useLogin'

import { rules } from '@reportify/utils/rules'
import { color } from '@reportify/constant/color'

import { TLoginRequest } from '@reportify/types'

const { Title, Text } = Typography

const Login = () => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const { mutate: login, isPending } = useLogin()

  const onFinish = (values: TLoginRequest) => {
    login(values)
  }

  return (
    <div className='auth-bg'>
      <Card className='auth-card'>
        {/* Header */}
        <div className="auth-header">
          <img
            src="/logo-reportify.png"
            alt="Reportify Logo"
            style={{
              height: 30,
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          />          
          <Title level={2}>{intl.formatMessage({ id: 'field.welcome' })}</Title>
          <Text>
            {intl.formatMessage({ id: 'field.pleaselogin' })}
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* Email */}
          <Form.Item
            name="email"
            label={
              <RequiredMark
                prefix={intl.formatMessage({ id: 'field.email' })}
              />
            }
            rules={[
              rules.required(
                intl.formatMessage({ id: 'global.rulesfield' })
              ),
            ]}
          >
            <Input
              prefix={<Icon icon='lucide:mail' style={{ color: color.grey }} />}
              placeholder={intl.formatMessage({
                id: 'input.exEmail',
              })}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label={
              <RequiredMark
                prefix={intl.formatMessage({
                  id: 'field.password',
                })}
              />
            }
            rules={[
              rules.required(
                intl.formatMessage({ id: 'global.rulesfield' })
              ),
            ]}
          >
            <Input.Password
              prefix={<Icon icon='lucide:lock' style={{ color: color.grey }} />}
              placeholder={intl.formatMessage({
                id: 'input.exPassword',
              })}
            />
          </Form.Item>

          {/* Forgot Password Link */}
          <div style={{ textAlign: 'right', marginBottom: 16 }}>
            <Link
              to="/forgot-password"
              style={{
                color: color.white,
                textDecoration: 'none',
                fontSize: 14,
              }}
            >
              {intl.formatMessage({ id: 'field.forgotpassword' })}?
            </Link>
          </div>

          {/* Submit */}
          <Form.Item style={{ marginTop: 24 }}>
            <Button
              htmlType="submit"
              loading={isPending}
              block
              className="auth-btn"
            >
              {intl.formatMessage({ id: 'button.come' })}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
