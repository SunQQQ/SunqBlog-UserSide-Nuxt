<template>
    <div class="GitPart" @mouseenter="setButtonAnimate(true)" @mouseleave="setButtonAnimate(false)">
        <div class="TopBackBlack"></div>
        <div class="GitPic">
            <img src="../../static/img/ZhihuIcon.jpg" />
        </div>
        <div class="GitBack">
            <i class="iconfont TopBackBlackGit icon-github1"></i>
        </div>
        <div class="Content">
            <div class="GitName">孙权的Github</div>
            <a class="BlueButton" :class="buttonAnimate ? 'open_animate' : ''" href="https://github.com/SunQQQ"
                target="_blank" @click="readCode()">博客源码</a>
            <div class="BlogStatistic">
                <div class="BlogStatisticItem">
                    <div class="BlogStatisticItemNum">75</div>
                    <div class="BlogStatisticItemText AboutMeGitData">
                        Followers
                    </div>
                </div>
                <div class="BlogStatisticItem">
                    <div class="BlogStatisticItemNum">230</div>
                    <div class="BlogStatisticItemText AboutMeGitData">
                        Star
                    </div>
                </div>
                <div class="BlogStatisticItem">
                    <div class="BlogStatisticItemNum">19</div>
                    <div class="BlogStatisticItemText AboutMeGitData">
                        Repositories
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "githubData",
    methods: {
        // 查看源码
        readCode: function () {
            // 创建日志
            this.createLog({
                moduleType: "button",
                operateType: "查看源码",
                operateContent: "留言板入口",
            });
        },
        // 设置按钮动画的开始与停止
        setButtonAnimate: function (status) {
            this.buttonAnimate = status;
        }
    }
}
</script>

<style scoped lang="less">
@import "../../static/css/messageBoard";
</style>