// Map.js
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ReactTooltip from "react-tooltip";

const Map = ({
  titleOfMap,
  tooltipContent,
  data,
  colorScale,
  onMouseEnter,
  onMouseLeave,
  onSelectState,
  topologyJson,
  geographyStyle,
  projectionConfig,
  selectedState,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ margin: "0 auto" }}>{titleOfMap}</h1>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={projectionConfig}
        projection="geoMercator"
        width={400}
        height={300}
        data-tip=""
      >
        <Geographies geography={topologyJson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              console.log("geo: ", geo);
              const current = data.find((s) => s.id === geo.id);
              const isSelected = selectedState?.state === geo?.properties.name;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={
                    isSelected ? "green" : current && colorScale(current.value)
                  }
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                  onClick={() => onSelectState(geo, current)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Map;
