<template>
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
            <tbody class='pos-tr-even-odd-bg hov-tr-bg' v-for="(item,index) in salaryData" :key="index">
                    <tr key={index} class='h32'>
                    <td class='px4 py4'>{{item.postSalary}}</td>
                    <td class='px4 py4'>{{item.rankSalary}}</td>
                    <td class='px4 py4'>{{item.workPremium}}</td>
                    <td class='px4 py4'>{{item.livingAllowances}}</td>
                    <td class='px4 py4'>{{item.wirelessAllowances}}</td>
                    <td class='px4 py4'>{{item.policeSalary}}</td>
                    <td class='px4 py4'>{{item.specialAllowance}}</td>
                    <td class='px4 py4'>{{item.other}}</td>
                    <td class='px4 py4'>{{item.temporary}}</td>
                    <td class='px4 py4'>{{item.backDeliver}}</td>
                    <td class='px4 py4'>{{item.shouldTotal}}</td>
                    <td class='px4 py4'>{{item.housingFund}}</td>
                    <td class='px4 py4'>{{item.annuity}}</td>
                    <td class='px4 py4'>{{item.incomeTax}}</td>
                    <td class='px4 py4'>{{item.pension}}</td>
                    <td class='px4 py4'>{{item.unionFee}}</td>
                    <td class='px4 py4'>{{item.rent}}</td>
                    <td class='px4 py4'>{{item.otherDeduction}}</td>
                    <td class='px4 py4'>{{item.deductionTotal}}</td>
                    <td class='px4 py4'>{{item.total}}</td>
                    <td class='px4 py4'>{{new Date(item.payrollTime).toLocaleDateString()}}</td>
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
        salaryData: {
            type: Array
        } 
    },
}
</script>
<style>
    @import '../css/assembly.css';
    /* @import '../css/hover-min.css';
    @import '../css/media.css'; */
    @import '../css/pseudo_classes.css';
    .r_salary{ 
        background: url(../../utils/img/arrow_left_grey_bg@2x.png) no-repeat center / cover
    }
    .l_salary{ 
        background: url(../../utils/img/arrow_right_grey_bg@2x.png) no-repeat center / cover
    }
    </style>