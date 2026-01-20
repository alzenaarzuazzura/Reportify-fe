import { Card, Form, Input, Button, Typography, Alert } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useResetPassword from '@reportify/hooks/auth/useResetPassword'

const { Title, Text } = Typography

const ResetPassword = () => {
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
    <div className="bg-login">
      <Card
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(20px)',
          borderRadius: 16,
          boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
          border: '1px solid rgba(148,163,184,0.15)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ color: 'white', marginBottom: 8 }}>
            Reset Kata Sandi
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
            Masukkan password baru Anda
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
            rules={[
              { required: true, message: 'Password wajib diisi' },
              { min: 8, message: 'Password minimal 8 karakter' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(255,255,255,0.5)' }} />}
              placeholder="Password Baru"
              size="large"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Konfirmasi password wajib diisi' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('Password tidak cocok')
                  )
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(255,255,255,0.5)' }} />}
              placeholder="Konfirmasi Password"
              size="large"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isLoading}
              style={{
                height: 48,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default ResetPassword
