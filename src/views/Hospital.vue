<template>
  <div>
    <van-cell-group>
      <van-cell :title="hospital.name" size="large" icon="add"/>
      <van-cell :title="hospital.address" size="large" icon="map-marked" />
      <van-cell :title="hospital.source_type" size="large" icon="eye" />
      <van-cell icon="weapp-nav" class="source" size="large">
        <a :href="hospital.source_url" target="_blank">来源</a>
      </van-cell>
      <van-cell icon="medal" size="large">
        <span v-for="(type, index) in hospital.type" :key="index">
          <van-tag color="#f2826a" v-if="type == 1">发热门诊</van-tag>
          <van-tag type="primary" v-else>定点医院</van-tag>
        </span>
      </van-cell>
      <div id="container">
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import gcoord from 'gcoord'
import { storage } from "../utils/storage"

export default {
  data() {
    return {
    };
  },
  mounted () {
    this.getCurMap()
  },
  methods: {
    getCurMap () {
      let position = gcoord.transform(
        [this.hospital.geo.lng, this.hospital.geo.lat],
        gcoord.WGS84,
        gcoord.GCJ02
      );

      let map = new window.AMap.Map('container', {
        center: position,
        zoom: 13
      });

      let marker = new window.AMap.Marker({
          position: position,
          title: this.hospital.name
      });

      map.add(marker)
    }
  },
  computed: {
    hospital () {
      return JSON.parse(storage.get("_hospital"));
    }
  },
};
</script>

<style>
#container{
  width: 100%;
  height: 300px;
}
.source a {
  color: #3399ea;
}
</style>
