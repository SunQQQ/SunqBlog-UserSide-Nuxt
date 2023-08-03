<template>
  <div>
    <div class="BigBlock AboutMeMarginTop weathDev" v-if="city">
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
    <!-- 存在少数访客无法获取所在城市定位的清空，此时将展示联系我组件 -->
    <concatMe v-if="!city"></concatMe>
  </div>
</template>

<script>
import axios from "axios";
import weekJson from '@/static/map/week.json';
import weathJson from '@/static/map/weath.json';
import concatMe from '@/components/SonCompnent/concatMe' 
export default {
  name: "weather",
  data: function () {
    return {
      weathArray: [],
      city: ""
    };
  },
  components:{
    concatMe
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