const getters = {
  userName: state => state.user.userName,
  userId: state => state.user.userId,
  loginName: state => state.user.loginName,
  realName: state => state.user.realName,
  userPermissions: state => state.user.userPermissions,
  orgId: state => state.user.orgId,
  orgCode: state => state.user.orgCode,
  orgName: state => state.user.orgName
}
export default getters
