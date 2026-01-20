import { Card, Form, Input, Button, Typography } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import useForgotPassword from '@reportify/hooks/auth/useForgotPassword'

const { Title, Text } = Typography

const ForgotPassword = () => {
  const { formInstance, onSubmit, isLoading } = useForgotPassword({
    onSuccess: () => {
      // Optional: redirect atau tampilkan pesan sukses
    },
  })

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
            Lupa Kata Sandi
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
            Masukkan email Anda untuk menerima link reset password
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
            rules={[
              { required: true, message: 'Email wajib diisi' },
              { type: 'email', message: 'Format email tidak valid' },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: 'rgba(255,255,255,0.5)' }} />}
              placeholder="Email"
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
              Kirim Link Reset Password
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Link
              to="/login"
              style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
              }}
            >
              Kembali ke Login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default ForgotPassword
