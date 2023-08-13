<template>
  <transition name="Fade" mode="out-in">
    <div style="position: relative">
      <div class="MessageBoardCover" @click="CloseMessageSubmit">
        <div :class="
          OpenMessageSubmitValue
            ? 'WriteMessageFrameFadeIn'
            : 'WriteMessageFrameFadeOut'
        ">
          <div class="WriteMessageFrameLeft">
            <img src="../static/img/DefaultHeadIcon.jpg" />
            <div>欢迎你来</div>
          </div>
          <div style="flex: 1">
            <div :class="
              OpenTextAreaCover
                ? 'WriteMessageFrameContent'
                : 'WriteMessageFrameContent WriteMessageFrameContentColorBorder'
            ">
              <!--阻止触发CloseMessageSubmit-->
              <textarea ref="LeaveMessageTextArea" placeholder="输入留言" v-model="MessageText" @click.stop="">
              </textarea>
              <span class="EmotionButton" @click="OpenEmotions()">
                <i class="iconfont icon-face IconfontSize"></i>
              </span>
              <!--需阻止冒泡，否则会冒泡到最上层，触发CloseMessageSubmit方法。该方法逻辑与此处方法操作相反-->
              <div class="TextAreaCover" @click.stop="OpenMessageSubmit()" v-if="OpenTextAreaCover">
                来都来啦，留个脚印吧
              </div>
            </div>
            <div class="OpenMessageSubmit">
              <div class="LeaveMessageName">
                <!--阻止触发CloseMessageSubmit-->
                <input placeholder="输入你的大名或昵称" v-model="MessageLeaveName" @click.stop="" />
              </div>
              <div class="OpenMessageSubmitButton" @click="MessageSubmit(false)">
                提交
              </div>
            </div>
          </div>
        </div>
        <div class="boat">
          <img src="../static/img/boat.png" />
        </div>
      </div>

      <div class="BlogIndexContent">
        <div class="BlogFlex">
          <div class="BlogIndexContentLeft" style="
              background-color: #ffffff;
              margin-top: 1rem;
              border: 1px solid #e9e9e9;
              border-radius: 3px;
            ">
            <div class="CommentList">
              <div class="CommentItem" v-for="(item, i) in MessageList" v-bind:key="i">
                <div class="CommentItemIcon">
                  <!--如果用户名是sunq，直接展示我的专属头像。如果不是sunq，展示库里存的本条数据的头像，如果数据里该字段为空，展示默认头像-->
                  <img :src="getIconAdress(item.iconNo)" v-if="item.MessageLeaveName != 'sunq'" />
                  <img src="../static/img/ZhihuIcon.jpg" v-if="item.MessageLeaveName == 'sunq'" />
                </div>
                <div class="CommentItemContent">
                  <div>
                    {{ item.MessageLeaveName }}
                    <span v-if="
                      item.LocationCityName &&
                      item.LocationCityName.length > 0
                    ">
                      <i class="iconfont icon-buoumaotubiao23 LocationIconfont"></i>{{ item.LocationCityName }}
                    </span>
                  </div>
                  <div class="ArticleCommentText" v-html="item.MessageText">
                    {{ item.MessageText }}
                  </div>
                  <div class="DateAnswer">
                    <div class="DateAnswerLeft">
                      {{ item.MessageLeaveDate }}
                    </div>
                    <div class="DateAnswerRight" @click="AnswerMessage(item)">
                      回复
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="NoDataHint" v-if="MessageList.length == 0">
              暂无数据
            </div>
            <div class="MessageBoardListBottom" v-if="AticleBottom">
              你滑到我底线啦
            </div>
          </div>
          <div class="BlogIndexContentRight messageboard-page" style="border: 1px solid #e9e9e9; border-radius: 3px">
            <div class="Module" style="padding: 0 0 0.5rem; background-color: transparent">
              <githubData/>
              <weather/>
            </div>
          </div>
        </div>
        <Pagination v-on:PaginationToParent="ValueByPagition" ref="Pagi"></Pagination>
      </div>
      <!--回复留言弹框PageActive-->
      <div style="
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        " v-if="MessageAnswerFrame">
        <div class="MessageBoxWrapper" @click="CloseAnswerMessage()"></div>
        <div class="WriteMessageFrameFadeIn" style="
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
          ">
          <div class="WriteMessageFrameLeft">
            <img src="../static/img/DefaultHeadIcon.jpg" />
            <div>回复留言</div>
          </div>
          <div style="flex: 1; position: relative">
            <div class="
                WriteMessageFrameContent
                WriteMessageFrameContentColorBorder
              ">
              <textarea ref="AnswerMessageContentDom" placeholder="输入留言" v-model="MessageText"></textarea>
              <span class="EmotionButton" @click="OpenEmotions()">
                <i class="iconfont icon-face IconfontSize"></i>
              </span>
            </div>
            <div class="OpenMessageSubmit">
              <div class="LeaveMessageName">
                <input placeholder="输入你的大名或昵称" v-model="MessageLeaveName" />
              </div>
              <div class="OpenMessageSubmitButton" @click="MessageSubmit(true)">
                提交
              </div>
            </div>
            <div class="CloseAnswerMessage" @click="CloseAnswerMessage()">
              <i class="iconfont icon-fork IconfontSize"></i>
            </div>
          </div>
        </div>
      </div>
      <Emotion ref="EmotionB" @AppendInputValue="AppendMessageText"></Emotion>
    </div>
  </transition>
</template>

<script>
import Pagination from "@/components/SonCompnent/Pagination";
import Emotion from "@/components/SonCompnent/Emotion";
import weather from "@/components/SonCompnent/weather";
import githubData from "@/components/SonCompnent/githubData";


export default {
  name: "MessageBoard",
  layout:'blog',
  components: { Pagination, Emotion,weather,githubData },
  computed: {
    MessageText: {
      get() {
        return this.$store.state.MessageText;
      },
      set(Value) {
        this.$store.commit("ChangeMessageText", Value);
      },
    },
  },
  data: function () {
    return {
      OpenTextAreaCover: true, // textarea遮层
      OpenMessageSubmitValue: false, // 提交按钮显示
      IconAdress:
        "../static/img/default_headicon_" +
        Math.round(Math.random() * 3) +
        ".jpg", // 留言信息的默认头像地址
      MessageLeaveName: "", //留言人姓名
      MessageList: "", // 留言列表
      MessageLeaveDate: "", // 写留言的时间
      MessageAnswerFrame: false, //回复留言弹框
      FadeAnimate: false, // 弹框显隐动画
      AticleBottom: false, // 文章底线
      buttonAnimate: false, // 博客入口按钮动画
      parentId: ""
    };
  },
  methods: {
    // 展示留言textarea
    OpenMessageSubmit: function () {
      // 隐藏textarea的遮层
      this.OpenTextAreaCover = false;
      //显示提交按钮
      this.OpenMessageSubmitValue = true;
      this.$refs["LeaveMessageTextArea"].focus();

      // 填写缓存中游客名
      var LocalCommonUser = this.GetLocalStorage("SunqBlog");
      if (LocalCommonUser.toString() != "{}") {
        this.MessageLeaveName = LocalCommonUser.ArticleCommentNickName;
      }
    },

    CloseMessageSubmit: function () {
      // 隐藏textarea的遮层
      this.OpenTextAreaCover = true;
      //隐藏提交按钮
      this.OpenMessageSubmitValue = false;
    },

    getIconAdress: function (iconNo) {
      return require("@/static/img/default_headicon_" +
        iconNo.toString() +
        ".jpeg");
    },

    // 提交留言
    MessageSubmit: function (tag) {
      var That = this;

      if (this.$store.getters.GetMessageText && this.MessageLeaveName) {
        let MatchedMessageText = That.MatchEmotion(
          this.$store.getters.GetMessageText
        ),
          iconNo = this.GetLocalStorage("SunqBlog").ArticleCommentIcon || Math.round(Math.random() * 4);

        this.GetLocation(function (LocationCityName) {
          That.SQFrontAjax({
            Url: "/api/MessageCreate/foreend",
            UploadData: {
              MessageText: MatchedMessageText,
              MessageLeaveName: That.MessageLeaveName,
              MessageLeaveDate: new Date(),
              LocationCityName: LocationCityName,
              iconNo: iconNo,
              parentId: tag ? That.parentId : "" // 留言时此标示传false，回复时传true
            },
            Success: function () {
              That.$store.commit("ChangeTip", {
                Show: true,
                Title: "留言成功",
              });
              // 清空留言框
              That.$store.commit("CleanMessageText");
              // 存储用户名到本地
              That.SetLocalStorage("SunqBlog", {
                Key: "ArticleCommentNickName",
                Value: That.MessageLeaveName,
              });
              // 存储用户的随机头像放到本地
              That.SetLocalStorage("SunqBlog", {
                Key: "ArticleCommentIcon",
                Value: iconNo,
              });

              // 刷新留言列表
              That.MessageRead();

              // 如果是回复留言，关闭留言弹框
              That.MessageAnswerFrame = false;
              // 初始TextArea框遮盖
              That.OpenTextAreaCover = true;

              // 创建日志
              That.createLog({
                moduleType: "button",
                operateType: "留言",
                operateContent: MatchedMessageText,
              });
            },
          });
        });
      } else {
        this.$store.commit("ChangeTip", {
          Show: true,
          Title: "昵称和留言不能为空呦",
        });
      }
    },

    // 渲染留言列表
    MessageRead: function () {
      var That = this;

      this.SQFrontAjax({
        Url: "/api/MessageRead/foreend",
        UploadData: {
          PagnationData: {
            Skip: 0,
            Limit: 8,
          },
        },
        Success: function (data) {
          // 渲染列表
          data.forEach(function (Item) {
            Item.MessageLeaveDate = That.DateFormat(Item.MessageLeaveDate);
          });
          That.MessageList = data;
        },
      });
      // 默认填写留言输入框的昵称
      var LocalCommonUser = this.GetLocalStorage("SunqBlog");
      if (LocalCommonUser.toString() != "{}") {
        That.MessageLeaveName = LocalCommonUser.ArticleCommentNickName;
      }
    },

    /**
     * 打开回复留言弹框。
     * 点击某条留言数据的回复按钮时，触发此方法。
     * 弹出回复留言弹框，根据缓存回填出留言人信息，准备好输入框光标等动作
     */
    AnswerMessage: function (item) {
      var That = this;
      this.MessageAnswerFrame = true;
      this.FadeAnimate = true;

      // 填写@某人
      this.$store.commit("ChangeMessageText", "@" + item.MessageLeaveName + ":");
      // 父级评论的id
      this.parentId = item.parentId ? item.parentId : item._id;

      // 等弹框Dom渲染完毕后再操作Dom
      setTimeout(function () {
        var DomObject = That.$refs["AnswerMessageContentDom"];
        DomObject.focus();

        // 调节光标到input已填字体后面
        DomObject.setSelectionRange(
          DomObject.value.length,
          DomObject.value.length
        );
      }, 100);

      // 填写缓存中游客名
      var LocalCommonUser = this.GetLocalStorage("SunqBlog");
      if (LocalCommonUser.toString() != "{}") {
        That.MessageLeaveName = LocalCommonUser.ArticleCommentNickName;
      }
    },

    // 关闭回复留言框
    CloseAnswerMessage: function () {
      var That = this;
      this.FadeAnimate = false;
      // 清空留言框
      // this.MessageText = '';
      this.$store.commit("CleanMessageText");

      setTimeout(function () {
        That.MessageAnswerFrame = false;
      }, 200);
    },

    // 上滑加载更多
    ValueByPagition: function (SelectPage) {
      var That = this;
      this.SQFrontAjax({
        Url: "/api/MessageRead/foreend",
        UploadData: {
          PagnationData: {
            Skip: SelectPage * 8,
            Limit: 8,
          },
        },
        Success: function (data) {
          data.forEach(function (Item) {
            Item.MessageLeaveDate = That.DateFormat(Item.MessageLeaveDate);
          });
          That.MessageList = That.MessageList.concat(data);
          if (data.length != 8) {
            That.AticleBottom = true;
            // 停止分页器的滚动监听
            That.$refs.Pagi.SetUpdate(false);
            That.$store.commit("changeFooter",true); // 展示footer
          } else {
            That.$refs.Pagi.SetUpdate(true);
            That.$store.commit("changeFooter",false); // 隐藏footer
            // 创建日志
            That.createLog({
              moduleType: "pageTurn",
              operateType: "下拉留言列表到",
              operateContent: "第" + (SelectPage + 1) + "页",
            });
          }
        },
      });
    },

    // 打开表情框
    OpenEmotions: function () {
      // this.$refs.EmotionB.OpenEmotion(true);
      this.$store.commit("ChangeEmotionShow", true);
    },

    // 点击表情，修改文本
    AppendMessageText: function (EmotionChinese) {
      // 回复弹框弹出时，即为回复留言
      if (this.MessageAnswerFrame) {
        this.$refs["AnswerMessageContentDom"].focus();
      } else {
        this.$refs["LeaveMessageTextArea"].focus();
      }
    }
  },
  mounted: function () {
    this.MessageRead();
    // 切换Topbar高亮
    this.$store.commit("ChangeActive", 1);

    this.$store.commit("changeFooter",false); // 初始化时隐藏footer

    // 创建日志
    this.createLog({
      moduleType: "munu",
      operateType: "选择菜单",
      operateContent: "留言",
    });
  }
};
</script>

<style scoped lang="less">
@import "../static/css/messageBoard";
</style>
