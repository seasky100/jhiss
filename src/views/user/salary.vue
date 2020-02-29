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
                    <button class='h24 w24 r_salary' @click='prevYear' title='前一年'>
                      </button>
                    <button class='hov-date mx6 txt-normal'>
                       {{year}}年
                    </button>
                    <button class='h24 w24 l_salary' title='后一年' @click='nextYear' >
                      </button>
                </div>
            </div>
            <SalaryTable :salaryData='salaryData'/>
            <Bonus :bonusData='bonusData'/>
            <OvertimePayTable :vertimePayData='vertimePayData'/>
            <CarStickers :carStickersData='carStickersData'/>
        </div>
    </div>
</template>
<script>
import { 
  findPayroll,
  findCarSubsidy,
  findOvertimePay,
  findrewardList 
} from '@/api/warn.js';  

import SalaryTable from './SalaryTable'
import OvertimePayTable from './OvertimePayTable'
import CarStickers from './CarStickers'
import Bonus from './Bonus'
export default {
  name: 'Head',
  components: {
    SalaryTable,
    OvertimePayTable,
    CarStickers,
    Bonus
  },
  data() {
    return {
      year: new Date().getFullYear(),
      salaryData:[],
      bonusData:[],
      vertimePayData:[],
      carStickersData:[],
      idNumber:'22222',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    prevYear(){
      this.year=this.year-1
      this.init()
    },
    nextYear(){
      this.year=this.year+1
      this.init()
    },
    init(){
      this.findPayroll();
      this.findCarSubsidy();
      this.findrewardList();
      this.findOvertimePay();
    },
    // 查询基本工资数据
    findPayroll() {
      debugger
      const _this = this;
      const params = {
        idNumber: _this.idNumber,
        paymentTime: _this.year
      }
      findPayroll(params).then(res => {
        console.log(res)
        if (res.success) {
          _this.salaryData = res.data
        }
      })
    },
    // 查询车贴数据
    findCarSubsidy() {
      debugger
      const _this = this;
      const params = {
        idNumber: _this.idNumber,
        paymentTime: _this.year
      }
      findCarSubsidy(params).then(res => {
        console.log(res)
        if (res.success) {
          _this.carStickersData = res.data

        }
      })
    },
    // 查询奖金数据
    findrewardList() {
      debugger
      const _this = this;
      const params = {
        idNumber: _this.idNumber,
        paymentTime: _this.year
      }
      findrewardList(params).then(res => {
        console.log(res)
        if (res.success) {
          _this.bonusData = [
            ...res.data.additionalPay.map(item => ({ ...item, type: 'zf' })),
            ...res.data.advancePay.map(item => ({ ...item, type: 'yf' })),
            ...res.data.average.map(item => ({ ...item, type: 'jf' })),
            ...res.data.baseNumber.map(item => ({ ...item, type: 'js' })),
            ...res.data.excellenceAward.map(item => ({ ...item, type: 'yx' }))
          ].sort((a, b) => a.payrollTime - b.payrollTime);
        }
      })
    },
    // 查询加班费数据
    findOvertimePay() {
      debugger
      const _this = this;
      const params = {
        idNumber: _this.idNumber,
        paymentTime: _this.year
      }
      findOvertimePay(params).then(res => {
        console.log(res)
        if (res.success) {
          _this.vertimePayData = [
            ...res.data.overtimePay.map(item => ({ ...item, type: 'overtime' })),
            ...res.data.vacationPay.map(item => ({ ...item, type: 'vacation' }))
          ].sort((a, b) => a.payrollTime - b.payrollTime);
        }
      })
    },   
  }
}
</script>
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