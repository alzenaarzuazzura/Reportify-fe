import { Card, Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';

import { changePassword } from '@reportify/services/api/profile';
import { TChangePassword } from '@reportify/types/data/profile';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      message.success('Password berhasil diubah');
      form.resetFields();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Gagal mengubah password');
    },
  });

  const onFinish = (values: TChangePassword) => {
    mutation.mutate(values);
  };

  return (
    <Card style={{ maxWidth: 600, margin: '0 auto', borderRadius: '12px' }}>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Keamanan Akun</h3>
        <p style={{ color: '#666', margin: 0 }}>
          Pastikan password Anda kuat dan unik untuk menjaga keamanan akun
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Password Lama"
          name="currentPassword"
          rules={[{ required: true, message: 'Password lama harus diisi' }]}
        >
          <Input.Password 
            placeholder="Masukkan password lama" 
            size="large"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item
          label="Password Baru"
          name="newPassword"
          rules={[
            { required: true, message: 'Password baru harus diisi' },
            { min: 6, message: 'Password minimal 6 karakter' }
          ]}
        >
          <Input.Password 
            placeholder="Masukkan password baru" 
            size="large"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item
          label="Konfirmasi Password Baru"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Konfirmasi password harus diisi' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Password tidak cocok'));
              },
            }),
          ]}
        >
          <Input.Password 
            placeholder="Konfirmasi password baru" 
            size="large"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<LockOutlined />}
            loading={mutation.isPending}
            size="large"
            block
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              height: '48px',
              borderRadius: '12px',
              fontWeight: 600,
            }}
            onClick={() => navigate('/login')}
          >
            Ubah Password
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
        <h4 style={{ marginBottom: 8, color: '#1890ff' }}>💡 Tips Keamanan Password:</h4>
        <ul style={{ margin: 0, paddingLeft: 20, color: '#666' }}>
          <li>Gunakan minimal 6 karakter</li>
          <li>Kombinasikan huruf besar, kecil, angka, dan simbol</li>
          <li>Jangan gunakan informasi pribadi yang mudah ditebak</li>
          <li>Ubah password secara berkala</li>
        </ul>
      </div>
    </Card>
  );
};

export default ChangePassword;
