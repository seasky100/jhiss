<template>
<div>
  <gm-tree-select
    :disabled="disabled"
    :treeData="orgData"
    :props="treeConfig"
    v-model="orgId"
    :name.sync="orgName"
    :placeholder="placeholder"
    clearable>
  </gm-tree-select>
</div>

</template>

<script>
import { mapGetters } from 'vuex';
import gmTreeSelect from '../components/gmTreeSelect'
import { transferToFlatTree } from '../utils/tree-data-handle'
export default {
  name: 'orgSelect',
  model: {
    prop: 'value',
    event: 'selected'
  },
  components: {
    gmTreeSelect
  },
  props: {
    value: String,
    label: String,
    disabled: Boolean,
    orgLabel: {},
    placeholder: {
      type: String,
      default: '所属部门'
    }
  },
  data() {
    this.treeConfig = {
      value: 'id',
      label: 'name',
      children: 'childrens'
    };
    return {
      orgId: '',
      orgName: ''
    }
  },
  created() {
    if (this.orgLabel && !this.orgId) {
      const orgDataCopy = JSON.parse(JSON.stringify(this.orgData))
      const flatOrgData = transferToFlatTree(orgDataCopy, 'childrens')
      const org = flatOrgData.find((item) => item.name === this.orgLabel)
      this.orgId = org.id
    }
  },
  computed: {
    ...mapGetters([
      'orgData'
    ])
  },
  watch: {
    orgName(val) {
      this.$emit('update:orgLabel', val)
    },
    orgId() {
      this.$emit('selected', this.orgId)
      this.$emit('change');
    },
    value(val) {
      this.orgId = this.value;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
