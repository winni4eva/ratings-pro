import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
    selector: 'my-tabs',
    template: `
        <style>
        .tab-height{
          min-height: 500px !important;
        }
        </style>
         <!-- Tab Box -->
          <div class="box box-primary tab-height">

            <div class="box-header">
              <i class="ion ion-clipboard"></i>

              <h3 class="box-title">{{title}}</h3>

              <!-- Pagiantion -->
              <div class="box-tools pull-right" [innerHTML]="header">
              </div>
              <!-- Pagiantion -->
            </div>
            <!-- /.box-header -->

            <div class="box-body">
                <ng-content></ng-content>
            </div>
            <!-- /.box-body -->
            <div class="box-footer clearfix" [innerHTML]="footer">
              
            </div>
          </div>
          <!-- /Tab Box -->
    `
})

export class TabsComponent {
    
    @Input()  title;

    @Input()  header;

    @Input()  footer;

    constructor(){}

 }
