<template>
        <div  class='other_b_table  bg-fff mt8'>
                <div  class='mt8'>
                  <div  class='scroll-auto'>
                    <table  class='align-center selectable' style="min-width: 1440px; margin: 0 auto">
                      <thead style="background: #DADEE2">
                        <tr  class='h32'>
                          <th nowrap='nowrap'  class='px4 py4'>1月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>2月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>3月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>4月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>5月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>6月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>7月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>8月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>9月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>10月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>11月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>12月车贴</th>
                          <th nowrap='nowrap'  class='px4 py4'>车贴合计</th>
                          <th nowrap='nowrap'  class='px4 py4' style="width: 120px">发放时间</th>
                        </tr>
                      </thead>
                      <tbody  class='pos-tr-even-odd-bg hov-tr-bg' v-for="(item,index) in carStickersData" :key="index">
                            <tr  class='h32'>
                              <td  class='px4 py4'>{{item.month === '1' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.month === '2' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.month === '3' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.month === '4' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.month === '5' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.month === '6' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.month === '7' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.month === '8' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.month === '9' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.month === '10' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.month === '11' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.month === '12' ? item.amount : 0}}</td>
                              <td  class='px4 py4'>{{item.amount}}</td>
                              <td  class='px4 py4 txt-truncate'></td>
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
        carStickersData: {
            type: Array
        } 
    },
}
</script>
<style>
    @import '../css/assembly.css';
    /* @import '../css/hover-min.css';
    @import '../css/media.css'; */
    /* @import '../css/pseudo_classes.css'; */
    .r_salary {
        background: url(../../utils/img/arrow_left_grey_bg@2x.png) no-repeat center / cover
    }

    .l_salary {
        background: url(../../utils/img/arrow_right_grey_bg@2x.png) no-repeat center / cover
    }
</style>