<template>
  <div class="main-container">
    <div id="map"></div>
  </div>
</template>
<script>
// import turf from "@turf/turf";
// import along from "@turf/along";
import clip from "turf-clip";
export default {
  name: "mainMap",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      if (!mapboxgl.supported()) {
        console.error("您的浏览器不支持WebGL,请升级到最新版本。");
        return;
      }
      var style = {
        version: 8,
        name: "Bright",
        sources: {},
        center: [108.35634196000183, 33.4908120773096],
        zoom: 2,
        // "sprite": "http://localhost:8080/new-mbg/sprites/sprite",
        // "glyphs": "http://localhost:8080/new-mbg/glyphs/{fontstack}/{range}.pbf",
        layers: [
          {
            type: "background",
            layout: {
              visibility: "visible"
            },
            paint: {
              "background-color": "#87c2e4"
            },
            id: "0"
          }
        ]
      };
      var map = new mapboxgl.Map({
        container: "map",
        style: style
      });
      this.map = map;

      map.on("load", this.load);
    },
    load() {
      this.axios.getProvince().then(res => {
        var province = res;
        var bbox = turf.bbox(province);
        var options = {
          bbox: bbox
        };
        this.util.addTempLayer(3, province, this.map);

        // 10000 25tick
        // 5000 11tick
        // 2000 5tick
        var points = turf.randomPoint(2000, options);
        // points = clip(province, points);
        points = turf.pointsWithinPolygon(points, province);

        var voronoiPolygons = turf.voronoi(points, options);
        this.util.addTempLayer(3, voronoiPolygons, this.map, {
          polygonPaint: { "fill-opacity": 0.2, "fill-color": "#f00" }
        });

        // var result = clip(province, voronoiPolygons);
        // this.util.addTempLayer(3, result, this.map, {
        //   polygonPaint: {
        //     "fill-opacity": 0.5,
        //     "fill-color": "#ff0",
        //     "fill-outline-color": "#fff"
        //   }
        // });
        this.util.addTempLayer(1, points, this.map);
      });
    }
  }
};
</script>
<style scoped>
#map {
  height: 100%;
}
</style>
