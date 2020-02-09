<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, index) in items" :key="index" :title="item.name" size="large" @click="getHospital(index)">
        <span v-for="(type, index) in item.type" :key="index">
          <van-tag color="#f2826a" v-if="type == 1">发热门诊</van-tag>
          <van-tag type="primary" v-else>定点医院</van-tag>
        </span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getHospitalList } from "../api"
import { Toast } from 'vant'
import { storage } from "../utils/storage"

export default {
  data() {
    return {
      items: [],
      loading: false,
      finished: false,
      page: 1,
      show: false,
      title:
        "请在产品中强烈建议用户，在前往发热门诊或定点医院前，先向各自社区、各地疾控中心、卫健委或其他相关部门报备或咨询。"
    };
  },
  mounted () {
    this.toast()
  },
  methods: {
    async onLoad() {
      let city = JSON.parse(storage.get("_city"));
      let list = await getHospitalList({
        city_code: city.city_code,
        page: this.page
      });

      list.data.forEach(element => {
        this.items.push(element);
      });

      this.loading = false;

      if (list.links.next_url != "") {
        this.page += 1;
      } else {
        this.finished = true;
      }
    },
    getHospital (index) {
      storage.set("_hospital", JSON.stringify(this.items[index]));
      this.$router.push('/hospital')
    },
    toast () {
      Toast('点击查看详情');
    }
  }
};
</script>

<style>
.van-tag {
  margin-left: 4px;
}
</style>
