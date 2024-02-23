import ChartPie from "@/components/common/charts/ChartPie";
const flexStyle = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "16px"
};
const baseStyle = {
  width: "calc(33% - 16px)",
  height: 200,
  background: "#e9e9e9",
  boxSizing: "border-box"
};
function BaseChart(params) {
  return (
    <div style={{ ...flexStyle }}>
      {Array.from(
        {
          length: 12
        },
        (_, i) => (
          <div key={i} style={{ ...baseStyle }}>
            <ChartPie chartId={"chart-pie" + i}></ChartPie>
          </div>
        )
      )}
    </div>
  );
}

export default BaseChart;
