<template>
  <div class="report-container">
		<div class="report-title">
      <span>个人有关事项报告</span>
      <span style="color:red;" @click="headerParamClick">
        注：点击此处可获取对象数据参数
      </span>
    </div>
		<div class="report-body">
      <div class="list report_list" style="width:400px;border-right:1px solid #a5a2a2;">
        <div style="border-bottom:1px solid #a5a2a2;padding-bottom:5px;">
          <el-button v-for="(item,index) of menuBtn" :key="index"
            :class="['menuBtn',index == menu_active? 'menuBtnselect':'']"
            autofocus
            @click="BtnClick(index)"
            :type="item.type"
            plain>
              {{item.label}}
          </el-button>
        </div>
        <div class="menu_list">
          <div :class="['list_son',index==list_active?selectClass:'']" 
            @click="listClick(index)"
            v-for="(item,index) of menu_active == 0?reportList:menu_active == 1?reportList2:menu_active == 2?reportList3:reportList4" :key="index">
            {{index + 1}}. {{item.label}}
          </div>
        </div>
      </div>
      <div class="list report_content">
        <div class="reportTable" ref="printCon" id="printCon">
          <!-- <AnnualReportInfo :key="list_active"
            v-if="menu_active == 2 && list_active == 0">
          </AnnualReportInfo>
          <e-table-report v-else :key="list_active"
            :title="reportTitle" 
            :headerTab="headerTab"
            :headerParam="headerParam"
            :headerAppend="headerAppend"
            :columns="columns" 
            :tableData="tableData"
            :appendTab="appendTab"
            @editData="editDataSave"
            >
          </e-table-report> -->
          <!-- :headerParam="item.headerParam ? item.headerParam : {}" -->
          <AnnualReportInfo :key="list_active"></AnnualReportInfo>
          <div v-for="(item,index) of tableDataList" :key="index+'_tableCon'" ref="table_box">
            <e-table-report
              :title="index < 11 ? reportList2[index]: reportList3[index - 11]" 
              :headerTab="item.headerTab ? item.headerTab : 1"
              :headerParam="headerParam"
              :headerAppend="item.headerAppend ? recursionList(JSON.stringify([...item.headerAppend])): []"
              :columns="recursionList(JSON.stringify([...item.columns]))" 
              :tableData="[...item.data]"
              :appendTab="item.appendTab"
              @editData="editDataSave"
              >
            </e-table-report>
          </div>
          <div ref="others">
            <h2 style="font-weight:bold;font-size 18px;margin-bottom:5px;">个人认为需要报告的其他事项</h2>
            <el-input type="textarea" style="width:99%;"
              :autosize="{ minRows: 4}"
              placeholder="请输入个人认为需要报告的其他事项" 
              v-model="othersReport"></el-input>
          </div>
        </div>
        <!-- <el-button v-print="'#printCon'">打印</el-button> -->
        <el-button @click="PrintRow">打印</el-button>
      </div>
		</div>
  </div>
</template>
<script>
// import { format } from 'date-fns';
import AnnualReportInfo from './AnnualReportInfo'
import tableData from '../DeclarationTemplate/eventsTemplate.js'
let { tableData1, tableData2 } = tableData
export default {
  name: 'AnnualReportAdd',
  components: { AnnualReportInfo },
  provide () {
    return {
      orgAdd: this
    }
  },
  data() {
    return {
      menu_active: 0,
      menuBtn: [
        {label: '基本信息', type: 'primary'},
        {label: '报表一', type: 'primary'},
        {label: '报表二', type: 'primary'},
        {label: '其他', type: 'primary'},
      ],
      list_active: 0,
      selectClass: 'selectClass',
      reportList: [
        {
          label: '本人基本信息情况', 
          explain: `说明：①工作单位应填写全称或规范简称，同时担任多个职务的，请逐个分行填写。②身份证号码应填写18位公民身份号码。③户籍地址应填写居民户口簿“住址”栏的详细地址。④家庭主要成员包括配偶、子女及其配偶等；主要社会关系主要包括本人和配偶的兄弟姐妹等；本人和配偶的父母视情在“家庭主要成员”和“主要社会关系”中进行填报。首次填报的，应把内容填写完整；再次填报的，填写变化情况。`
        },
      ],
      reportList2: [
        {label: '本人的婚姻情况', explain: `说明：①首次填报的，应填写婚姻现状，在未婚、已婚、离异、丧偶对应的□内划“√”。②继续填报的，婚姻无变化的，在“无变化”后的□内划“√”；婚姻发生变化的，在结婚、离婚、丧偶、再婚对应的□内划“√”，并填写变化时间。`},
        {label: '本人持有普通护照的情况', explain: `说明：①普通护照即因私护照，不含公务普通护照。②首次填报的，无此类情况的，应在“护照号”列下方空格内填写“无”；有此类情况的，应填写填报时的有效普通护照情况，以及上一年1月1日以来截至填报日失效的普通护照情况。③继续填报的，应先在表格右上方“有变化”或“无变化”后的□内划“√”，有变化的在表格内填写变化情况。`},
        {label: '本人因私出国的情况', explain: `说明：①填写时，应先在表格右上方“有此类情况”或“无此类情况”后的□内划“√”。②有此类情况的，首次填报的，填写上一年1月1日以来截至填报日的因私出国情况；继续填报的，填写上次填报以来的因私出国情况。③所到国家应填报从出国至回国期间到过的所有国家，含过境签的国家。④事由主要包括探亲、访友、学术交流、就医、旅游、继承、接受和处理财产等。`},
        {label: '本人持有往来港澳通行证、因私持有大陆居民往来台湾通行证的情况', explain: `说明：①首次填报的，无此类情况的，应在“证件名称”列下方空格内填写“无”；有此类情况的，应填写填报时的有效证件情况，以及上一年1月1日以来截至填报日失效的证件情况。②继续填报的，应先在表格右上方“有变化”或“无变化”后的□内划“√”，有变化的在表格内填写变化情况。`},
        {label: '本人因私往来港澳、台湾的情况', explain: `说明：①填写时，应先在表格右上方“有此类情况”或“无此类情况”后的□内划“√”。②有此类情况的，首次填报的，填写上一年1月1日以来截至填报日因私往来港澳、台湾的情况；继续填报的，填写上次填报以来因私往来港澳、台湾的情况。③事由主要包括探亲、访友、学术交流、就医、旅游、继承、接受和处理财产等。`},
        {label: '子女与外国人、无国籍人通婚的情况', explain: `说明：①首次填报的，无此类情况的，应在“子女姓名”列下方空白处填写“无”；有此类情况的，应填写现状。②继续填报的，应先在表格右上方“有变化”或“无变化”后的□内划“√”，有变化的在表格内填写变化情况。`},
        {label: '子女与港澳以及台湾居民通婚的情况', explain: `说明：①首次填报的，无此类情况的，应在“子女姓名”列下方空白处填写“无”；有此类情况的，应填写现状。②继续填报的，应先在表格右上方“有变化”或“无变化”后的□内划“√”，有变化的在表格内填写变化情况。`},
        {label: '配偶、子女移居国（境）外的情况', explain: `说明：①首次填报的，无此类情况的，应在“姓名”列下方空白处填写“无”；有此类情况的，应填写现状。②继续填报的，应先在表格右上方“有变化”或“无变化”后的□内划“√”，有变化的在表格内填写变化情况。③“移居国（境）外”是指取得外国国籍或者获取国（境）外永久居留资格、长期居留许可等情况。④配偶、子女原本就是外国公民或者香港、澳门、台湾居民的，也属于“移居国（境）外”情形。⑤应报告配偶和子女均已移居国（境）外的情况，也应报告配偶、子女中任何一人已移居国（境）外的情况。⑥“备注”栏填写移居国（境）外的变化情况，比如“已放弃”“无法放弃但已被列为公安机关登记备案人员”等。`},
        {label: '配偶、子女虽未移居国（境）外，但连续在国（境）外工作、生活一年以上的情况', explain: `说明：①首次填报的，无此类情况的，应在“姓名”列下方空白处填写“无”；有此类情况的，应填写现状。②继续填报的，应先在表格右上方“有变化”或“无变化”后的□内划“√”，有变化的在表格内填写变化情况。③配偶、子女“虽未移居国（境）外，但连续在国（境）外工作、生活一年以上”是指干部的配偶、子女虽然没有取得外国国籍或者获取国（境）外永久居留资格、长期居留许可，但截至填报日连续在国（境）外工作、生活（含留学）一年以上的情况。④在国（境）外工作、生活期间，因探亲、旅行、出差等短期回国（入境）的，仍视为连续在国（境）外工作、生活。`},
        {label: '配偶、子女及其配偶从业情况', explain: `说明：①首次填报的，应填写现状。②继续填报的，应先在表格右上方“有变化”或“无变化”后的□内划“√”，有变化的在表格内填写变化情况。子女无配偶的，应在“配偶姓名”列下方空格内填写“无”。③未从业人员应填写就读情况、学龄前或待业等；退休人员应填写退休前工作单位及原任职务，退休后再就业的，再就业情况一并填写。④持有居民身份证的，填写18位公民身份证号码；同时持有军官证等其他证件的，证件情况填写在“个人认为需要报告的其他事项”栏。⑤受聘担任私营企业高级职务，或在外商投资企业、在中国境内从事生产经营活动的外国（地区）企业、以及外国（地区）企业常驻境内代表机构、境外非政府组织在境内设立的代表机构中担任由外方委派、聘任的高级职务的，需在“是否担任高级职务”栏“是”后的□内划“√”。⑥外商投资企业（含港澳台地区投资企业），包括外商独资企业、中外合资经营企业和中外合作经营企业。⑦关于“高级职务”，对上市公司，以公司章程对经营管理层的具体设定为准；对具有独立法人资格的非上市企业，以其章程对经营管理层的具体设定为准。“高级职务”一般包括：法定代表人、正副董事长、董事、监事、正副经理（总裁）、总会计师（财务总监）、上市公司董事会秘书等，以及外国（地区）企业常驻代表机构、境外非政府组织境内代表机构的首席代表、代表。`},
        {label: '配偶、子女及其配偶被司法机关追究刑事责任的情况', explain: `说明：①填写时，应在表格右上方“有此类情况”或“无此类情况”后的□内划“√”。②有此类情况的，填写截至填报日配偶、子女及其配偶被追究刑事责任的情况。`},
      ],
      reportList3: [
        {label: '本人的工资及各类奖金、津贴、补贴等（万元/全年）', explain: `说明：①应填报本人上一年（1月1日至12月31日）扣除所得税、养老保险、医疗保险、职业年金等后的工资及各类奖金、津贴、补贴等全年实际所得的情况。②住房公积金包括个人缴纳部分和单位缴纳部分，计入工资收入。`},
        {label: '本人从事讲学、写作、咨询、审稿、书画等劳务所得（万元/全年）', explain: `说明：①无此类情况的，在“无此类情况”后的□内划“√”。②有此类情况的，应先在表格右上方“有此类情况”后的□内划“√”，再填报本人上一年（1月1日至12月31日）扣除所得税后的讲学、写作、咨询、审稿、书画等劳务所得的情况，并填写具体金额。`},
        {label: '本人、配偶、共同生活的子女为所有权人或者共有人的房产情况', explain: `说明：①首次填报的，应填写现状。无房产的，应在“产权人”列下方空格处填写“无”；有房产的，应在表格内详细完整填写。②继续填报的，应先在表格右上方“有变化”或“无变化”后的□内划“√”，有变化的在表格内详细填写上次填报以来的变化情况。③填写变化情况时，既要填写购买、继承、接受赠与等方式获取的房产情况，也要填写出售、赠与他人等方式处置房产的情况。④应填报本人、配偶、共同生活的子女名下的所有房产，包括本人、配偶、共同生活的子女为所有权人的房产，以及本人、配偶、共同生活的子女为共有权人的房产。⑤房产是共有产权的，应填写所有的产权人姓名，同时在“产权人”栏中注明共有方式（共同共有或按份共有），其中按份共有的应注明所占份额。⑥房产性质和功能类型主要包括商品房、福利房、经济适用房、限价房、自建房以及有单独产权证书的车库、车位、储藏间等。厂房、商铺、酒店式公寓等房产，也需要填报。租住的房屋，租赁的车库、车位、储藏间等，不需要填报。⑦已取得不动产权证、房屋所有权证的，具体地址、建筑面积、房产性质和功能类型等以证书记载的信息为准；尚未取得不动产权证、房屋所有权证的，以房屋买卖合同记载的信息为准。与他人共有的房产，“建筑面积”应填写整套房产的建筑面积。⑧在国（境）外（包括香港、澳门、台湾）的房产情况，填写在“国（境）外的投资情况”事项中。`},
        {label: '本人、配偶、共同生活的子女投资或者以其他方式持有股票的情况', explain: `说明：①填报时，应先在表格右上方“有此类情况”或“无此类情况”后的□内划“√”。②有此类情况的，应逐人、逐只填写持有的所有股票的名称或代码、持股数量、填报前一交易日收盘时的市值（市值=单只持股数量×收盘时股价），并合计填写填报前一交易日所有股票的总市值。③通过“港股通”购买的股票，也需要填报。开通融资融券账户购买的股票，应当在“备注”栏注明融资融券使用额度等情况。④在国（境）外（包括香港、澳门、台湾）的持有股票情况，填写在“国（境）外的投资情况”事项中。⑤持有非上市公司股份的情况应在“备注”栏注明。`},
        {label: '本人、配偶、共同生活的子女投资或者以其他方式持有基金的情况', explain: `说明：①填报时，应先在表格右上方“有此类情况”或“无此类情况”后的□内划“√”。②有此类情况的，应逐人、逐只填写持有的所有基金的名称或代码、份额、填报前一交易日收盘时的净值（净值=单只基金份数×收盘时单位净值），并合计填写填报前一交易日所有基金的总净值。③通过证券公司、商业银行、互联网等各类基金销售机构购买的理财产品中属于基金的产品（含以理财形式为名的各种形式的集合资产管理计划），均需填报。④在国（境）外（包括香港、澳门、台湾）的持有基金情况，填写在“国（境）外的投资情况”事项中。`},
        {label: '本人、配偶、共同生活的子女投资或者以其他方式持有投资型保险的情况', explain: `说明：①填报时，应先在表格右上方“有此类情况”或“无此类情况”后的□内划“√”。有此类情况的，应逐人、逐单填写持有的所有投资型保险的保险产品全称、保单号、保险公司名称、以及累积缴纳的保费、投资金等，并合计填写所有保单累计缴纳保费、投资金总额。②投资型保险，包括人身保险投资型保险和财产保险投资型保险两类。③“人身保险投资型保险”，是指截至填报日仍然生效的，在人寿保险公司、健康保险公司或养老保险公司等购买的，保险产品名称中含有“两全保险”“年金保险”“投资连结型”或“万能型”等字样的保险产品。④“财产保险投资型保险”，是指截至填报日仍然生效的，向财产保险公司缴纳投资金（包括保险储金、投资金、保障金、投资认购金等），获取保险保障，并按合同约定取得本金及其收益（亏损）的财产保险产品。“财产保险投资型保险”可通过中国保险协会网站（www.iachina.cn，“保险产品”专栏）公开的《财产保险投资型保险产品名录》进行查询。⑤应填报本人、配偶、共同生活的子女是投保人的保单信息。⑥截至填报日已经失效的投资型保险，无需填报。⑦在国（境）外（包括香港、澳门、台湾）的持有投资型保险情况，填写在“国（境）外的投资情况”事项中。`},
        {label: '配偶、子女及其配偶经商办企业的情况', explain: `说明：①首次填报的，有此类情况的，应填写截至填报日的现状；无此类情况的，在表格的“姓名”栏内填写“无”。②继续填报的，应先在表格右上方“有变化”和“无变化”后的□内划“√”，有变化的在表格内填写变化情况。③企业或市场主体名称发生变化的，须在“备注”栏注明原名称。注册地填写到市（地、州、盟）。经营地填写到省（区、市）或市（地、州、盟），可填多个区域。④填写时，应按照工商（市场监管）部门登记的最新情况逐项填写。股份有限公司、有限责任公司应填报个人认缴出资额，个体工商户、个人独资企业、合伙企业等应填报个人出资额，而非实际出资额。⑤未开展经营活动的、已经停止经营活动的、被吊销营业执照但未办理注销手续的企业，应当进行报告。`},
        {label: '本人、配偶、共同生活的子女在国（境）外的存款情况', explain: `说明：①填报时，应先在表格右上方“有此类情况”或“无此类情况”后的□内划“√”。②有此类情况的，应当逐人、逐账户填写填报时在国（境）外的国家或者地区（包括香港、澳门、台湾）的银行业金融机构的存款情况，包括人民币和外币。③在国（境）外中资银行及其分支机构的存款属于国（境）外的存款，需要报告。在我国境内设立的外资银行及其分支机构的存款不属于国（境）外存款，不需要报告。`},
        {label: '本人、配偶、共同生活的子女在国（境）外的投资情况', explain: `说明：①填报时，应先在表格右上方“有此类情况”或“无此类情况”后的□内划“√”。②有此类情况的，应逐人、逐项填写填报时在国（境）外（包括香港、澳门、台湾）的投资情况，包括房产，投资或以其他方式持有股票、基金、投资型保险等情况。`},
        {label: '本人、配偶、共同生活的子女参与民间借贷的情况', explain: `说明：①填报时，应先在表格右上方“有此类情况”或“无此类情况”后的□内划“√”。②有此类情况的，应逐人、逐项填写填报时参与民间借贷的情况。③银行贷款、公积金贷款情况不需填报。`},
      ],
      reportList4: [
        {
          label: '个人认为需要报告的其他事项', 
          explain: ''
        },
      ],
      reportTitle: {},
      headerTab: tableData1[0].headerTab ? tableData1[0].headerTab : 1,
      // headerParam: tableData1[0].headerParam ? tableData1[0].headerParam : {},
      headerParam: {},
      // 追加表头数据
      headerAppend: tableData1[0].headerAppend ? this.recursionList(JSON.stringify([...tableData1[0].headerAppend])): [],
      tableData: [...tableData1[0].data],
      columns: this.recursionList(JSON.stringify([...tableData1[0].columns])),
      appendTab: [],
      checked: true,
      tableDataList: [...tableData1,...tableData2],
      othersReport: '', // 个人认为需要报告的其他事项
      // 11111
    }
  },
  mounted() {
    // let row = this.$route.query.row
    // if(row != null){
    // this.menuBtn.push({label: '基本信息', type: 'primary'})
    // }
    this.reportTitle = this.reportList[0]
  },
  methods: {
    //打印
    PrintRow(index, row){
      this.$print(this.$refs.printCon)
    },
    headerParamClick(){
      console.log('表头表格信息',this.headerParam)
    },
    BtnClick(index){
      this.menu_active = index
      this.list_active = -1
    },
    listClick(index){
      this.headerParam = {}
      this.list_active = index
      let height = this.$refs.printCon.offsetTop
      if(this.menu_active == 3){
        this.$nextTick(() => {
          let scroll = this.$refs.others.offsetTop - height
          $(this.$refs.printCon).animate({scrollTop: scroll },2000)
        });
        return
      }else if(this.menu_active == 0){
        this.$nextTick(() => {
          $(this.$refs.printCon).animate({scrollTop: 0 },2000)
        });
        return
      }else if(this.menu_active == 2){
        index = index + 11
      }
      this.$nextTick(() => {
        let scroll = this.$refs.table_box[index].offsetTop - height
        $(this.$refs.printCon).animate({scrollTop: scroll },2000)
      });
    },
    listClick2(index){
      this.list_active = index
      if(this.menu_active == 0){
        // 报告标题
        this.reportTitle = this.reportList[index]
        // 是否为表头表格
        let headerTab = tableData1[index].headerTab ? tableData1[index].headerTab : 1
        this.headerTab = headerTab
        // 表头表格存储数据
        this.headerParam = tableData1[index].headerParam ? tableData1[index].headerParam : {}
        // 追加表头数据
        let headerAppend = tableData1[index].headerAppend ? tableData1[index].headerAppend : []
        this.headerAppend = this.recursionList(JSON.stringify([...headerAppend]))
        // 列数据
        let columns = tableData1[index].columns
        this.columns = this.recursionList(JSON.stringify([...columns]))
        // 表格数据
        this.tableData = tableData1[index].data
        // 新增数据
        this.appendTab = tableData1[index].appendTab
      }else if(this.menu_active == 1){ 
        this.reportTitle = this.reportList2[index]
        // 是否为表头表格
        this.headerTab = tableData2[index].headerTab ? tableData2[index].headerTab : 1
        // 表头表格存储数据
        this.headerParam = tableData2[index].headerParam ? tableData2[index].headerParam : {}
        // 追加表头数据
        let headerAppend = tableData2[index].headerAppend ? tableData2[index].headerAppend : []
        this.headerAppend = this.recursionList(JSON.stringify([...headerAppend]))
        let columns = tableData2[index].columns
        this.columns = this.recursionList(JSON.stringify([...columns]))
        this.tableData = tableData2[index].data
        this.appendTab = tableData2[index].appendTab
      }else {
        this.reportTitle = this.reportList3[index]
      }
    },
    recursionList(data){
      let data2 = JSON.parse(data)
      for (let i = 0; i < data2.length; i++) {
        if (data2[i].children) {
          data2[i].children = this.recursionList(JSON.stringify(data2[i].children))
        }
      }
      let last = data2[data2.length - 1]
      data2.unshift(last)
      data2.splice(data2.length - 1,1)
      return data2
    },
    // 保存新增编辑信息
    editDataSave(data){
      console.log('新增编辑信息：', data)
    },
    // formatterZip(row, columns){
    //   return `<span style='color:red;'>${row[columns.prop] == null ? '': row[columns.prop]}</span>`
    // },
    // 移居类别
    formatter_lb(row, columns){
      let str = ''
      for(let i=0;i<columns.option.length;i++){
        let obj = columns.option[i]
        str += `<span style="display:inline-block;width:90px;">${obj.name}</span>
        <input style="position:relative;top:2px;left:3px;" type="checkbox" name="checkbox" value="0" disabled=true checked/><br/>`
      }
      return str
    },
    // 处理阶段
    ProcessingStage(row, columns){
      let str = ''
      for(let i=0;i<columns.option.length;i++){
        let obj = columns.option[i]
        str += `<span style="display:inline-block;width:90px;">${obj.name}</span>
        <input style="position:relative;top:2px;left:3px;" type="checkbox" name="checkbox" value="0" disabled=true checked/><br/>`
      }
      return str
    },
    // 房产性质
    propertyNature(row, columns){
      let str = ''
      for(let i=0;i<columns.option.length;i++){
        let obj = columns.option[i]
        str += `<span style="display:inline-block;width:90px;">${obj.name}</span>
        <input style="position:relative;top:2px;left:3px;" type="checkbox" name="checkbox" value="0" disabled=true checked/><br/>`
      }
      return str
    },
    // 房产来源
    propertySource(row, columns){
      let str = `<div style="background:#f5f7fa;border-radius:5px;padding:5px 0;margin-bottom:5px;" >`
      for(let i=0;i<columns.option.length;i++){
        let obj = columns.option[i]
        str += `<span style="display:inline-block;width:60px;">${obj.name}</span>
        <input style="position:relative;top:2px;left:3px;" type="checkbox" name="checkbox" value="0" disabled=true checked/><br/>`
      }
      str += `</div><div style="background:#f5f7fa;border-radius:5px;padding:5px 0;" >`
      for(let i=0;i<columns.option2.length;i++){
        let obj = columns.option2[i]
        str += `<span style="display:inline-block;width:60px;">${obj.name}</span>
        <input style="position:relative;top:2px;left:3px;" type="checkbox" name="checkbox" value="0" disabled=true checked/><br/>`
      }
      str += `</div>`
      return str
    },
    summaryfunc1(row, columns){
      if(row[columns.prop] == null){
        return `测试 总市值`
      }else{
        return row[columns.prop]
      }
    },
    summaryfunc2(row, columns){
      if(row[columns.prop] == null){
        return `测试 总资产`
      }else{
        return row[columns.prop]
      }
    },
    summaryfunc3(row, columns){
      if(row[columns.prop] == null){
        return `测试 备注信息`
      }else{
        return row[columns.prop]
      }
    },
    // 
  }
}
</script>
<style lang="stylus" scoped>
/*滚动条样式*/
::-webkit-scrollbar { width: 6px; height: 6px; background-color: #666;}
::-webkit-scrollbar-track { border-radius: 10px; background-color: #666;}
::-webkit-scrollbar-thumb { border-radius: 10px; background-color: #222;}
.report-container
  height 100%
  .report-title
    padding: 8px 16px;
    span
      font-size: 16px;
      color: #121518;
      font-weight: 700;
      height 26px;
      padding-left: 10px;
      position: relative
      &:before
        position: absolute;
        top: 0;
        left: 0;
        content: ' ';
        width: 5px;
        height: 100%;
        border-radius: 5px;
        background: #005BFF;
  .report-body
    width: calc(100% - 40px);
    height calc(100% - 55px)
    padding 10px 0
    margin: 5px 20px;
    background #e8ebef
    box-sizing: border-box;
    .tip
      padding: 10px;
      color: rgb(230, 160, 97);
      background: rgb(249, 242, 236);
      user-select: text;
      margin-bottom: 10px;
    .line
      text-align: center;
    .list
      float left
      width calc(100% - 441px)
      padding 5px 10px
      height calc(100% - 20px)
      .menuBtn:focus-within
        background #409EFF 
      .menuBtnselect
        background #409EFF
        color #ffffff
    .menu_list
      height calc(100% - 60px)
      margin: 5px
      overflow-y auto
      .list_son
        padding 15px 10px
        font-size 16px
        font-weight bold
        line-height 24px
      .list_son:hover,.selectClass
        background #409EFF 
        color #ffffff
        border-radius 5px
        cursor pointer
      .list_son:hover
        background #96c9ff
    .reportTable
      height calc(100% - 50px)
      margin-bottom 10px
      padding-right 5px
      overflow-y auto
/deep/ .el-select
  width: 100%;
/deep/ .el-form--label-top .el-form-item__label
  padding: 0;
/deep/ .el-textarea
  width: 100%;
</style>
