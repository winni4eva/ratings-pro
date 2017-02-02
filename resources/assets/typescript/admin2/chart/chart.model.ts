export class Chart {
  id: String;
  data: Object;
  height: any;
  width: any;
  //title: any;
  //plotarea: any;
  //legend: any;

  constructor (config: any) {
    this.id = config.id;
    this.data = config.data;
    this.height = config.height || 400;
    this.width = config.width || '100%';
    //this.title = config.title;
    //this.plotarea = config.plotarea;
    //this.legend = config.legend;
  }
}
