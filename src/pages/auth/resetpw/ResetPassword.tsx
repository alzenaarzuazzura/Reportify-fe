import { useIntl } from 'react-intl'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card, Form, Input, Button, Typography, Alert } from 'antd'

import useResetPassword from '@reportify/hooks/auth/useResetPassword'

import { color } from '@reportify/constant/color'
import RequiredMark from '@reportify/components/RequiredMark'
import { rules } from '@reportify/utils/rules'

const { Title, Text } = Typography

const ResetPassword = () => {
  const intl = useIntl()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      navigate('/login')
    } else {
      setToken(tokenParam)
    }
  }, [searchParams, navigate])

  const { formInstance, onSubmit, isLoading } = useResetPassword({
    token,
    onSuccess: () => {
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    },
  })

  if (!token) {
    return null
  }

  return (
    <div className="auth-bg">
      <Card className="auth-card">
        <div className="auth-header">
          <Title level={2}>{intl.formatMessage({ id: 'field.resetpassword' })}</Title>
          <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
            {intl.formatMessage({ id: 'msg.input.newpw' })}
          </Text>
        </div>

        <Alert
          message="Password minimal 8 karakter"
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Form
          form={formInstance}
          layout="vertical"
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="password"
            label={
              <RequiredMark
                prefix={intl.formatMessage({ id: 'field.password' })}
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

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            label={
              <RequiredMark
                prefix={intl.formatMessage({ id: 'field.confirmpassword' })}
              />
            }
            rules={[
              rules.required(
                intl.formatMessage({ id: 'global.rulesfield' })
              ),
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Password tidak cocok')
                  )
                },
              })              
            ]}            
          >
            <Input.Password
              prefix={<Icon icon='lucide:lock' style={{ color: color.grey }} />}
              placeholder={intl.formatMessage({
                id: 'input.exPassword',
              })}
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              loading={isLoading}
              block
              className="auth-btn"
            >
              {intl.formatMessage({ id: 'field.resetpassword'})}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default ResetPassword
