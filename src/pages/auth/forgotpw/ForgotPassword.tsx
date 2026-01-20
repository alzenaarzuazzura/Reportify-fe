import { useIntl } from 'react-intl'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { Card, Form, Input, Button, Typography } from 'antd'

import RequiredMark from '@reportify/components/RequiredMark'

import useForgotPassword from '@reportify/hooks/auth/useForgotPassword'

import { rules } from '@reportify/utils/rules'
import { color } from '@reportify/constant/color'

import '../auth.css'

const { Title, Text } = Typography

const ForgotPassword = () => {
  const intl = useIntl()

  const { formInstance, onSubmit, isLoading } = useForgotPassword({
    onSuccess: () => {
      // optional success handler
    },
  })

  return (
    <div className="auth-bg">
      <Card className="auth-card">
        <div className="auth-header">
          <Title level={2}>{intl.formatMessage({ id: 'field.forgotpassword' })}</Title>
          <Text>
            {intl.formatMessage({ id: 'msg.input.email' })}
          </Text>
        </div>

        <Form
          form={formInstance}
          layout="vertical"
          onFinish={onSubmit}
          autoComplete="off"
        >
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
              size="large"
              prefix={<Icon icon='lucide:mail' style={{ color: color.grey }} />}
              placeholder={intl.formatMessage({
                id: 'input.exEmail',
              })}
            />
          </Form.Item>

          <Button
            htmlType="submit"
            block
            size="large"
            loading={isLoading}
            className="auth-btn"
          >
            {intl.formatMessage({ id: 'msg.send.link.rstpw' })}
          </Button>

          <div className="auth-footer">
            <Link to="/login">{intl.formatMessage({ id: 'msg.back.to.login' })}</Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default ForgotPassword
