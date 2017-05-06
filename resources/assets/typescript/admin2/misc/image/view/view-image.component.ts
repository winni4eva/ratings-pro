import { Component, OnInit, OnDestroy  } from '@angular/core';
import { MiscService } from '../../misc.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'my-view-image',
    template:
   `
        <simple-notifications [options]="_options"></simple-notifications>
        <my-content title="Images">
            <div class="content">
                <div class="col-md-3 pull-left" *ngFor="let image of _images">
                    <div class="pull-right">
                        <span 
                            (click)="confirmDelete(image.id)"><i style="font-size:30px;cursor:pointer !important" class="pe-7s-close"></i>
                        </span>
                    </div>
                    <img [src]="image.src" class="img-thumbnail" style="width:250px;height:250px"/>
                </div>
            </div>
        </my-content>
    `
})


export class ViewImageComponent implements OnInit, OnDestroy {

    private _images;

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    };

    constructor(
            private _miscService: MiscService,
            private _notification: NotificationsService){}

    ngOnInit(){
        this.getImages();
    }

    confirmDelete(imageId){
        let confirmed = confirm("Are you sure you want to remove the selected image");
        if (confirmed) 
            this.removeImage( imageId );
    }

    removeImage(imageId){
        this._miscService.removeImage(imageId).subscribe(
            res=>{
                console.log(res);
                this.getImages();
                this._notification.success('Success', "Image removed successfully...")
            },
            err=>{
                console.log(err);
                this._notification.error('Error', 'Error removing image')
            }
        );
    }

    getImages(){
        this._miscService.getImages().subscribe(
            result => {
                this._images = result.images;
            },
            error => console.log(error)
        );
    }
    ngOnDestroy(){
        //
    }
 }
