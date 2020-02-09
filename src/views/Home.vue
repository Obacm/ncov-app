<template>
  <div class="home">
   <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <div v-if="lists.length > 0">
      <van-cell v-for="(item, index) in lists" :key="index" :title="item.city_name" size="large" @click="setCity(index)"/>
    </div>
    <div v-else>
      <van-cell v-for="(item, index) in items" :key="index" :title="item.province_name" size="large" @click="getCity(index)"/>
    </div>
    </van-list>
  </div>
</template>

<script>
import { getCityList } from '../api'
import { Toast } from 'vant'
import { storage } from "../utils/storage"

export default {
  data () {
    return {
      items: [],
      lists: [],
      city: {},
      loading: false,
      finished: false,
    }
  },
  mounted () {
    this.toast()
  },
  methods: {
		async onLoad() {
      let list = await getCityList()
      this.items = list.data
      this.finished = true
    },
    getCity (index) {
      this.lists = this.items[index].cities
    },
    setCity (index) {
      this.city = this.lists[index]
      storage.set("_city", JSON.stringify(this.city));
      this.$router.push('/hospitals')
    },
    toast () {
      Toast('点击选择所在省市');
    }
	}
}
</script>

<style>
.home {
  text-align: center;
}
</style>
