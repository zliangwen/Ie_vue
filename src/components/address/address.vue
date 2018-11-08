
<template>
<div class="clearfix">
    <baidu-map class="map" id='allmap'>

    </baidu-map>
</div>
  
</template>
<script>
import '../../assets/reset.css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '测试一下'
    }
  },
    methods: {
    // 返回
        baiduMap () {
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.331398,39.897445);
            map.centerAndZoom(point,15);
            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint("浙江省杭州市西湖区文三路259号昌地火炬大厦1号楼6楼", function(point){
                if (point) {
                    map.centerAndZoom(point, 17);
                    map.addOverlay(new BMap.Marker(point));
                    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
                   
                }else{
                    alert("您选择地址没有解析到结果!");
                }
            }, "");  
        }
    },

    mounted(){
        this.baiduMap()
    }
}
</script>
<style>
.map {
  width: 100%;
  height: 400px;
}.BMap_bubble_title{
    font-size: 14px;
    width:200px;
    white-space:pre-wrap;
}
.BMap_bubble_content{
    font-size: 12px;
}
</style>