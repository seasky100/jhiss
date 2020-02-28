      
 <template>
    <div  class='award_table pxy10 bg-fff mt8'>
        <div  class='flex flex-align-center bg-fff'>
          <span  class='txt-bold' style="font-size: 1.2em; color: #121518">奖金</span>
        </div>
        <div  class='mt8'>
          <div  class='scroll-auto'>
            <table  class='align-center selectable' style="min-width: 1440px; margin: 0 auto">
              <thead style="background: #DADEE2">
                <tr  class='h32'>
                  <th nowrap='nowrap'  class='px4 py4'>增发一个月工资</th>
                  <th nowrap='nowrap'  class='px4 py4' style="width: 100px">基数21715元(扣除预发24000元)</th>
                  <th nowrap='nowrap'  class='px4 py4'>均发12000元</th>
                  <th nowrap='nowrap'  class='px4 py4'>优秀(基数4260元)</th>
                  <th nowrap='nowrap'  class='px4 py4'>1月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>2月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>3月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>4月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>5月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>6月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>7月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>8月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>9月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>10月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>11月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>12月预发</th>
                  <th nowrap='nowrap'  class='px4 py4'>考核奖合计</th>
                  <th nowrap='nowrap'  class='px4 py4'>发放时间</th>
                </tr>
              </thead>
              <tbody  class='pos-tr-even-odd-bg hov-tr-bg' v-for="(item,index) in bonusData" :key="index">
                    <tr  class='h32'>
                      <td  class='px4 py4'>{{item.type === 'zf' ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{item.type === 'js' ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{item.type === 'jf' ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{item.type === 'yx' ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '1') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '2') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '3') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '4') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '5') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '6') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '7') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '8') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '9') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '10') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '11') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{(item.type === 'yf' && item.month === '12') ? item.amount : '0'}}</td>
                      <td  class='px4 py4'>{{item.amount}}</td>
                      <td  class='px4 py4'>{{new Date(item.payrollTime).toLocaleDateString()}}</td>
                    </tr>
              </tbody> 
            </table>
          </div>
        </div>
      </div>
    </template>
<script>
export default {
    props: {
        bonusData: {
            type: Array
        } 
    },
}
</script>
<style>
/* @import '../css/hover-min.css';
@import '../css/media.css'; */
@import '../css/pseudo_classes.css';
@import '../css/assembly.css';
.award_table{
    background: white;
    margin-top: 0.5em;
    padding: 0.714em!important;
}

.pxy10 {
    padding: 0.714em!important;
}
.bg-fff {
    background-color: #fff!important;
}
.mt8 {
    margin-top: 0.571em!important;
}
.scroll-auto {
    overflow: auto!important;
    /* -webkit-overflow-scrolling: touch; */
}
.r_salary {
    background: url(../../utils/img/arrow_left_grey_bg@2x.png) no-repeat center / cover
}

.l_salary {
    background: url(../../utils/img/arrow_right_grey_bg@2x.png) no-repeat center / cover
}
</style>