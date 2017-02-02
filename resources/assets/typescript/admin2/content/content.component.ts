import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
    selector: 'my-content',
    template:
   `
   <div class="content">
    <div class="container-fluid">
         <div class="row">
            <div class="{{column}}">
                <div class="card">
                    <div class="header">
                        <h4 class="title">{{title}}</h4>
                        <!--<p class="category">24 Hours performance</p>-->
                    </div>
                    <div class="content">

                        <ng-content></ng-content>

                        <div class="footer">
                            <hr>
                            <div class="stats">
                                <i class="fa fa-history"></i> Updated 3 minutes ago
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `
})

export class ContentComponent {

    @Input() title = 'None';

    @Input() column = 'col-md-12';
 }
