import { Component } from '@angular/core';

@Component({
    selector: 'my-footer',
    template:
   `
     <div class="pull-right hidden-xs">
        <b>Version</b> 1.0.0
    </div>
    <strong>Copyright &copy;2016 DVAK.</strong> All rights
    reserved.
    `
})

export class FooterComponent { }
