// IndiaMap.js
import React, { useState } from "react";
import { scaleQuantile } from "d3-scale";
import Map from "../../Maps";
import Dropdown from "../Dropdown";
import {
  COLOR_RANGE,
  INDIA_TOPO_JSON,
  PROJECTION_CONFIG,
  geographyStyle,
} from "./constants";

// Will generate random heatmap data on every call
// Make sure that the heatmap id should always match with the geo.id (INDIA_TOPO_JSON)
const getHeatMapData = () => {
  return [
    { id: "AP", state: "Andhra Pradesh", value: 10 },
    { id: "AR", state: "Arunanchal Pradesh", value: 20 },
    { id: "AS", state: "Assam", value: 30 },
    { id: "BR", state: "Bihar", value: 40 },
    { id: "CT", state: "Chhattisgarh", value: 50 },
    { id: "GA", state: "Goa", value: 60 },
    { id: "GJ", state: "Gujarat", value: 70 },
    { id: "HR", state: "Haryana", value: 80 },
    { id: "HP", state: "Himachal Pradesh", value: 90 },
    { id: "JH", state: "Jharkhand", value: 100 },
    { id: "KA", state: "Karnataka", value: 110 },
    { id: "KL", state: "Kerala", value: 120 },
    { id: "MP", state: "Madhya Pradesh", value: 130 },
    { id: "MH", state: "Maharashtra", value: 140 },
    { id: "MN", state: "Manipur", value: 150 },
    { id: "ML", state: "Meghalaya", value: 160 },
    { id: "MZ", state: "Mizoram", value: 170 },
    { id: "NL", state: "Nagaland", value: 180 },
    { id: "OD", state: "Odisha", value: 190 },
    { id: "PB", state: "Punjab", value: 200 },
    { id: "RJ", state: "Rajasthan", value: 210 },
    { id: "SK", state: "Sikkim", value: 220 },
    { id: "TN", state: "Tamil Nadu", value: 230 },
    { id: "TS", state: "Telangana", value: 240 },
    { id: "TR", state: "Tripura", value: 250 },
    { id: "UK", state: "Uttarakhand", value: 260 },
    { id: "UP", state: "Uttar Pradesh", value: 270 },
    { id: "WB", state: "West Bengal", value: 280 },
    { id: "AN", state: "Andaman & Nicobar Islands", value: 290 },
    { id: "CH", state: "Chandigarh", value: 300 },
    { id: "DN", state: "Dadra & Nagar Haveli", value: 310 },
    { id: "DD", state: "Daman & Diu", value: 320 },
    { id: "DL", state: "Delhi", value: 330 },
    { id: "JK", state: "Jammu & Kashmir", value: 340 },
    { id: "LA", state: "Ladakh", value: 350 },
    { id: "LD", state: "Lakshadweep", value: 360 },
    { id: "PY", state: "Puducherry", value: 370 },
  ];
};

const IndiaMap = () => {
  const [indiaMapData, setIndiaMapData] = useState(getHeatMapData());
  const [tooltipContent, setTooltipContent] = useState("");
  console.log("tooltipContent: ", tooltipContent);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = indiaMapData.map(({ id, state }) => ({
    value: id,
    label: state,
  }));

  const colorScale = scaleQuantile()
    .domain(indiaMapData.map((d) => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (_geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(`${current.state}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  const onSelectState = (geo, state) => {
    setSelectedState(state);
    const selected = options.find((option) => option.value === state.id);
    setSelectedOption(selected);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const state = indiaMapData.find((d) => d.id === value);
    const selected = options.find((option) => option.value === state.id);
    setSelectedOption(selected);
    setSelectedState(state);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <h1>
          Select options in below filters or click on an area on map, to
          populate the charts and figures:
        </h1>
        <Dropdown
          options={options}
          selectedOption={selectedOption}
          handleChange={handleChange}
        />
      </div>
      <div style={{ flex: 2, height: "500px" }}>
        <Map
          titleOfMap={"India"}
          tooltipContent={tooltipContent}
          topologyJson={INDIA_TOPO_JSON}
          data={indiaMapData}
          colorScale={colorScale}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onSelectState={onSelectState}
          geographyStyle={geographyStyle}
          projectionConfig={PROJECTION_CONFIG}
          selectedState={selectedState}
        />
      </div>
    </div>
  );
};

export default IndiaMap;
