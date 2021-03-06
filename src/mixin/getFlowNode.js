import { getFlowByCondition, getNodeByFlowCode } from '@/api/user-server.js';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      flowId: '',
      flowNodeList: []
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'realName',
      'orgName',
      'userInfo'
    ])
  },
  methods: {
    // 获取code
    getFlow(type) {
      const params = {
        flowType: type
      }
      return getFlowByCondition(params);
    },
    // 获取节点
    getFlowNode(data) {
      const playod = {
        flowCode: data.flowCode
      }
      return getNodeByFlowCode(playod);
    },
    // 
    getData(type) {
      const _this = this;
      _this.getFlow(type).then(res => {
        const data = res.data[0];
        return _this.getFlowNode(data);
      }).then(res => {
        if(res.success) {
          _this.flowId = res.data.id;
          _this.flowNodeList = res.data.flowNodeList;
        }
      })
    }
  }
}