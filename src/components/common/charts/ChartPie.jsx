import * as echarts from "echarts";
import { useEffect } from "react";
import PropTypes from "prop-types";

function ChartPie(props) {
  const renderChart = () => {
    var chartDom = document.getElementById(props.chartId);
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: "item"
      },
      legend: {
        top: "5%",
        left: "center"
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" }
          ]
        }
      ]
    };

    option && myChart.setOption(option);
  };
  useEffect(() => {
    renderChart && renderChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div id={props.chartId} style={{ height: "100%", width: "100%" }}></div>;
}

ChartPie.propTypes = {
  chartId: PropTypes.string.isRequired
};
ChartPie.defaultProps = {
  chartId: "chart-pie"
};
export default ChartPie;
