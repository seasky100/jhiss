<template>
  <div class="organizationRequestDetail">
    <div class='flex flex-align-center h24 w-full border-box' style="color:#121518">
			<div class='flex-inline' style="width:5px; height:21px; border-radius:2.5px; background:#235FF6"></div>
			<span class='pl8 txt-bold font14' style="">详情</span>
    </div>
    <div class="detail_left" v-if='data.reportType ==113'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>事项类型：</td>
          <td style="text-align: left;">{{formData.reportDesc}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==112'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>存款人姓名：</td>
          <td>{{formData.name}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>与本人关系：</td>
          <td>{{relationMap[formData.relation]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>存款的国家（地区）及城市：</td>
          <td>{{formData.country}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>开户银行或金融机构全称：</td>
          <td>{{formData.bankAccount}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>币种：</td>
          <td>{{formData.currency}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>存款金额（万元）：</td>
          <td>{{formData.amountPaid}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>备注：</td>
          <td>{{formData.comment}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==103'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>事由：</td>
          <td>{{formData.giftDesc}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>礼金总额：</td>
          <td>{{formData.cash}}</td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==104'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>证件类型：</td>
          <td>{{coupleCertificateTypeMap[formData.certificateType]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>证件号码：</td>
          <td>{{formData.certificateNumber}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>出发时间：</td>
          <td>{{new Date(formData.startTime).toLocaleDateString()}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>归国时间：</td>
          <td>{{new Date(formData.endTime).toLocaleDateString()}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>同行人：</td>
          <td>{{formData.peer}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>事由：</td>
          <td>{{formData.cause}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>所到国家（地区）：</td>
          <td>{{formData.exitCountry}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>备注：</td>
          <td>{{formData.comment}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==108'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>房产类型：</td>
          <td>{{typeMap[formData.houseType]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>交易类型：</td>
          <td>{{tradeTypeMap[formData.houseSource]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>交易时间：</td>
          <td>{{new Date(formData.tradeTime).toLocaleDateString()}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>房屋坐落：</td>
          <td>{{formData.address}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>建筑面积：</td>
          <td>{{formData.area}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>房产总额（万元）：</td>
          <td>{{formData.total}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>贷款情况：</td>
          <td>{{loanTypeMap[formData.isloan]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>装修情况：</td>
          <td>{{decorationMap[formData.decorateStatus]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>产权归属：</td>
          <td>{{ownershipMap[formData.ownership]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>备注：</td>
          <td>{{formData.comment}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==101'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>子女姓名：</td>
          <td>{{formData.childName}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>对方国家（地区）：</td>
          <td>{{formData.country}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>婚姻变化情况：</td>
          <td>{{mtypeMap[formData.marrageState]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>对方姓名：</td>
          <td>{{formData.name}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>对方工作单位：</td>
          <td>{{formData.workCompany}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>对方职务：</td>
          <td>{{formData.post}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>对方证件类型：</td>
          <td>{{coupleCertificateTypeMap[formData.otherCertificate]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>对方证件号码：</td>
          <td>{{formData.certificateNumber}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>对方证件登记时间：</td>
          <td>{{formData.applyTime}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>备注：</td>
          <td>{{formData.comment}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==106'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>与本人关系：</td>
          <td>{{relationMap[formData.relation]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>姓名：</td>
          <td>{{formData.name}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>工作（学习）单位：</td>
          <td>{{formData.workCompany}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>是否在国（境）外：</td>
          <td>{{isForeignMap[formData.isAbroad]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>现任职务：</td>
          <td>{{formData.post}}</td>
        </tr>
        <!-- <tr class='o_tr'>
                        <td class='o_td'>单位性质：</td>
                        <td>{{formData.post}}</td>
                      </tr> -->
        <tr class='o_tr'>
          <td class='o_td'>证件名称：</td>
          <td>{{formData.certificateName}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>证件号码：</td>
          <td>{{formData.certificateNum}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>备注：</td>
          <td>{{formData.comment}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==105'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>与本人关系：</td>
          <td>{{relationMap[formData.relation]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>姓名：</td>
          <td>{{formData.name}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>移居（所在）国家：</td>
          <td>{{formData.country}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>现居住城市：</td>
          <td>{{formData.city}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>事由：</td>
          <td>{{incidentMap[formData.cause]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>移居类别：</td>
          <td>{{ytypeMap[formData.emigrateState]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>出国时间：</td>
          <td>{{new Date(formData.strartTime).toLocaleDateString()}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>停留时间：</td>
          <td>{{new Date(formData.endTime).toLocaleDateString()}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>备注：</td>
          <td>{{formData.comment}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==109'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>投资人姓名：</td>
          <td>{{formData.name}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>与本人关系：</td>
          <td>{{relationMap[formData.relation]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>投资的国家（地区）及城市：</td>
          <td>{{formData.country}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>投资情况：</td>
          <td>{{tzMap[formData.investmentSituation]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>币种：</td>
          <td>{{formData.currency}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>投资金额（万元）：</td>
          <td>{{formData.amountPaid}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>备注：</td>
          <td>{{formData.comment}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==111'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>人员姓名：</td>
          <td>{{formData.name}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>与本人关系：</td>
          <td>{{relationMap[formData.relation]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>统一社会信用代码/注册号：</td>
          <td>{{formData.creditCode}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>企业或其他市场主体名称：</td>
          <td>{{formData.companyName}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>成立日期：</td>
          <td>{{new Date(formData.buildTime).toLocaleDateString()}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>经营范围：</td>
          <td>{{formData.businessScope}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>注册地：</td>
          <td>{{formData.registered}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>经营地：</td>
          <td>{{formData.businessPlace}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>企业或其他市场主体类型：</td>
          <td>{{enterpriseTypeMap[formData.companyType]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>注册资本（金）或资金数额（出资额）：</td>
          <td>{{formData.registeredCapital}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>个人认缴出资额或个人出资额：</td>
          <td>{{formData.personalContribution}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>个人认缴出资比例或个人出资比例：</td>
          <td>{{formData.personalRatio}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>备注：</td>
          <td>{{formData.comment}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==110'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>类型：</td>
          <td>{{dtypeMap[formData.type]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>借贷对象姓名：</td>
          <td>{{formData.borrower}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>借款对象工作单位：</td>
          <td>{{formData.workCompany}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>借入/借出</td>
          <td>{{inOutMap[formData.isBorrow]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>借款事由</td>
          <td>{{formData.borrowReason}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>金额：</td>
          <td>{{formData.amount}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>约定利息：</td>
          <td>{{formData.interest}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>期限：</td>
          <td>{{formData.term}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>备注：</td>
          <td>{{formData.comment}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==107'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>类型：</td>
          <td>{{stypeMap[formData.illegalType]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>与本人关系：</td>
          <td>{{relationMap[formData.relation]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>姓名：</td>
          <td>{{formData.name}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>处理阶段：</td>
          <td>{{phaseMap[formData.stage]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>发生时间：</td>
          <td>{{new Date(formData.happenTime).toLocaleDateString()}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>发生事由：</td>
          <td>{{formData.cause}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>处理结果：</td>
          <td>{{formData.result}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>备注：</td>
          <td>{{formData.comment}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==102'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>办理类型：</td>
          <td>{{htypeMap[formData.banquetState]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>宴请对象范围：</td>
          <td v-for="(item,index) in formData.banquetScope" :key="index">{{hguestMap[formData.banquetScope[index]]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>酒席桌数：</td>
          <td>{{formData.count}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>餐费标准：</td>
          <td>{{formData.mealsPrice}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>与本人关系：</td>
          <td>{{relationMap[formData.banquetRelation]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>备注：</td>
          <td>{{formData.comment}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_left" v-if='data.reportType ==201'>
      <table class="detail_tab">
        <tr class='o_tr'>
          <td class='o_td'>事项类型：</td>
          <td>{{sbtypeMap[formData.applyType]}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>事由：</td>
          <td>{{formData.applyDesc}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>事项时间：</td>
          <td>{{new Date(formData.startTime).toLocaleString('chinese',{hour12: false})}}至{{new Date(formData.applyEnd).toLocaleString('chinese',{hour12:
            false})}}</td>
        </tr>
        <tr class='o_tr'>
          <td class='o_td'>附件下载：</td>
          <td v-for="(item,index) in formData.contentUrl" :key="index">
            <el-link :href="item.url" style="color:#235FF6;margin-right:10px">附件{{index+1}}</el-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="detail_right">
      <div class='flex flex-align-center h24 w-full border-box' style="color:#121518">
        <div class='flex-inline' style="width:5px; height:21px; border-radius:2.5px; background:#235FF6"></div>
        <span class='pl8 txt-bold font14' style="">审批详情</span>
      </div>
      <!-- 步骤条 -->
      <div style="margin-top:10px;">
        <el-steps direction="vertical" :active="3" finish-status="success">
          <el-step title="步骤 1">
            <i class="step01" slot="icon">
                <!-- <img :src="[commandmenubg==item.class?item.imgSrc_hover:item.imgSrc]"
                    style="position: absolute;top: -6px;left: -6px;" /> -->
              <img />
            </i>
            <span slot="title" style="background:none;">
                {{data.sponsorName}}
            </span>
            <span slot="description" style="background:none;margin:0px 5px 20px;">
                {{data.gmtCreate}} <span class='o_create'>新建</span> 
                <div>由<span class='o_create'>{{data.sponsorName}}</span>发起提交 </div>
            </span>
          </el-step>
          <el-step title="步骤 2">
            <span slot="title" style="background:none;">
              <div>{{data.approvalName}}</div> 
              <div v-if='data.approvalStatus ==1'>
                  <!-- sponsorId -->
                  <div v-if='userId == data.sponsorId '>
                      <span>审批中</span>
                  </div>
                  <div v-else>
                    <!-- <div>待审批</div> -->
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写评价内容" v-model="textarea2">
                    </el-input>
                    <div class=''>
                        <button @click='commitOn("2")' class='flex-inline'style="color: #67c37f; margin-right: 140px;">同意
                        </button>
                        <button  @click='commitOff("3")' style="color: #E65758; text-decoration: none">拒绝
                        </button>
                      </div>
                  </div>   
              </div>
              <div v-if='data.approvalStatus ==2'>
                  
                  <el-input type="textarea"  :disabled="true" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写评价内容" v-model="textarea2"></el-input>
              </div>   
              <div v-if='data.approvalStatus ==3'>
                  <el-input type="textarea"  :disabled="true" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写评价内容" v-model="textarea2">
                    </el-input>
              </div>    
            <!-- <span v-else-if='data.approvalStatus ===2'>已审批</span> -->
            </span>
          </el-step>
          <div v-if='data.approvalStatus ==2'>
              <el-step title="步骤 3" description=""><span slot="title" class="o_agree">已通过</span></el-step>
          </div>
          <div v-else-if='data.approvalStatus ==3'>
              <el-step title="步骤 3" description=""><span slot="title" class="o_norgee">已驳回</span></el-step>
          </div>
          
        </el-steps>
      </div>       
    </div>
  </div>
</template>
<script>
  // 与本人关系
//  const  relationMap = {
//     0: '本人',
//     1: '妻子',
//     2: '丈夫',
//     3: '儿子（共同生活）',
//     4: '女儿（共同生活）'
//   }
import { getApprovalById, updateApproval } from '../../api/report.js';
export default {
  name: "organizationRequestDetail",
  data() {
    return {
      // 与本人关系
      relationMap: {
        0: '本人',
        1: '妻子',
        2: '丈夫',
        3: '儿子（共同生活）',
        4: '女儿（共同生活）'
      },
      // 房产类型
      typeMap : {
        0: '商品房',
        1: '福利房',
        2: '经济适用房',
        3: '限价房',
        4: '自建房',
        5: '商住房',
        6: '厂房',
        7: '仓库',
        8: '其他'
      },
      // 交易类型
      tradeTypeMap: {
        0: '购买',
        1: '继承',
        2: '接受赠与',
        3: '分割',
        4: '合并',
        5: '变更',
        6: '交换',
        7: '析产',
        8: '赠与他人',
        9: '其他去向',
        10: '其他'
      },
      // 贷款情况
      loanTypeMap: {
        0: '全款',
        1: '商业贷款',
        2: '公积金贷款',
        3: '组合贷款'
      },
      // 装修情况
      decorationMap : {
        0: '毛坯',
        1: '简装',
        2: '精装'
      },
      // 产权归属
      ownershipMap: {
        0: '本人',
        1: '父母',
        2: '配偶',
        3: '子女'
      },
      mtypeMap: {
        0: '新婚',
        1: '离婚',
        2: '丧偶',
        3: '再婚'
      },
      coupleCertificateTypeMap: {
        0: '身份证',
        1: '护照',
        2: '军官证',
        3: '其他'
      },
      // 是否在国（境）外
      isForeignMap: {
        0: '否',
        1: '是'
      },
      // 事由
      incidentMap : {
        0: '学习',
        1: '工作',
        2: '陪读',
        3: '移民'
      },
      // 移居类别
      ytypeMap : {
        0: '外国国籍',
        1: '永久居留资格',
        2: '长期居留许可'
      },
      // 投资情况
      tzMap : {
        0: '房产',
        1: '投资',
        2: '股票',
        3: '基金',
        4: '投资型保险',
        5: '其他'
      },
      // 企业或其他市场主体类型
      enterpriseTypeMap: {
        0: '股份有限公司',
        1: '有限责任公司',
        2: '个体工商户',
        3: '个人独资企业',
        4: '合伙企业',
        5: '在国（境）外注册公司或者投资入股',
        6: '其他'
      },
      dtypeMap : {
        0: '担保',
        1: '借贷'
      },
      inOutMap: {
        0: '借入',
        1: '借出'
      },
      stypeMap : {
        0: '民事诉讼',
        1: '执纪执法机关查处',
        2: '涉嫌犯罪',
        3: '非正常死亡'
      },
      phaseMap : {
        0: '立案侦查',
        1: '审查起诉',
        2: '刑事审判',
        3: '刑罚执行',
        4: '执行完毕',
        5: '其它'
      },
      // 办理类型
      htypeMap: {
        0: '婚（喜庆）事',
        1: '丧事'
      },
      // 是否宴请
      hisInvitedMap: {
        0: '否',
        1: '是'
      },
      // 宴请对象
      hguestMap: {
        0: '亲戚',
        1: '朋友',
        2: '同事',
        3: '同学'
      },
      // 事项类型
      sbtypeMap: {
        201: '饮酒',
        202: '离开辖区',
        203: '离开单位'
      },
      date : new Date().toLocaleString('chinese', {hour12: false}),
      userId: this.$store.state.user.userId,
      id:'',
      flowCode:'',
      isCollapse: false,
      menuList: [],
      textarea2: '',
      approvalStatus:'',
      flowHistory:[],
      formData:[],
      data:[]
    }
  },
  watch: {},
  mounted() {
    this.flowCode = this.$route.query.flowCode
		console.log(this.flowCode)
    this.init()
  },
  methods: {
    init() {
      this.getData()
    },
    // 审批详情
    getData() {
      const _this = this;
      const params = {
        flowCode: _this.flowCode
      }
      getApprovalById(params).then(res => {
        if (res.success) {        
          _this.data = res.data
          _this.approvalStatus = _this.data.approvalStatus
          _this.id = _this.data.id
          _this.formData = JSON.parse(res.data.formData)
          if (_this.formData.contentUrl) {
            const urlData = _this.formData.contentUrl.split(';')
            _this.formData.contentUrl = []
            for (let i = 0; i < urlData.length; i++) {
              const arry = urlData[i].split(/uploadfile/)
              const url = 'http://41.232.3.196:8008' + arry[1]
              const data = {
                url: url
              }
              _this.formData.contentUrl.push(data)
            }
          }
          _this.flowHistory = res.data.flowHistory[0].node
          _this.textarea2 = res.data.flowHistory[0].comment
          const Data = _this.data
          Data.gmtCreate = new Date(Data.gmtCreate).toLocaleString('chinese', { hour12: false })
        }
      })
    },
    // 修改审批
    commitOn(node){
      this.commit(node)
    },
    commitOff(node){
      this.commit(node)
    },
    commit(node){
      const _this = this;
      const params = {
        id: _this.id,
        flowCode: _this.flowCode,
        approvalNode : _this.flowHistory,
        approvalStatus: node,
        comment: _this.textarea2
      }
      updateApproval(params).then(res => {
        console.log(res)
        if (res.success) {
          _this.$router.go(-1)
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.organizationRequestDetail{
  margin: 2%;
}
.police_career{
  height: 170px;
  background:#fff;
}
.person_title{
  border-left:3px solid red;
  padding-left: 5px;
  margin-left:8px
}
.o_norgee{
  color: red
}
.o_agree{
  color: green
}
.detail_left,.detail_right{
  float:left; 
  width :50% ;
  padding-top:50px
}

.detail_tab{
  margin: 0px 5%
}

.detail_tab tr td{
  /* text-align:right */
}
.o_create{
  color: black;
  margin: 5px;
}
.el-textarea {
    width: 35% !important;
}
.o_tr{
  height: 2em;
}
.o_td{
  color: #8593a7;
  text-align: right;
}
</style>
