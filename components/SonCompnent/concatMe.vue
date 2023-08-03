<template>
    <div class="BigBlock AboutMeMarginTop">
        <div class="TitleFontLine">联系我</div>
        <div class="BlogStatistic" style="border-top: none; padding-bottom: 0">
            <div class="BlogStatisticItem" @click="concate('github')">
                <a href="https://github.com/SunQQQ" target="_blank"><i class="iconfont icon-github AboutMeIcon"
                        style="color: #948aec"></i></a>
            </div>
            <div class="BlogStatisticItem my-pointer" @click="infoMessage('13213074006');concate('微信')">
                <i class="iconfont AboutMeIcon icon-weixin" style="color: #f46e65"></i>
            </div>
            <div class="BlogStatisticItem my-pointer" @click="infoMessage('1585437938@qq.com');concate('邮箱')">
                <i class="iconfont icon-youxiang AboutMeIcon" style="color: #49a9ee"></i>
            </div>
            <div class="BlogStatisticItem" @click="concate('知乎')">
                <a href="https://www.zhihu.com/people/s-q-51-44-23/activities" target="_blank"><i
                        class="iconfont icon-zhihu AboutMeIcon" style="color: #3dbd7d"></i></a>
            </div>
            <div class="BlogStatisticItem" @click="concate('CSDN')">
                <a href="https://blog.csdn.net/sun_qqq" target="_blank"><i class="iconfont icon-CN_csdnnet AboutMeIcon"
                        style="color: #f78e3d"></i></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "concatMe",
    methods: {
        // 联系我的弹出框
        infoMessage: function (message) {
            this.$store.commit("ChangeTip", {
                Show: true,
                Title: message,
            });
        },
        // 点击联系方式后，创建日志
        concate: function (operateContent) {
            this.createLog({
                moduleType: "button",
                operateType: "点击联系途径",
                operateContent: operateContent,
            });
        }
    }
}
</script>

<style scoped lang="less">
@import "../../static/css/messageBoard";
</style>
