import { Form, Input, Button, Card } from 'antd'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { useLogin } from '@reportify/hooks/useLogin'
import { TLoginRequest } from '@reportify/types'
import { rules } from '@reportify/utils/rules'
import RequiredMark from '@reportify/components/RequiredMark'
import { color } from '@reportify/constant/color'
import { Icon } from '@iconify/react'

const Login = () => {
  const intl = useIntl()
  const [form] = Form.useForm()
  const { mutate: login, isPending } = useLogin()

  const onFinish = (values: TLoginRequest) => {
    login(values)
  }

  return (
    <div className='bg-login'>
      <Card
        style={{
          width: '100%',
          maxWidth: 420,
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
          border: '1px solid rgba(148,163,184,0.15)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: color.primary,
              marginBottom: 8,
            }}
          >
            {intl.formatMessage({ id: 'field.welcome' })}
          </h1>
          <p style={{ color: color.grey }}>
            {intl.formatMessage({ id: 'field.pleaselogin' })}
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          {/* Email */}
          <Form.Item
            name="email"
            label={
              <RequiredMark
                prefix={intl.formatMessage({ id: 'field.name' })}
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
                color: color.primary,
                textDecoration: 'none',
                fontSize: 14,
              }}
            >
              Lupa Kata Sandi?
            </Link>
          </div>

          {/* Submit */}
          <Form.Item style={{ marginTop: 24 }}>
            <Button
              htmlType="submit"
              loading={isPending}
              block
              style={{
                height: 48,
                borderRadius: 12,
                background: '#334155',
                color: '#fff',
                fontWeight: 600,
                border: 'none',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = '#475569')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = '#334155')
              }
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
