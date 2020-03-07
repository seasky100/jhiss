<template>
        <div>
          <el-dialog :title="title" :visible.sync="visible">
            <div class="detail-wrapper">
                    <div class="m_body" v-for="(item,index) in tabelData" :key="index">
                            <div class='m_message'>
                              <span>{{item.name}}</span>
                              <span class="m_code">{{item.code}}</span>
                              <span class="m_code">{{item.dept}}</span>
                            </div>
                            <div class="m_things">
                              预警时间：{{item.time}}
                            </div>
                            <div class="m_things">
                              预警原因：{{item.reason}}
                            </div>
                            <div class="m_unusual" v-for="(item1,index2) in item.list" :key="index2">
                              <div class="m_message">
                                {{item1.name}}
                              </div>
                            </div>
                            <div class="m_message renack">
                              <div class="m_message">本人反馈</div>
                              <div class="m_message m_center">
                                <div class="m_message m_time">
                                  2020年2月22日 11:35:23
                                </div>
                                <div class="m_message m_content">小孩突然发高烧，事关紧急未及时汇报</div>
                              </div>
                            </div>
                            <div class="m_message m_textarea">层级领导反馈</div>
                            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                            </el-input>
                            <div class="m_message m_textarea">职能部门反馈</div>
                            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                            </el-input>
                          </div>
                          <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                          </span>
            </div>
          </el-dialog>
        </div>
      </template>
      
      <script>
      import { format } from 'date-fns';
      import { getWarnInfo } from '@/api/warn.js';
      
      export default {
        props: {
          title: {
            type: String,
            default: '预警详情'
          }
        },
        filters: {
          formatTime(val, type = 'yyyy-MM-dd HH:mm:ss') {
            if(val) {
              return format(val, type);
            }
          }
        },
        data() {
          return {
            visible: false,
            detailInfo: {},
            textarea: '',
      tabelData: [
        {
          name: '张三',
          code: '001',
          dept: '机关纪委',
          time: '2019年12月20日 11:50:32',
          reason: '本人累计迟到3次及以上',
          list: [
            {
              name: '异常记录1：2019年12月21日 09:23:56 迟到 考勤方式 门禁'
            },
            {
              name: '异常记录1：2019年12月21日 09:23:56 迟到 考勤方式 门禁'
            },
            {
              name: '异常记录1：2019年12月21日 09:23:56 迟到 考勤方式 门禁'
            }
          ]
        }
      ],
          }
        },
        methods: {
          open(option) {
            this.visible = true;
            this.getDetailInfo(option);
          },
          getDetailInfo(option) {
            const params = {
              userId: option.userId,
              deptId: option.id
            }
            getWarnInfo(params).then(res => {
              // console.log(res);
              if(res.success) {
                this.detailInfo = res.data;
              }
            })
          }
        }
      }
      </script>
      
      <style lang="stylus" scoped>
.m_textarea{
    margin-left: 60px !important;
  }
  .m_body{
    height: 650px;
    border: 1px solid;
    margin: 10px;
    overflow: auto;
  }
  
  .text {
      font-size: 14px;
    }
  .m_things{
    line-height: 24px;
    text-align: left;
    margin-left: 25px;
  }
  .m_message{
    text-align: left; 
    margin-left: 25px;
    line-height: 40px;
  }
  .m_code{
    margin-left: 10px;
  }
  .m_center{
    border: 1px solid;
    width: 90%;
    margin: 0 auto;
  }
      </style>
      