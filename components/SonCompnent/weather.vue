<template>
  <div>
    <div
      class="BigBlock AboutMeMarginTop weathDev"
      :class="city ? '' : 'weathNo'"
    >
      <div class="TitleFontLine weathTitle">
        <span class="citySpan">{{ city }}</span
        >天气
      </div>
      <div class="BlogStatistic weathContent">
        <div
          class="BlogStatisticItem borderRight"
          v-for="(item, i) in weathArray"
          v-bind:key="i"
        >
          <div class="weathWeek" v-html="item.week"></div>
          <!-- <div class="weathDay">11月23日</div> -->
          <div class="weathDay">{{ item.date }}</div>
          <div class="weathIcon">
            <i
              :class="`iconfont ${item.dayweatherIcon}`"
              style="font-size: 1.8rem; color: #03a9f47d"
            ></i>
            <!-- <svg class="icon" aria-hidden="true">
                        <use :xlink:href="`#${item.dayweatherIcon}`"></use>
                      </svg> -->
          </div>
          <div class="weathChinese" :title="item.dayweather">
            {{ item.dayweather }}
          </div>
          <div class="temperature">
            {{ item.nighttemp }} ~ {{ item.daytemp }}°C
          </div>
        </div>
      </div>
    </div>

    <div class="BigBlock AboutMeMarginTop" >
      <div class="TitleFontLine">联系我</div>
      <div class="BlogStatistic" style="border-top: none; padding-bottom: 0">
        <div class="BlogStatisticItem">
          <a href="https://github.com/SunQQQ" target="_blank"
            ><i
              class="iconfont icon-github AboutMeIcon"
              style="color: #948aec"
            ></i
          ></a>
        </div>
        <div
          class="BlogStatisticItem my-pointer"
          @click="infoMessage('13213074006')"
        >
          <i
            class="iconfont AboutMeIcon icon-weixin"
            style="color: #f46e65"
          ></i>
        </div>
        <div
          class="BlogStatisticItem my-pointer"
          @click="infoMessage('1585437938@qq.com')"
        >
          <i
            class="iconfont icon-youxiang AboutMeIcon"
            style="color: #49a9ee"
          ></i>
        </div>
        <div class="BlogStatisticItem">
          <a
            href="https://www.zhihu.com/people/s-q-51-44-23/activities"
            target="_blank"
            ><i
              class="iconfont icon-zhihu AboutMeIcon"
              style="color: #3dbd7d"
            ></i
          ></a>
        </div>
        <div class="BlogStatisticItem">
          <a href="https://blog.csdn.net/sun_qqq" target="_blank"
            ><i
              class="iconfont icon-CN_csdnnet AboutMeIcon"
              style="color: #f78e3d"
            ></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import weekJson from '@/static/map/week.json';
import weathJson from '@/static/map/weath.json';
export default {
  name: "weather",
  data: function () {
    return {
      weathArray: [],
      city: "",
    };
  },
  methods: {
    // 设置天气预报模块
    setWeathe: function () {
      let sunqBlogWeather = ""; // 3小时内不再刷新

      if (sunqBlogWeather) {
        this.renderWeathDom(sunqBlogWeather);
      } else {
        this.GetLocation(this.getWeathData);
      }
    },

    getWeathData: function (cityName, cityCode) {
      let that = this;
      axios({
        url: "https://restapi.amap.com/v3/weather/weatherInfo",
        method: "GET",
        params: {
          key: "ba5f9b69f0541123a4dbe142da230b4d",
          city: cityCode,
          extensions: "all",
          output: "JSON",
        },
      })
        .then(function (resp) {
          that.renderWeathDom(resp.data);

          that.setSQCookie("sunqBlogWeather", resp.data, 3); // 相隔3小时同一浏览器再次访问时会重新获取天气
        })
        .catch();
    },

    renderWeathDom: function (dataObj) {
      if (dataObj.status == "1" && dataObj.infocode == "10000") {
        let that = this,
          weathArray = dataObj.forecasts[0].casts,
          week;

        that.city = dataObj.forecasts[0].city;
        if (weathArray.length > 0) {
          weathArray.forEach(function (item, i) {
            if (i == 0) {
              item.week =
                weekJson[item.week] +
                '<span style="font-size:0.5rem">(今天)</span>';
            } else {
              item.week = weekJson[item.week];
            }

            item.date =
              item.date.split("-")[1] + "月" + item.date.split("-")[2] + "日";
            item.dayweatherIcon = weathJson[item.dayweather];
          });
          weathArray.pop();
          that.weathArray = weathArray;
        }
      }
    },
  },
  mounted: function () {
    this.setWeathe();
  },
};
</script>

<style scoped lang="less">
@import "../../static/css/messageBoard";
</style>