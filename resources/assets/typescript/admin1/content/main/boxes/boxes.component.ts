import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-boxes',
    template: `
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box {{boxColor}}">
            <div class="inner">
              <h3>{{boxStat}}</h3>

              <p>{{boxTitle}}</p>
            </div>
            <div class="icon">
              <i class="ion ion-bag"></i>
            </div>
            <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
    `
})

export class BoxesComponent {
    
    @Input() boxColor;
    
    @Input()  boxTitle;

    @Input()  boxStat;

    constructor(){}
 }
