System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Chart;
    return {
        setters:[],
        execute: function() {
            Chart = (function () {
                //title: any;
                //plotarea: any;
                //legend: any;
                function Chart(config) {
                    this.id = config.id;
                    this.data = config.data;
                    this.height = config.height || 400;
                    this.width = config.width || '100%';
                    //this.title = config.title;
                    //this.plotarea = config.plotarea;
                    //this.legend = config.legend;
                }
                return Chart;
            }());
            exports_1("Chart", Chart);
        }
    }
});

//# sourceMappingURL=chart.model.js.map
