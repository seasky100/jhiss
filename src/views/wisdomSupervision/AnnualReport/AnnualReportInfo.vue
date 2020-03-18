<template>
  <div class="IndividualReport">
  <div class='i_left'>
    <div class='i_title'>
      <div class='item'>报告人基本情况</div>
    </div>
    <div class='i_report'>个人有关事项报告表（一）</div>

    <div v-for="(item,index) in routeAMap"  :key="index">
      <div class="item label">
      <div :class="{'active': ind == index}" @click='goTo(index,item.id)'>{{item.label}}</div>
    </div>
    </div>
  </div>
  <div class='i_center'></div>
  <div class='i_right'></div>
  </div>
</template>
<script>
  import MaritalStatus from '../../wisdomSupervision/org_report_apply/Marital_status.vue';
export default {
  components: {
    MaritalStatus
  },
  name: "AnnualReportInfo",
  data() {
    return {
      ind:'',
    routeAMap : [
    {label: '1. 本人的婚姻情况',path: 'IndividualReport'},
    {label: '2-1. 本人持有普通护照的情况'},
    {label: '2-2. 本人因私出国的情况'},
    {label: '3-1. 本人持有往来港澳通行证，因私持有大陆居民往来台湾通行证的情况'},
    {label: '3-2. 本人因私往来港澳、台湾的情况'},
    {label: '4. 子女与外国人、无国籍人通婚的情况'},
    {label: '5. 子女与港澳及台湾居民通婚的情况'},
    {label: '6-1. 配偶、子女移居国（境）外的情况'},
    {label: '6-2. 配偶、子女虽未移居国（境）外，但连续在国（境）外工作，生活一年以上情况'},
    {label: '7. 配偶、子女及其配偶从业情况'},
    {label: '8. 配偶、子女与其配偶被司法机关追究刑事责任的情况'}
    ],
    }
  },
  watch: {},
  mounted() {
    var items = document.getElementsByClassName('item')
    for (let i = 0; i < items.length; i++) {
      items[i].onmouseover = function (){
        for (let i = 0; i < items.length; i++) {
          items[i].style.backgroundColor ='white'
        }
        this.style.backgroundColor = '#409eff'
        this.style.fontColor = 'white'
      }     
    }
    for (let i = 0; i < items.length; i++) {
      items[i].onmouseout = function (){
        this.style.backgroundColor = 'white'
      }
    }
    this.init()
  },
  methods: {
		init() {

      // this.query();
    },
    goTo(index,id){
      this.ind = index
      debugger

    }
  }
}
</script>
<style lang="stylus" scoped>
  .IndividualReport{
    width: 100%;
    height: 100%;
    display: flex;
  }
  .i_left{
    width: 15%;
    height: 100%;
    background-color: white;
  }
  .i_right{
    width: 84%;
    height: 100%;
    background-color: white;
  }
  .i_center{
    height: 100%;
    width: 10px
  }
  .i_title{
    color: rgb(31, 51, 73);
    font-weight: 700; 
    margin-top: 40px;
    margin-left: 24px;
    font-size: 15px;
    cursor: pointer;
  }
  .i_report{
    padding: 0px 24px; 
  }
  .label{
    cursor: pointer;
    margin-left: 40px;
    margin-bottom: 20px;
    margin-top: 20px;
    color: rgb(31, 51, 73);
    font-size: 13px;
    font-weight: 700;
  }
  .active{
    background: #409eff;
    color: white
  }
</style>
