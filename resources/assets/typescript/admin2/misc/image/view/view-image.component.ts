import { Component, OnInit, OnDestroy  } from '@angular/core';
import { MiscService } from '../../misc.service';

@Component({
    selector: 'my-view-image',
    template:
   `
        <my-content title="Images">
            <div class="content">
                <div class="col-md-3" *ngFor="let image of _images">
                    <img [src]="image.src" class="img-thumbnail" style="width:250px;height:250px"/>
                </div>
            </div>
        </my-content>
    `
})

export class ViewImageComponent implements OnInit, OnDestroy {

    private _images;

    constructor(private _miscService: MiscService){}

    ngOnInit(){
        this._miscService.getImages().subscribe(
            result => {
                this._images = result.images;
                console.log(result.images);
            },
            error => console.log(error)
        );
    }

    ngOnDestroy(){
        //
    }
 }
