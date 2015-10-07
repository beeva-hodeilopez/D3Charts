'use strict';

angular.module('d3ChartsApp')
  .directive('d3Progress', function (Config) {
    return {
      templateUrl: 'components/directives/d3-progress/d3-progress.html',
      scope:{
        value:"@",
        color:"@"
      },
      restrict: 'EA',
      link: function (scope, element, attrs) {

        var τ = 2 * Math.PI;
        var width = 150;
        var height = 150;
        var outerRadius = Math.min(width,height)/2;
        var innerRadius = (outerRadius/5)*4;
        var fontSize = (Math.min(width,height)/4);

        var arc = d3.svg.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(0);

        var svg = d3.select(element[0]).append("svg")
          .attr("width", Math.min(width,height) + 70)
          .attr("height", Math.min(width,height) + 70)
          .attr('viewBox','0 0 '+ Math.min(width,height)   +' '+Math.min(width,height) )
          .attr('preserveAspectRatio','xMinYMin')
          .append("g")
          .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

        var text = svg.append("text")
          .text('0%')
          .attr("text-anchor", "middle")
          .style("font-size",fontSize+'px')
          .attr("dy",fontSize/3)
          .attr("dx",2);

        var background = svg.append("path")
          .datum({endAngle: τ})
          .style("fill", "#7cc35f")
          .attr("id","d3-progress-background")
          .attr("d", arc);

        var foreground = svg.append("path")
          .datum({endAngle: 0 * τ})
          .style("fill", scope.color)
          .attr("d", arc)
          .attr("id","d3-progress-foreground")
          .style('opacity', 1);

        foreground.transition()
          .duration(750)
          .call(arcTween, (scope.value/100) * τ);

        function arcTween(transition, newAngle) {

          transition.attrTween("d", function(d) {

            var interpolate = d3.interpolate(d.endAngle, newAngle);

            return function(t) {

              d.endAngle = interpolate(t);

              text.text(Math.round((d.endAngle/τ)*100)+'%');

              return arc(d);
            };
          });
        }

        //Mantiene el escalado de del gráfico
        var chart = angular.element(element[0]),
          aspect = chart.width() / chart.height(),
          container = chart.parent();

        scope.$on('resizeWindow',function(){
          chart.attr('width', container.width());
          chart.attr('height', Math.round(container.width() / aspect));
        });

        Config.resizeWindow();
      }
    };
  });
