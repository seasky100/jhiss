<template>
    <div class="container">
        <div class="page-title">
            <img style="margin-right:8px;" src='@/utils/img/home_round_bar@2x.png' /> 
            <span>出国情况</span>
        </div>
        <div class="content">
            <el-row class="bg-fff">
                <el-col :span="8" style="width:calc(33.3% - 5px);margin-right:8px;">
                    <RingChart
                            :chart-data="withoutPassport.data"
                            :label-map="withoutPassport.labelMap"
                            title="民警数量"
                    />
                </el-col>
                <el-col :span="8" style="width:calc(33.3% - 5px);margin-right:8px;">
                    <RingChart
                            :chart-data="passport.data"
                            :label-map="passport.labelMap"
                            title="民警数量"
                    />
                </el-col>
                <el-col :span="8" style="width:calc(33.3% - 5px);">
                    <HistogramChart
                            :chart-data="goingAbroad.data"
                            :label-map="goingAbroad.labelMap"
                            title="次数"
                    />
                </el-col>
            </el-row>
            <div class="search-wrap" style="min-width:1220px;">
                <!-- <div class="section-title">查询条件</div> -->
                <e-search
                        class="search-form"
                        @handleSearch="handleSearch"
                        :searchData="searchData"
                        :searchForm="searchForm"
                />
            </div>
            <div class="search-wrap" style="height:350px;">
                <e-table
                        ref="recordSpTableRef"
                        :options="options"
                        :columns="columns"
                        :operates="operates"
                        :tableList="tableList"
                        @afterCurrentPageClick="afterCurrentPageClickHandle"
                />
            </div>
        </div>
        <!--详情-->
        <GoAbroadDetail ref="goAbroadDetail" />
    </div>
</template>

<script>
import RingChart from "@/components/ring-chart";
import HistogramChart from "@/components/histogram-chart";
import {
  getCountPassport,
  getCertificateInfoStatistics,
  getPalaceInfoStatistics,
  getFindAbroadRecordPage
} from "@/api/wisdom-reminder/go-abroad.js";
import GoAbroadDetail from './model/goAbroadDetail'

export default {
  components: {
    RingChart,
    HistogramChart,
    GoAbroadDetail
  },
  data() {
    return {
      // 统计有无护照的警员数量
      withoutPassport: {
        data: {
            columns: ['passport', 'number'],
            rows: []
        },
        labelMap: {
            number: '数量'
        }
      },
      // 显示当前护照在管和在民警手里的数量
      passport: {
        data: {
          columns: ["passportManage", "number"],
          rows: []
        },
        labelMap: {
          number: "数量"
        }
      },
      // 按目的地显示今年出国次数top10
      goingAbroad: {
        data: {
          columns: ["place", "num"],
          rows: []
        },
        labelMap: {
          num: "次数"
        }
      },
      // 获取出勤出境分页
      searchData: {
            policeCode: '',
            userName: '',
            department: '',
            startTime: '',
            endTime: ''
        },
      searchForm: [
            {type: 'input', prop: 'policeCode', width: '120px', placeholder: '警号'},
            {type: 'input', prop: 'userName', width: '120px', placeholder: '姓名'},
            {
                type: 'select',
                prop: 'department',
                width: '150px',
                options: [],
                change: row => console.log(row),
                placeholder: '所属部门'
            },
            {
                type: 'daterange',
                options: [
                    {
                        prop: 'startTime',
                        format: '',
                        valueformat: '',
                        placeholder: '起始时间'
                    },
                    {
                        prop: 'endTime',
                        format: '',
                        valueformat: '',
                        placeholder: '结束时间'
                    }
                ]
            },
            {
                type: 'select',
                prop: '',
                width: '150px',
                options: [
                    {label: '保管',value: '保管'},
                    {label: '借出',value: '借出'}
                ],
                change: row => console.log(row),
                placeholder: '护照情况'
            }
        ],
      options: {
          pageSize: 10,
          hasIndex: false,
          currentPage: 1,
          loading: true,
          maxHeight: null,
          height: '320'
      },
      columns: [
          {
              prop: 'policeCode',
              label: '警号',
              align: 'left'
          },
          {
              prop: 'userName',
              label: '姓名',
              align: 'left'
          },
          {
              prop: 'department',
              label: '部门',
              align: 'left'
          },
          {
            prop: 'reason',
            label: '出国原因',
            align: 'left'
          },
          {
              prop: 'startTime',
              label: '开始时间',
              align: 'left',
              type: 'date',
              dateFormat: 'yyyy-MM-dd'
          },
          {
              prop: 'endTime',
              label: '结束时间',
              align: 'left',
              type: 'date',
              dateFormat: 'yyyy-MM-dd'
          },
          {
              prop: 'certificateType',
              label: '护照情况',
              align: 'left'
          },
          {
              prop: 'isException',
              label: '是否异常',
              align: 'left'
          }
      ],
      operates: {
          width: 150,
          fixed: 'right',
          list: [
              {
                  id: '1',
                  label: '详情',
                  show: true,
                  underline: false,
                  icon: '<i class="el-icon-view"></i>',
                  disabled: false,
                  method: (key, row) => {
                      this.$refs.goAbroadDetail.open(row);
                  },
                  showCallback: () => {
                      return true;
                  }
              }
          ]
      },
      tableList: []
    };
  },
  methods: {
        // 查询
        handleSearch(params) {
            Object.assign(this.searchData, params);
            this.query();
        },

        // 分页点击事件
        afterCurrentPageClickHandle(val, next) {
            this.query(val);
            next();
        },

        // 查询列表
        query(nCurrent = 1) {
            const $this = this;
            getFindAbroadRecordPage(Object.assign({
                nCurrent: nCurrent,
                nSize: 10,
                orderByField: ''
            }, $this.searchData)).then((res) => {
                this.$refs.recordSpTableRef.setPageInfo(
                    nCurrent,
                    res.size,
                    res.total,
                    res.data
                );
            })
        }
  },
  created() {
    // 统计有无护照的警员数量
    getCountPassport().then((res) => {
        for (let key in res) {
            this.withoutPassport.data.rows.push({passport: key, number: res[key]})
        }
    });

    // 显示当前护照在管和在民警手里的数量饼状图
    getCertificateInfoStatistics().then((res) => {
        for (let key in res) {
            this.passport.data.rows.push({
                passportManage: key,
                number: res[key]
            })
        }
    });

    // 按目的地显示今年出国次数top10
    getPalaceInfoStatistics().then((res) => {
      for (let key in res) {
        this.goingAbroad.data.rows.push({ place: key, num: res[key] })
      }
    });

    // 获取出勤出境分页
    this.query()
  }
};
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
</style>
