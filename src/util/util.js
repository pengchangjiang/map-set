const uuid = require("uuid/v1");
export default {
  fitBounds(map, bbox) {
    map.fitBounds(bbox, {
      padding: {
        top: 50,
        bottom: 50,
        left: 150,
        right: 200
      }
    });
  },
  removeLayers(map, layerIds) {
    layerIds.forEach(id => {
      if (map.getLayer(id)) {
        map.removeLayer(id);
      }
    });
  },
  _bbox2Pixel(bbox, map) {
    let sw = {
      lng: bbox[0],
      lat: bbox[1]
    };
    let ne = {
      lng: bbox[2],
      lat: bbox[3]
    };
    let swPixel = map.project(sw);
    let nePixel = map.project(ne);
    return [
      [swPixel.x, swPixel.y],
      [nePixel.x, nePixel.y]
    ];
  },
  /* 1,2,3:点线面*/
  addTempLayer(type, geojson, map,
    { pointPaint = { "circle-radius": 3, "circle-color": "#B42222" },
      linePaint =
      {
        "line-color": "#888",
        "line-width": 3
      },
      polygonPaint =
      {
        "fill-color": "#888",
        "fill-opacity": 1,
        "fill-outline-color": "#B7B0B0"
      }
    } = {}) {
    let layer = null;
    switch (type) {
      case 1:
        layer = {
          id: uuid(),
          type: "circle",
          source: {
            "type": "geojson",
            "data": geojson
          },
          paint: pointPaint
        };
        break;
      case 2:
        layer = {
          id: uuid(),
          type: "line",
          source: {
            "type": "geojson",
            "data": geojson
          },
          paint: linePaint
        };
        break;
      case 3:
        layer = {
          id: uuid(),
          type: "fill",
          source: {
            "type": "geojson",
            "data": geojson
          },
          paint: polygonPaint
        };
        break;
    }
    map.addLayer(layer);
  }
};
