import { Button, Tooltip, message } from 'antd'
import { WhatsAppOutlined, MailOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { sendPasswordSetup } from '@reportify/services/api/teacher'

type TSendWaEmailProps = {
  teacherId: number
  teacherName: string
  phone?: string | null
}

const SendWaEmailButton = ({ teacherId, teacherName, phone }: TSendWaEmailProps) => {
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    try {
      setLoading(true)
      const result = await sendPasswordSetup(teacherId)

      if (result.status) {
        const channel = phone ? 'WhatsApp' : 'Email'
        message.success(`Link set password berhasil dikirim via ${channel} ke ${teacherName}`)
      } else {
        message.error(result.message || 'Gagal mengirim link set password')
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Gagal mengirim link set password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tooltip title={phone ? 'Kirim via WhatsApp' : 'Kirim via Email'}>
      <Button
        type="primary"
        icon={phone ? <WhatsAppOutlined /> : <MailOutlined />}
        size="small"
        loading={loading}
        onClick={handleSend}
        style={{
          backgroundColor: phone ? '#25D366' : '#1890ff',
          borderColor: phone ? '#25D366' : '#1890ff',
        }}
      />
    </Tooltip>
  )
}

export default SendWaEmailButton
