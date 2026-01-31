import ProfileInfoContainer from '@reportify/components/Profile'

const AdminProfileInfo = () => {
  return (
    <ProfileInfoContainer
      showAlert
      redirectPath="/admin/teachers"
    />
  )
}

export default AdminProfileInfo
