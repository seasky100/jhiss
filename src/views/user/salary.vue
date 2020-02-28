<template>
    <div class='salary_management w-full'>
        <div class='flex flex-align-center bg-fff' style="padding: 8px 16px">
            <span class='txt-bold' style="font-size: 1.2em; color: #121518">工资表</span>
        </div>
        <div class='flex flex-column flex-grow' style="margin: 8px 12px">
            <div class='flex flex-column flex-align-center mt8 py8 bg-fff txt-bold'>
                <span class='py4'>全年总收入=工资+奖金+其他</span>
                <span class='py4'>工资=表一“实发合计”+“代扣公积金X2”</span>
                <span class='py4'>奖金=表二“合计”</span>
                <span class='py4'>其他 = 变三“合计”</span>
            </div>
            <div class='flex' style="color: #6C7284; padding: 10px 0 12px 10px">
                <div class='flex flex-align-center mt8'>
                    <button class='h24 w24 r_salary' 
                         title='前一年'>
                      </button>
                    <button class='hov-date mx6 txt-normal'>
                        2020年
                    </button>
                    <button class='h24 w24 l_salary'
                         title='后一年'>
                      </button>
                </div>
            </div>
            <div class='salary_table pxy10 bg-fff'>
                    <div class='mt8'>
                      <div class='scroll-auto'>
                        <table class='align-center selectable' style="min-width: 1440px; margin: 0 auto">
                          <thead style="background: #DADEE2">
                            <tr class='h32'>
                              <th nowrap='nowrap' class='px4 py4'>职务工资</th>
                              <th nowrap='nowrap' class='px4 py4'>级别工资</th>
                              <th nowrap='nowrap' class='px4 py4'>工作津贴</th>
                              <th nowrap='nowrap' class='px4 py4'>生活补贴</th>
                              <th nowrap='nowrap' class='px4 py4'>无线通讯补助</th>
                              <th nowrap='nowrap' class='px4 py4'>警衔工资</th>
                              <th nowrap='nowrap' class='px4 py4'>特岗津贴</th>
                              <th nowrap='nowrap' class='px4 py4'>其他</th>
                              <th nowrap='nowrap' class='px4 py4'>临补2016</th>
                              <th nowrap='nowrap' class='px4 py4'>补漏发</th>
                              <th nowrap='nowrap' class='px4 py4'>应发合计</th>
                              <th nowrap='nowrap' class='px4 py4'>代扣公积金</th>
                              <th nowrap='nowrap' class='px4 py4'>扣养老金</th>
                              <th nowrap='nowrap' class='px4 py4'>扣所得税</th>
                              <th nowrap='nowrap' class='px4 py4'>扣职业年金</th>
                              <th nowrap='nowrap' class='px4 py4'>工会费</th>
                              <th nowrap='nowrap' class='px4 py4'>房租</th>
                              <th nowrap='nowrap' class='px4 py4'>其他扣款</th>
                              <th nowrap='nowrap' class='px4 py4'>扣款合计</th>
                              <th nowrap='nowrap' class='px4 py4'>工资实发合计</th>
                              <th nowrap='nowrap' class='px4 py4'>发放时间</th>
                            </tr>
                          </thead>
                          <!-- <tbody class='pos-tr-even-odd-bg hov-tr-bg'>
                            {
                              this.props.list.map((item, index) =>
                                <tr key={index} class='h32'>
                                  <td class='px4 py4'>{item.postSalary}</td>
                                  <td class='px4 py4'>{item.rankSalary}</td>
                                  <td class='px4 py4'>{item.workPremium}</td>
                                  <td class='px4 py4'>{item.livingAllowances}</td>
                                  <td class='px4 py4'>{item.wirelessAllowances}</td>
                                  <td class='px4 py4'>{item.policeSalary}</td>
                                  <td class='px4 py4'>{item.specialAllowance}</td>
                                  <td class='px4 py4'>{item.other}</td>
                                  <td class='px4 py4'>{item.temporary}</td>
                                  <td class='px4 py4'>{item.backDeliver}</td>
                                  <td class='px4 py4'>{item.shouldTotal}</td>
                                  <td class='px4 py4'>{item.housingFund}</td>
                                  <td class='px4 py4'>{item.annuity}</td>
                                  <td class='px4 py4'>{item.incomeTax}</td>
                                  <td class='px4 py4'>{item.pension}</td>
                                  <td class='px4 py4'>{item.unionFee}</td>
                                  <td class='px4 py4'>{item.rent}</td>
                                  <td class='px4 py4'>{item.otherDeduction}</td>
                                  <td class='px4 py4'>{item.deductionTotal}</td>
                                  <td class='px4 py4'>{item.total}</td>
                                  <td class='px4 py4'>{new Date(item.payrollTime).toLocaleDateString()}</td>
                                </tr>
                              )
                            }
                          </tbody> -->
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className='award_table pxy10 bg-fff mt8'>
                        <div className='flex flex-align-center bg-fff'>
                          <span className='txt-bold' style="font-size: 1.2em; color: #121518">奖金</span>
                        </div>
                        <div className='mt8'>
                          <div className='scroll-auto'>
                            <table className='align-center selectable' style="min-width: 1440px; margin: 0 auto">
                              <thead style="background: #DADEE2">
                                <tr className='h32'>
                                  <th nowrap='nowrap' className='px4 py4'>增发一个月工资</th>
                                  <th nowrap='nowrap' className='px4 py4' style="width: 100px">基数21715元(扣除预发24000元)</th>
                                  <th nowrap='nowrap' className='px4 py4'>均发12000元</th>
                                  <th nowrap='nowrap' className='px4 py4'>优秀(基数4260元)</th>
                                  <th nowrap='nowrap' className='px4 py4'>1月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>2月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>3月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>4月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>5月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>6月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>7月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>8月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>9月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>10月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>11月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>12月预发</th>
                                  <th nowrap='nowrap' className='px4 py4'>考核奖合计</th>
                                  <th nowrap='nowrap' className='px4 py4'>发放时间</th>
                                </tr>
                              </thead>
                              <!-- <tbody className='pos-tr-even-odd-bg hov-tr-bg'>
                                {
                                  this.props.list.map((item, index) =>
                                    <tr key={index} className='h32'>
                                      <td className='px4 py4'>{item.type === 'zf' ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{item.type === 'js' ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{item.type === 'jf' ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{item.type === 'yx' ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '1') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '2') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '3') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '4') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '5') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '6') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '7') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '8') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '9') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '10') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '11') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{(item.type === 'yf' && item.month === '12') ? item.amount : '0'}</td>
                                      <td className='px4 py4'>{item.amount}</td>
                                      <td className='px4 py4'>{new Date(item.payrollTime).toLocaleDateString()}</td>
                                    </tr>
                                  )
                                }
                              </tbody> -->
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className='other_a_table pxy10 bg-fff mt8'>
                            <div className='flex flex-align-center bg-fff'>
                              <span className='txt-bold' style="font-size: 1.2em; color: #121518">其他</span>
                            </div>
                            <div className='mt8'>
                              <div className='scroll-auto'>
                                <table className='align-center selectable' style="min-width: 1440px; margin: 0 auto">
                                  <thead style="background: #DADEE2">
                                    <tr className='h32'>
                                      <th nowrap='nowrap' className='px4 py4'>应休未休年休假报酬</th>
                                      <th nowrap='nowrap' className='px4 py4'>1月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>2月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>3月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>4月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>5月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>6月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>7月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>8月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>9月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>10月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>11月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>12月加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>年终考核加班费</th>
                                      <th nowrap='nowrap' className='px4 py4'>加班及年休合计</th>
                                      <th nowrap='nowrap' className='px4 py4'>发放时间</th>
                                    </tr>
                                  </thead>
                                  <!-- <tbody className='pos-tr-even-odd-bg hov-tr-bg'>
                                    {
                                      this.props.list.map((item, index) =>
                                        <tr key={index} className='h32'>
                                          <td className='px4 py4'>{item.type === 'vacation' ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '1') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '2') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '3') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '4') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '5') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '6') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '7') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '8') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '9') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '10') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '11') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{(item.type === 'overtime' && item.month === '12') ? item.amount : '0'}</td>
                                          <td className='px4 py4'>{item.nzkhjbf}</td>
                                          <td className='px4 py4'>{item.jbjnxhj}</td>
                                          <td className='px4 py4'>{new Date(item.payrollTime).toLocaleDateString()}</td>
                                        </tr>
                                      )
                                    }
                                  </tbody> -->
                                </table>
                              </div>
                            </div>
                          </div>
            <!-- <SalaryTable getList={this.props.getSalaryBasic} list={this.props.listBasic} year={this.state.year} />
                  <AwardTable getList={this.props.getSalaryAward} list={this.props.listAward} year={this.state.year} />
                  <OtherA getList={this.props.getSalaryOvertime} list={this.props.listOvertime} year={this.state.year} />
                  <OtherB getList={this.props.getSalaryCar} list={this.props.listCar} year={this.state.year} /> -->
        </div>
    </div>
</template>
<style>
@import '../css/assembly.css';
@import '../css/hover-min.css';
@import '../css/media.css';
@import '../css/pseudo_classes.css';
.r_salary{ 
    background: url(../../utils/img/arrow_left_grey_bg@2x.png) no-repeat center / cover
}
.l_salary{ 
    background: url(../../utils/img/arrow_right_grey_bg@2x.png) no-repeat center / cover
}
</style>