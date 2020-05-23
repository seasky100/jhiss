<template>
  <div class="r_content">
    <div class="r_head">
      <div class="c_title">
        <img style="margin-top: 3px;" src="../../utils/img/home_round_bar@2x.png" />
        云上政工
      </div>
    </div>
    <div class="r_center">
      <div class="r_left">
        <div class="r_menu">
          <div class="menu_top">
            <!-- <div class='t_left'>
              <img class="photo_img" src='../../assets/images/bg/person.png' />
          </div>
          <div class='t_right'>
            <div>张松</div>
            <div>机关纪委</div>
            </div>-->
          </div>
          <div class="menu_foot">
            <div class="r_job">
              <div class="m_menu" style="color: blue;">首页</div>
              <div class="r_icon">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="r_job">
              <div class="m_menu">绩效管理</div>
              <div class="r_icon">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="r_job">
              <div class="m_menu">政工业务</div>
              <div class="r_icon">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="r_job">
              <div class="m_menu">检查考核</div>
              <div class="r_icon">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <!-- <div class="r_job">
            <div class='m_menu'>统计分析</div>
            <div class='r_icon'>
              <i class="el-icon-arrow-right"></i>
            </div>
            </div>-->
            <div class="r_job">
              <div class="m_menu">系统设置</div>
              <div class="r_icon">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="r_right">
        <el-backtop target=".r_right" :visibility-height="100" :bottom="60"></el-backtop>
        <div class="r_top">
          <img class="photo_img" style="width: 99%;height:100%;" src="@/assets/images/banner.png" />
        </div>
        <div class="rc_content" ref="rc_content">
          <!-- 左侧 -->
          <div class="rc_left">
            <!-- 新增日志  -->
            <div class="rc_tap">
              <div style="background:#fff;padding: 0 5px;">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="工作日志" name="first">
                    <div class="rc_write" style>
                      <el-input
                        type="textarea"
                        autosize
                        show-word-limit
                        :disabled="todayNoteStatus==1"
                        :placeholder="todayNoteStatus==0?'发布一条日志，。。(不少于20字，当日重复发布只保留最新一条)':'当日日志已审阅，请勿重复发布'"
                        v-model="newContent"
                        clearable
                        resize="none"
                      ></el-input>
                      <div class="r_send">
                        <el-button :disabled="isEmpty" type="small" @click="saveWorkNote">发布</el-button>
                      </div>
                    </div>
                    <div>
                      <!-- <a class="rc_btn">加班申请</a> -->
                    </div>
                  </el-tab-pane>
                  <!-- <el-tab-pane label="季度业绩" name="second">季度业绩</el-tab-pane> -->
                  <!-- <el-tab-pane label="个人申请" name="third">个人申请</el-tab-pane> -->
                  <!-- <el-tab-pane label="我的信息" name="fourth">我的信息</el-tab-pane> -->
                  <!-- <el-tab-pane label="谈心谈话" name="five">谈心谈话</el-tab-pane> -->
                  <!-- <el-tab-pane label="上门家访" name="six">上门家访</el-tab-pane> -->
                </el-tabs>
              </div>
            </div>
            <!-- 日志内容 -->
            <div class="rc_tap">
              <div style="margin:10px;">
                <el-tabs v-model="activeName1" @tab-click="handleClick1">
                  <template v-for="(item,index) of tabList">
                    <el-tab-pane
                      :key="index+'_tabs'"
                      lazy
                      :label="item.label"
                      :name="index+'_tabs'"
                    >
                      <div v-if="recordsList.length == 0" class="r_loading">加载中。。。</div>
                      <div v-else class="r_log" v-infinite-scroll="load">
                        <div
                          class="c_scont"
                          v-for="(item2,index2) of recordsList"
                          :key="index2+'_pane'"
                        >
                          <el-card class="box-card">
                            <div class="c_top">
                              <!-- <div>
                                <img
                                  style="margin-top: -9px;width: 48px;"
                                  src="../../assets/images/bg/person.png"
                                />
                              </div>-->
                              <div class="e_center_content">
                                <div class="ctitle">
                                  <span>{{item2.userName}}</span>
                                  <span
                                    class="depName"
                                  >{{item2.deptName}} {{item2.noteDate2}} {{dayArray[item2.day]}}</span>
                                  <!-- <a class="rc_btn_a">加班记录</a> -->
                                  <a
                                    class="rc_btn_a"
                                    v-if="item2.status!=1"
                                    @click="changeNote(item2)"
                                  >{{item2.editStatus?'取消':'修改'}}</a>
                                </div>
                                <div class="e_center">
                                  <div
                                    v-if="!item2.editStatus"
                                    class="c_introduce"
                                    style="white-space: pre-wrap;word-break: break-word"
                                  >{{item2.content||'未填写'}}</div>
                                  <div
                                    style="padding-top: 5px; position:relative"
                                    v-if="item2.editStatus"
                                  >
                                    <el-input type="textarea" v-model="item2.content" resize="none"></el-input>
                                    <div style="position:absolute;right: 10px; bottom: 15px;">
                                      <a @click="updateWorkNote(item2)" class="rc_btn">提交</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- 已阅 -->
                              <div class="e_center e_remark" v-if="item2.remarkStatus==1">
                                <div class="e_remark_title">
                                  <a @click="changeComent(item2)" class="rc_btn">
                                    领导审阅/修改审阅
                                    <img
                                      style="width: 13px;vertical-align: middle;"
                                      src="@/assets/images/yszg/edit.png"
                                    />
                                  </a>
                                </div>
                                <div class="c_introduce">
                                  <span style="display:block;">审阅人：{{item2.approverName}}</span>
                                </div>
                                <div class="c_introduce">
                                  <span style="display:block;">审阅内容：{{item2.comment}}</span>
                                  <span style="display:block;">审阅时间：{{item2.remarkTime2}}</span>
                                </div>
                              </div>
                              <!-- 未阅 -->
                              <div class="e_remark" v-else>
                                <div class="e_remark_title">
                                  <a class="rc_btn">领导批示</a>
                                </div>
                                <div style="padding-top: 5px;">
                                  <el-input
                                    type="textarea"
                                    placeholder="请输入批阅内容"
                                    v-model="item2.comment"
                                    resize="none"
                                  ></el-input>
                                </div>
                                <div style="position:absolute;right: 10px; bottom: 15px;">
                                  <a @click="updateWorkNoteClick(item2)" class="rc_btn">审阅</a>
                                  <a
                                    v-if="item2.status==1"
                                    @click="changeComent(item2)"
                                    class="rc_btn"
                                  >取消</a>
                                </div>
                              </div>
                            </div>
                          </el-card>
                        </div>
                      </div>
                    </el-tab-pane>
                  </template>
                </el-tabs>
                <div style="position: absolute;top: 10px;right: 18px;">
                  <!-- <a class="rc_btn">批量操作</a> -->
                </div>
              </div>
            </div>
          </div>
          <!-- 右侧 -->
          <div class="rc_right">
            <div class="r_date">
              <div class style="height: 15%;">
                <div style="margin-top: 10px;margin-left: 15px;font-weight: 600;">工作日历</div>
              </div>
              <div class="p_hevaluate" style="float : left; height: 245px;">
                <el-calendar v-model="today"></el-calendar>
              </div>
            </div>
            <div class="r_attendance">
              <div style="margin-left: 10px;font-weight: 600;padding: 5px 0;">待办事项</div>
              <div style="display: flex;text-align: center;margin: 0 10px;padding-bottom: 5px;">
                <div @click="openDialog" style="width:25%;cursor: pointer;">
                  <img
                    class="photo_img"
                    style="width: 20px;height: 25px;"
                    src="@/assets/images/menu/daiban.png"
                  />
                  <div class="r_list">日志(0)</div>
                </div>
                <div @click="openDialog" style="width:25%;cursor: pointer;">
                  <img
                    class="photo_img"
                    style="width: 20px;height: 25px;"
                    src="@/assets/images/menu/rizhi.png"
                  />
                  <div class="r_list">加班(0)</div>
                </div>
                <div @click="openDialog" style="width:25%;cursor: pointer;">
                  <img
                    class="photo_img"
                    style="width: 20px;height: 25px;"
                    src="@/assets/images/menu/jixiao.png"
                  />
                  <div class="r_list">请销假(0)</div>
                </div>
                <div @click="openDialog" style="width:25%;cursor: pointer;">
                  <img
                    class="photo_img"
                    style="width: 20px;height: 25px;"
                    src="@/assets/images/menu/shenpi.png"
                  />
                  <div class="r_list">出国境(0)</div>
                </div>
                <div @click="openDialog" style="width:25%;cursor: pointer;">
                  <img
                    class="photo_img"
                    style="width: 20px;height: 25px;"
                    src="@/assets/images/menu/huiyi.png"
                  />
                  <div class="r_list">家访(0)</div>
                </div>
              </div>
            </div>
            <div class="r_attendance">
              <div style="margin-left: 10px;font-weight: 600;padding: 5px 0;">常用功能</div>
              <div
                style="display: flex;margin:0 15px; margin-top: 5px;text-align: center;padding-bottom: 5px;"
              >
                <div @click="openDialog" style="width:24%;cursor: pointer;">
                  <img
                    class="photo_img"
                    style="width:57px;height:59px"
                    src="@/assets/images/menu/jiaban.png"
                  />
                  <div class="k_list">加班申请</div>
                </div>
                <div @click="openDialog" style="width:24%;cursor: pointer;">
                  <img
                    class="photo_img"
                    style="width:57px;height:59px"
                    src="@/assets/images/menu/qingjia.png"
                  />
                  <div class="k_list">请假申请</div>
                </div>
                <div @click="openDialog" style="width:24%;cursor: pointer;">
                  <img
                    class="photo_img"
                    style="width:57px;height:59px"
                    src="@/assets/images/menu/buqian.png"
                  />
                  <div class="k_list">考勤补签</div>
                </div>
                <div @click="openDialog" style="width:24%;cursor: pointer;">
                  <img
                    class="photo_img"
                    style="width:57px;height:59px"
                    src="@/assets/images/menu/changyong.png"
                  />
                  <div @click="openDialog" class="k_list">常用功能</div>
                </div>
              </div>
            </div>
            <work-chart></work-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { format, parse, getDay, isToday } from "date-fns";
import {
  findWorknotePage,
  updateWorkNote,
  saveWorkNote,
  noteAduit,
  countWorkNote
} from "@/api/report.js";
import workChart from "./homePage/workChart";
export default {
  name: "Refinement",
  components: {
    workChart
  },
  props: {
    navMenus: {}
  },
  data() {
    return {
      today: new Date(),
      isEmpty: true,
      todayNoteId: null,
      todayNoteStatus: 0,
      nCurrent: 1, //当前页码
      searchData: [
        { userId: this.$store.state.user.userInfo.info },
        { deptId: this.$store.state.user.orgId },
        {},
        { audited: "2" }
      ],
      tabList: [
        { label: "我的日志", name: "", data: [{ name: "" }] }
        // { label: "层级下属日志", name: "", data: [] },
        // { label: "全体民警", name: "", data: [] }
        // { label: "待批阅", name: "", data: [{ name: "" }] }
        // {label: '直接下属', name: '', data: [{name:''}]},
        // {label: '领导互评', name: '', data: [{name:''}]},
      ],
      recordsList: [],
      newContent: "", //日志内容
      limitContent:20,
      activeName: "first",
      activeName1: "0_tabs",
      nyear: "",
      nmonth: "",
      rData: [],
      scores: [],
      ydata: {
        year: "",
        month: "",
        date: ""
      },
      dayArray: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ]
    };
  },
  watch: {
    newContent(val) {
      if (val.length < this.limitContent) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    }
  },
  mounted() {
    this.init();
    this.getIsWorkNoteFinish();
    this.query();
  },
  methods: {
    init() {
      this.rData = this.getMonthDays(this.ydata.year, this.ydata.month).reduce(
        (prev, item, index) =>
          index % 7
            ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
            : [...prev, [item]],
        []
      );
    },
    //编辑审阅信息
    changeComent(item) {
      if (item.remarkStatus == 1) {
        item.remarkStatus = 0;
      } else {
        item.remarkStatus = 1;
      }
    },
    //修改日志
    changeNote(item) {
      if (item.editStatus == 1) {
        item.editStatus = 0;
      } else {
        item.editStatus = 1;
      }
    },
    saveWorkNote(item) {
      if (this.todayNoteId) {
        this.updateWorkNote({
          content: this.newContent,
          id: this.todayNoteId,
          noteDate: new Date().toString
        },true);
      } else {
        this.saveWorkNoteClick();
      }
    },
    //保存日志
    saveWorkNoteClick() {
      const userInfo = JSON.parse(window.sessionStorage.userInfo);
      saveWorkNote(
        Object.assign({
          // comment: "string",//批阅
          content: this.newContent,
          deptId: window.sessionStorage.orgId,
          deptName: window.sessionStorage.orgName,
          noteDate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          noteScore: 10,
          userCreate: window.sessionStorage.userId, //创建人id
          userId: userInfo.info, //精细化id
          userName: window.sessionStorage.realName, //用户名中文
          status: 0
        })
      ).then(res => {
        if (res.success) {
          this.newContent = "";
          console.log("发布成功");
          this.query();
        }
      });
    },
    getIsWorkNoteFinish() {
      findWorknotePage({
        nCurrent: 1,
        nSize: 1,
        userId: this.$store.state.user.userInfo.info,
        // staffed: this.userIds,
        orderByField: "noteDate",
        orderFlag: false
      }).then(res => {
        if (res.success) {
          if (res.data.records.length > 0) {
            let noteDate = res.data.records[0].noteDate;
            let noteDate2 = format(new Date(noteDate), "yyyy-MM-dd");
            if (
              isToday(new Date(noteDate2)) &&
              res.data.records[0].userCreate == window.sessionStorage.userId
            ) {
              this.todayNoteId = res.data.records[0].id;
              //   this.todayNoteStatus = res.data.records[0].status;
            }
          }
        }
      });
    },
    updateWorkNote(data,input_add) {
      if (!data.content) {
        alert("请输入内容。。。");
        return;
      }
      const userInfo = JSON.parse(window.sessionStorage.userInfo);
      const date1 = new Date(data.noteDate);
      const date2 = new Date();
      let iDays = parseInt(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24);
      if (iDays > 15) {
        this.$message({
          type: "warning",
          message: "已经超过15天"
        });
        return;
      }
      let param = Object.assign({
        id: data.id,
        content: data.content,
        userModified: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        status: 0
      });
      updateWorkNote(param).then(res => {
        if (res.success) {
          data.editStatus = 0;
          if(input_add==true){
  this.newContent = "";
          this.query();
          }
        
        }
      });
    },
    //更新日志
    updateWorkNoteClick(data) {
      if (!data.comment) {
        alert("请输入内容。。。");
        return;
      }
      const userInfo = JSON.parse(window.sessionStorage.userInfo);
      const date1 = new Date(data.noteDate);
      const date2 = new Date();
      let iDays = parseInt(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24);
      if (iDays > 15) {
        this.$message({
          type: "warning",
          message: "已经超过15天"
        });
        return;
      }
      let param = Object.assign({
        id: data.id,
        approverName: window.sessionStorage.realName,
        comment: data.comment,
        remarkTime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        leaderId: userInfo.info,
        status: 1
      });
      updateWorkNote(param).then(res => {
        if (res.success) {
          data.status = 1;
          data.remarkStatus = data.status;
          data.approverName = param.approverName;
          data.remarkTime = param.remarkTime;
          data.remarkTime2 = format(new Date(param.remarkTime), "MM-dd HH:mm");
          data.leaderId = param.leaderId;
          console.log(data);
        }
      });
    },
    //滚动加载
    load() {
      this.nCurrent++;
      this.query(this.nCurrent);
    },
    // 查询列表
    query(nCurrent = 1, index = 0) {
      findWorknotePage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 10,
            // staffed: this.userIds,
            orderByField: "noteDate",
            orderFlag: false
          },
          this.searchData[index]
        )
      ).then(res => {
        if (nCurrent == 1) {
          this.recordsList = [];
        }
        // console.log(res.data.records)
        this.recordsList.push(
          ...res.data.records.map(obj => {
            obj.editStatus = 0;
            obj.remarkStatus = obj.status;
            obj.remarkTime2 = format(new Date(obj.remarkTime), "MM-dd HH:mm");
            obj.noteDate2 = format(new Date(obj.noteDate), "yyyy-MM-dd");
            obj.day = getDay(new Date(obj.noteDate));
            return obj;
          })
        );
      });
    },

    openDialog() {
      alert("功能建设中。。");
    },
    getMonthDays(year, month) {
      const firstDayOfMonth = this.$dayjs(new Date(year, month, 1));
      const from = firstDayOfMonth.subtract(firstDayOfMonth.day(), "day");
      const lastDayOfMonth = firstDayOfMonth.add(1, "month").subtract(1, "day");
      const to = lastDayOfMonth.add(6 - lastDayOfMonth.day(), "day");
      return new Array(
        firstDayOfMonth.daysInMonth() +
          firstDayOfMonth.day() +
          6 -
          lastDayOfMonth.day()
      )
        .fill(0)
        .map((item, index) => from.add(index, "day"));
    },
    prevMonth() {
      const d = this.$dayjs(
        new Date(this.ydata.year, this.ydata.month, this.ydata.date)
      ).subtract(1, "month");
      this.rData = [];
      this.ydata.year = d.year();
      this.ydata.month = d.month();
      this.rData = this.getMonthDays(d.year(), d.month()).reduce(
        (prev, item, index) =>
          index % 7
            ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
            : [...prev, [item]],
        []
      );
      // this.commitQuery(d.year(), d.month(), this.props.userInfo.userInfo.info);
    },
    nextMonth() {
      const d = this.$dayjs(
        new Date(this.ydata.year, this.ydata.month, this.ydata.date)
      ).add(1, "month");
      this.rData = [];
      this.ydata.year = d.year();
      this.ydata.month = d.month();
      this.rData = this.getMonthDays(d.year(), d.month()).reduce(
        (prev, item, index) =>
          index % 7
            ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
            : [...prev, [item]],
        []
      );
      // this.commitQuery(d.year(), d.month(), this.props.userInfo.userInfo.info);
    },
    backToday() {
      const d = this.$dayjs(new Date());
      this.rData = [];
      this.ydata.year = d.year();
      this.ydata.month = d.month();
      this.rData = this.getMonthDays(d.year(), d.month()).reduce(
        (prev, item, index) =>
          index % 7
            ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
            : [...prev, [item]],
        []
      );
      // this.commitQuery(d.year(), d.month(), this.props.userInfo.userInfo.info);
    },
    // 是否已评分
    isMarked(item) {
      item && "012345678910".includes(item.noteScore);
    },
    scoreItemOf(d) {
      this.scores.find(item => new Date(item.noteDate).getDate() === d.date());
    },
    scoreOf(d) {
      (this.scoreItemOf(d) || {}).noteScore;
    },
    colorOf(score) {
      if (score >= 9) {
        ("#73CD6C");
      }
      if (score >= 7) {
        ("#235FF6");
      } else {
        if ("0123456".includes(score)) {
          ("#DB0F2C");
        }
      }
    },
    titleOf(d) {
      const scoreItem = this.scores.find(
        item => new Date(item.noteDate).getDate() === d.date()
      );
      if (scoreItem && "012345678910".includes(scoreItem.noteScore)) {
        return d.format("YYYY/MM/DD") + " 已评分" + scoreItem.noteScore;
      } else {
        return d.format("YYYY/MM/DD") + " 未评分";
      }
    },
    handleClick(tab, event) {},
    //列表内容切换
    handleClick1(tab, event) {
      this.query(1, tab.index);
    }
  }
};
</script>
  <style lang="stylus" scoped>
  .r_content {
    width: 100%;
    height: 100%;
    /* display: flex; */
  }

  .r_content >>> .el-calendar-table .el-calendar-day {
    text-align: center;
  }

  .r_content >>> .el-calendar__header {
    margin-bottom: 5px;
  }

  .rc_write {
    margin-top: 5px;
    padding-bottom: 10 px;

    .el-textarea {
      height: auto !important;
    }

    /deep/ .el-textarea__inner {
      max-height: 360px;
      overflow: hidden auto;
    }
  }

  .r_list {
    font-size: 12px;
  }

  .r_left {
    width: 15%;
  }

  .r_right {
    width: 90%;
    height: 100%;
    overflow-x: hidden;
  }

  .r_top {
    height: 10%;
    margin-bottom: 5px;
  }

  .rc_content {
    display: flex;
    margin-top: 10px;
  }

  .rc_left {
    width: 70%;
    /* display: flex; */
  }

  .rc_right {
    width: 30%;
  }

  .r_head {
    height: 5%;
    width: 100%;
  }

  .r_center {
    height: 95%;
    display: flex;
    width: 95%;
  }

  .c_title {
    float: left;
    width: 100%;
    margin-bottom: 0;
    font-size: 15px;
    font-weight: bold;
    line-height: 30px;
    padding-left: 10px;
    background-color: white;
    padding-top: 6px;
  }

  .r_menu {
    // height: 38%;
    background-color: #fff;
    width: 88%;
    float: right;
    margin-right: 10px;
  }

  .menu_top {
    display: flex;
    // height: 20%;
    padding-left: 10px;
  }

  .t_left {
    width: 28%;
    margin: 8px;
  }

  .t_right {
    line-height: 20px;
    margin-top: 10px;
    color: #235FF6;
  }

  .m_menu {
    cursor: pointer;
    line-height: 25px;
    margin-left: 20px;
    margin-top: 10px;
    width: 80%;
  }

  .rc_tap {
    position: relative;
    margin-bottom: 10px;
    background: #fff;
    border-radius: 5px;
  }

  .r_send {
    text-align:right;
    padding:2px 0;
  }

  .c_top {
    padding: 12px 0 0 10px;
    display: flex;
  }

  .c_content {
    border: 1px solid #ccc;
  }

  .ctitle {
    width: 100%;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #ccc;
  }

  .e_date {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(141, 154, 173, 1);
    height: 20px;
  }

  .e_learn {
    display: flex;
    padding-top: 10px;
  }

  .c_cetitle {
    width: 30%;
    padding-left: 24px;
    /* color: #ff0e02; */
    margin-top: 20px;
    font-size: 14px;
    font-weight: bolder;
  }

  .c_introduce {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #515a6e;
    margin-top: 5px;
    margin-right: 10px;
    margin-left: 28px;
    text-indent: 0px;
    line-height: 22px;
    letter-spacing: 1px;
    position: relative;
  }

  .e_foot {
    display: flex;
    padding-top: 10px;
  }

  .r_date {
    /* margin: 10px; */
    margin-left: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    margin-right: 10px;
    display: grid;
  }

  .r_attendance {
    margin: 10px;
    background-color: #fff;
    padding: 5px;
  }

  .k_list {
    margin-top: 10px;
  }

  .r_job {
    width: 100%;
    display: flex;
    margin-bottom: 7px;
  }

  .r_loading {
    color: orange;
    text-align: center;
  }

  .r_log {
    margin-top: 5px;
    /* overflow: scroll;
    overflow: auto; */
  }

  .r_icon {
    width: 15%;
    line-height: 25px;
    margin-left: 20px;
    margin-top: 10px;
  }

  .menu_foot {
    margin-top: 16px;
  }

  .p_hevaluate {
    float: left;
    height: 90%;
    margin-left: 1em;
    margin-right: 2em;
  }

  .depName {
    // display: block;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    color: #aaa;
    margin-left: 10px;
  }

  .e_center {
  }

  .e_remark {
    border-left: 1px solid #ccc;
    width: 40%;
    position: relative;
  }

  .e_remark_title {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 0 0 3px 12px;
  }

  .e_center_content {
    // padding-bottom: 10px;
    width: 60%;
    // border-bottom: 1px solid #f5f5f5;
  }

  .e_center >>> .el-textarea__inner {
    margin: 0;
    padding: 7px 50px 0px 8px;
  }

  .r_content >>> .el-tabs__header {
    background: #fff;
    margin: 0 0 2px;
  }

  .box-card {
    margin-top: 5px;
    border-radius: 5px;
  }

  .rc_btn {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    margin-left: 5px;
    color: rgba(35, 95, 246, 1);
  }

  .rc_btn_a {
    color: orange;
    float: right;
    margin-right: 5px;
    font-size: 12px;
  }
</style> 
  