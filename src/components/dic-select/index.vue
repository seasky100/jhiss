<template>
  <el-select
    :disabled="readonly"
    :value="value"
    @change="change"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
const dictionary = [
  {
    type: '业务字段',
    label: '通报问题性质',
    childrens: [
      {
        id: '11',
        label: '违反组织纪律',
        value: '1'
      }
    ]
  },
  {
    type: '业务字段',
    label: '健康状态',
    childrens: [
      {
        id: '222',
        label: '健康',
        value: '1'
      },
      {
        id: '333',
        label: '亚健康',
        value: '2'
      }
    ]
  }
]
export default {
  props: {
    value: {},
    type: {
      type: String,
      require: true
    },
    readonly: {
      default: false,
      type: Boolean
    }
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  data() {
    return {

    }
  },
  computed: {
    options:function(){
      let childrens = [];
      if (dictionary) {
        dictionary.forEach((item) => {
          if (item.label === this.type) {
            childrens = item.childrens;
          }
        });
      }
      return childrens;
    }
  },
  watch: {
    value: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.change(newVal);
        }
      },
      immediate: true //字段初始化时就开始验证
      // deep: true  //对属性也监听
    }
  },
  methods: {
    change(value) {
      this.$emit('valueChange', value);

      let item = this.options.find((temp) => {
        return temp.value === value;
      });
      if (item) {
        this.$emit('update:label', item.label);
      }
    }
  }
}
</script>
