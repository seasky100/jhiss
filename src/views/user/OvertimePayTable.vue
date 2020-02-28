<template>
    <div  class='other_a_table pxy10 bg-fff mt8'>
            <div  class='flex flex-align-center bg-fff'>
                <span  class='txt-bold' style="font-size: 1.2em; color: #121518">其他</span>
            </div>
            <div  class='mt8'>
                <div  class='scroll-auto'>
                    <table  class='align-center selectable' style="min-width: 1440px; margin: 0 auto">
                        <thead style="background: #DADEE2">
                            <tr  class='h32'>
                                <th nowrap='nowrap'  class='px4 py4'>应休未休年休假报酬</th>
                                <th nowrap='nowrap'  class='px4 py4'>1月加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>2月加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>3月加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>4月加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>5月加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>6月加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>7月加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>8月加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>9月加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>10月加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>11月加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>12月加班费</th>
                                <!-- <th nowrap='nowrap'  class='px4 py4'>年终考核加班费</th>
                                <th nowrap='nowrap'  class='px4 py4'>加班及年休合计</th> -->
                                <th nowrap='nowrap'  class='px4 py4'>发放时间</th>
                            </tr>
                        </thead>
                        <tbody  class='pos-tr-even-odd-bg hov-tr-bg' v-for="(item,index) in vertimePayData" :key="index">
                                    <tr key={index}  class='h32'>
                                        <td  class='px4 py4'>{{item.type === 'vacation' ? item.amount : 0}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '1') ? item.amount : 0}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '2') ? item.amount : 0}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '3') ? item.amount : 0}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '4') ? item.amount : '0'}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '5') ? item.amount : '0'}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '6') ? item.amount : '0'}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '7') ? item.amount : '0'}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '8') ? item.amount : '0'}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '9') ? item.amount : '0'}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '10') ? item.amount : '0'}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '11') ? item.amount : '0'}}</td>
                                        <td  class='px4 py4'>{{(item.type === 'overtime' && item.month === '12') ? item.amount : '0'}}</td>
                                        <!-- <td  class='px4 py4'>{{item.nzkhjbf}}</td>
                                        <td  class='px4 py4'>{{item.jbjnxhj}}</td> -->
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
        vertimePayData: {
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
    .r_salary {
        background: url(../../utils/img/arrow_left_grey_bg@2x.png) no-repeat center / cover
    }

    .l_salary {
        background: url(../../utils/img/arrow_right_grey_bg@2x.png) no-repeat center / cover
    }
</style>