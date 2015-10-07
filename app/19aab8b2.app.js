"use strict";angular.module("d3ChartsApp",["ngCookies","ngResource","ngSanitize","ngMaterial","ui.router","duScroll","ui.bootstrap","hljs"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/"),c.html5Mode(!0)}]).run(["Config",function(a){a.startApp()}]),angular.module("d3ChartsApp").controller("ProgressCtrl",["$scope",function(a){a.item={percent:"78",color:"#86C82D"},a.view=!0,a.setView=function(b){a.view=b}}]),angular.module("d3ChartsApp").config(["$stateProvider",function(a){a.state("angular/progress",{url:"/angular/progress",templateUrl:"app/d3angular/progress/progress.html",controller:"ProgressCtrl"})}]),angular.module("d3ChartsApp").controller("MainCtrl",["$scope","$location",function(a,b){a.goToLink=function(a){"progress"===a&&b.path("/angular/progress")}}]),angular.module("d3ChartsApp").config(["$stateProvider",function(a){a.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"})}]),angular.module("d3ChartsApp").directive("d3Progress",["Config",function(a){return{templateUrl:"components/directives/d3-progress/d3-progress.html",scope:{value:"@",color:"@"},restrict:"EA",link:function(b,c,d){function e(a,b){a.attrTween("d",function(a){var c=d3.interpolate(a.endAngle,b);return function(b){return a.endAngle=c(b),n.text(Math.round(a.endAngle/f*100)+"%"),l(a)}})}var f=2*Math.PI,g=150,h=150,i=Math.min(g,h)/2,j=i/5*4,k=Math.min(g,h)/4,l=d3.svg.arc().innerRadius(j).outerRadius(i).startAngle(0),m=d3.select(c[0]).append("svg").attr("width",Math.min(g,h)+70).attr("height",Math.min(g,h)+70).attr("viewBox","0 0 "+Math.min(g,h)+" "+Math.min(g,h)).attr("preserveAspectRatio","xMinYMin").append("g").attr("transform","translate("+Math.min(g,h)/2+","+Math.min(g,h)/2+")"),n=m.append("text").text("0%").attr("text-anchor","middle").style("font-size",k+"px").attr("dy",k/3).attr("dx",2),o=(m.append("path").datum({endAngle:f}).style("fill","#7cc35f").attr("id","d3-progress-background").attr("d",l),m.append("path").datum({endAngle:0*f}).style("fill",b.color).attr("d",l).attr("id","d3-progress-foreground").style("opacity",1));o.transition().duration(750).call(e,b.value/100*f);var p=angular.element(c[0]),q=p.width()/p.height(),r=p.parent();b.$on("resizeWindow",function(){p.attr("width",r.width()),p.attr("height",Math.round(r.width()/q))}),a.resizeWindow()}}}]),angular.module("d3ChartsApp").directive("myHeader",["$location",function(a){return{templateUrl:"components/directives/my-header/my-header.html",restrict:"EA",link:function(b,c,d){b.goToLink=function(b){a.path(b)}}}}]),angular.module("d3ChartsApp").directive("resize",["$window","Config",function(a,b){return{restrict:"EA",link:function(c){angular.element(a).on("resize",function(){b.resizeWindow()})}}}]),angular.module("d3ChartsApp").service("Config",["$rootScope","$log",function(a,b){var c={startApp:function(){b.info("Visualización de datos"),a.Config=c},resizeWindow:function(){a.$broadcast("resizeWindow")}};return c}]),angular.module("d3ChartsApp").run(["$templateCache",function(a){a.put("components/partials/progress/progress-controller.js.html","angular.module('d3ChartsApp')\n    .controller('ProgressCtrl', function ($scope) {\n        $scope.item = {percent: '78', color: '#86C82D'};\n    });"),a.put("components/partials/progress/progress.html","<!DOCTYPE html>\n<html>\n    <head lang=es>\n        <meta charset=UTF-8>\n        <title>Progress directive d3</title>\n    </head>\n    <body>\n        <d3-progress value={{item.percent}} color={{item.color}}></d3-progress>\n    </body>\n</html>"),a.put("components/partials/progress/progress.js.html","angular.module('d3ChartsApp')\n    .directive('d3Progress', function (Config) {\n        return {\n            templateUrl: 'components/directives/d3-progress/d3-progress.html',\n            scope:{\n                value:\"@\",\n                color:\"@\"\n            },\n            restrict: 'EA',\n            link: function (scope, element, attrs) {\n\n                var τ = 2 * Math.PI;\n                var width = 150;\n                var height = 150;\n                var outerRadius = Math.min(width,height)/2;\n                var innerRadius = (outerRadius/5)*4;\n                var fontSize = (Math.min(width,height)/4);\n\n                var arc = d3.svg.arc()\n                    .innerRadius(innerRadius)\n                    .outerRadius(outerRadius)\n                    .startAngle(0);\n\n                var svg = d3.select(element[0]).append(\"svg\")\n                    .attr(\"width\", Math.min(width,height) + 70)\n                    .attr(\"height\", Math.min(width,height) + 70)\n                    .attr('viewBox','0 0 '+ Math.min(width,height)   +' '+Math.min(width,height) )\n                    .attr('preserveAspectRatio','xMinYMin')\n                    .append(\"g\")\n"+'                    .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");\n\n                var text = svg.append("text")\n                    .text(\'0%\')\n                    .attr("text-anchor", "middle")\n                    .style("font-size",fontSize+\'px\')\n                    .attr("dy",fontSize/3)\n                    .attr("dx",2);\n\n                var background = svg.append("path")\n                    .datum({endAngle: τ})\n                    .style("fill", "#7cc35f")\n                    .attr("id","d3-progress-background")\n                    .attr("d", arc);\n\n                var foreground = svg.append("path")\n                    .datum({endAngle: 0 * τ})\n                    .style("fill", scope.color)\n                    .attr("d", arc)\n                    .attr("id","d3-progress-foreground")\n                    .style(\'opacity\', 1);\n\n                foreground.transition()\n                    .duration(750)\n                    .call(arcTween, (scope.value/100) * τ);\n\n                function arcTween(transition, newAngle) {\n\n                    transition.attrTween("d", function(d) {\n\n                        var interpolate = d3.interpolate(d.endAngle, newAngle);\n\n                        return function(t) {\n\n                            d.endAngle = interpolate(t);\n\n                            text.text(Math.round((d.endAngle/τ)*100)+\'%\');\n\n                            return arc(d);\n                        };\n                    });\n                }\n\n                //Mantiene el escalado de del gráfico\n                var chart = angular.element(element[0]),\n                    aspect = chart.width() / chart.height(),\n                    container = chart.parent();\n\n                scope.$on(\'resizeWindow\',function(){\n                    chart.attr(\'width\', container.width());\n                    chart.attr(\'height\', Math.round(container.width() / aspect));\n                });\n\n                Config.resizeWindow();\n            }\n        };\n    });')}]),angular.module("d3ChartsApp").run(["$templateCache",function(a){a.put("app/d3angular/progress/progress.html",'<div style=margin-top:15px class="col-lg-10 col-lg-offset-1"><md-toolbar style="background-color: rgba(255, 0, 0, 0.68); box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.26)"><div class=md-toolbar-tools><h2><span>Progress chart</span></h2><span flex=""></span><md-button ng-class="{\'core__toolbar-active\':view}" aria-label=View ng-click=setView(true) class=md-icon-button><i class="fa fa-eye"></i><md-tooltip>View</md-tooltip></md-button><md-button ng-class="{\'core__toolbar-active\':!view}" aria-label=Source ng-click=setView(false) class=md-icon-button><i class="fa fa-code"></i><md-tooltip>Code</md-tooltip></md-button></div></md-toolbar><md-content style="background-color: rgba(255, 255, 255, 0.8); box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26)"><div ng-show=view><div style="text-align: center; margin-top: 40px; margin-bottom: 40px" class=d3-progress-container><d3-progress value={{item.percent}} color={{item.color}}></d3-progress></div></div><div ng-show=!view><md-tabs md-dynamic-height="" md-border-bottom=""><md-tab label=HTML><md-content class=md-padding><div hljs="" include="\'components/partials/progress/progress.html\'"></div></md-content></md-tab><md-tab label=Directiva><md-content class=md-padding><div hljs="" include="\'components/partials/progress/progress.js.html\'"></div></md-content></md-tab><md-tab label=Controlador><md-content class=md-padding><div hljs="" include="\'components/partials/progress/progress-controller.js.html\'"></div></md-content></md-tab><md-tab label=Importante><md-content class=md-padding><p>A tener en cuenta a la hora de implementar:</p><ul><li>Se utiliza una directiva que detecta el resize para que el gráfico sea responsive.</li><li>Esta directiva se comnunica con un servicio Config que lanza el evento de resize.</li></ul><p>Parámetros de la directiva (obligatorios)</p><ul><li>color: Admite el color de fondo para el gráfico (hexadecimal)</li><li>percent: Porcentaje que se quiera mostrar</li></ul></md-content></md-tab></md-tabs></div></md-content></div>'),a.put("app/main/main.html",'<section style="text-align:center;min-height: 420px" class=content-header><div style="margin-top: 164px; background-color: rgba(230, 217, 247, 0.59)"><h1>Visualización de datos con D3</h1><md-button href=#section-examples du-smooth-scroll=du-smooth-scroll du-scrollspy=du-scrollspy style="background-color: transparent; border: 1px solid black" class=md-raised>Ver ejemplos</md-button><br><br></div></section><section id=section-examples style="min-height: 400px" class=content><div class="col-lg-4 md-whiteframe-4dp"><div style="text-align: center" class=sunburst-layout><div style="background-color: rgb(0, 0, 0)"><h2 style="padding-top: 10px;color: white">Sunburst example (responsive)</h2><md-button style="background-color: transparent; border: 1px solid white;color:white" class=md-raised>Demo</md-button></div></div></div><div class="col-lg-4 md-whiteframe-4dp"><div style="text-align: center" class=chord-layout><div style="background-color: rgb(0, 0, 0)"><h2 style="padding-top: 10px;color: white">Chord layout example (timeline)</h2><md-button style="background-color: transparent; border: 1px solid white;color:white" class=md-raised>Demo</md-button></div></div></div><div class="col-lg-4 md-whiteframe-4dp"><div style="text-align: center" class=progress-layout><div style="background-color: rgb(0, 0, 0)"><h2 style="padding-top: 10px;color: white">Progress example (responsive)</h2><md-button ng-click="goToLink(\'progress\')" style="background-color: transparent; border: 1px solid white;color:white" class=md-raised>Demo</md-button></div></div></div></section>'),a.put("components/directives/d3-progress/d3-progress.html",""),a.put("components/directives/my-header/my-header.html",'<md-toolbar><div class=md-toolbar-tools><md-button aria-label=Settings ng-click="goToLink(\'/\')" style="margin-top: 9px" class=md-icon-button><i class="fa fa-home fa-2x"></i></md-button><h2><span>D3Charts</span></h2><span flex=""></span></div></md-toolbar><div layout=column layout-align="start end" style=position:fixed class=lock-size><md-fab-speed-dial md-open=demo.isOpen md-direction=down ng-class="\'md-fling\'"><md-fab-trigger><md-button aria-label=menu class="md-fab md-warn"><i class="fa fa-bars"></i></md-button></md-fab-trigger><md-fab-actions><md-button aria-label=Github class="md-fab md-raised md-mini"><i class="fa fa-github"></i></md-button><md-button aria-label=Twitter class="md-fab md-raised md-mini"><i class="fa fa-twitter"></i></md-button><md-button aria-label="Google Hangout" class="md-fab md-raised md-mini"><i class="fa fa-google-plus"></i></md-button></md-fab-actions></md-fab-speed-dial></div>')}]);