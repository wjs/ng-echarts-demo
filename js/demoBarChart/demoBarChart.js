angular.module('DemoBarChart', [])
  .directive('demoBarChart', ['DemoBarChartOption', '$timeout', '$window',
    function(DemoBarChartOption, $timeout, $window) {
      return {
        scope: {},
        restrict: 'A',
        replace: true,
        template: '<div style="width:100%; height:100%;"></div>',
        link: function(scope, element, attrs) {

          var option = DemoBarChartOption.getDemoBarChartOption();
          var chart = echarts.init(element[0]);
          chart.setOption(option);
          loadChartData();

          // get data from server, use $timeout for demo
          function loadChartData() {
            chart.showLoading();
            $timeout(function() {
              var testData = {
                evaporation: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                precipitation: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                temperature: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
              };
              chart.hideLoading();
              updateChart(testData);
            }, 3000);
          }

          function updateChart(data) {
            if (angular.isDefined(option)) {
              option.series[0].data = data.evaporation;
              option.series[1].data = data.precipitation;
              option.series[2].data = data.temperature;
              chart.setOption(option, true);
            }
          }

          // resize chart on window size change
          angular.element($window).bind('resize', function() {
            $timeout(function() {
              if (chart) {
                chart.resize();
              }
            }, 300);
          });

        }
      };
    }
  ])
  .factory('DemoBarChartOption', [function() {
    return {
      getDemoBarChartOption: function() {
        var option = {
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            feature: {
              mark: {
                show: true
              },
              dataView: {
                show: true,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['line', 'bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          legend: {
            data: ['蒸发量', '降水量', '平均温度']
          },
          xAxis: [{
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }],
          yAxis: [{
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          }, {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }],
          series: [{
            name: '蒸发量',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }, {
            name: '降水量',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }, {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }]
        };
        return option;
      }
    };
  }]);
