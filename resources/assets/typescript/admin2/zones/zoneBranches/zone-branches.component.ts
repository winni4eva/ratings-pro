import { Component, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
///import { StorageService } from '../../shared/storage/storage.service';
import { ZoneService } from '../zones.service';
import { BranchService } from '../../branch/branch.service';
import { ActivatedRoute } from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'my-zone-branches',
    template:
   `
        <simple-notifications [options]="_options"></simple-notifications>

        <my-content title="Zone Branches">

            <div class="places-buttons">

                <div class="img-thumbnail" style="width:200%">
                    
                    <div class="row" style="width:100%">
                        <h5 *ngIf="_zone?.name" class="text-center">{{_zone?.name}} Zone Branches</h5>
                    </div>
                    
                    <p *ngIf="_zone?.zone_branches?.length == 0" class="text-center">This zone  has no branches</p>

                    <div *ngFor="let branch of _zone?.zone_branches">
                        <div class="col-md-2" style="margin-right:1px !important">
                            
                            <div class="pull-right">
                                <span (click)="removeBranch(branch?.branch?.id)">
                                    <i style="font-size:30px;cursor:pointer !important" class="pe-7s-close"></i>
                                </span>
                            </div>

                            <a class="btn btn-default btn-block" style="border:2px solid black !important">{{branch?.branch?.name}}</a>
                        
                        </div>
                    </div>
                
                </div>

                <div class="img-thumbnail" style="width:200%">
                    
                    <div class="row">
                        <h5 class="text-center">Branches</h5>
                    </div>
                    
                    <div *ngFor="let branch of _branches">
                        <div class="col-md-2" style="margin-right:1px !important">
                            <a class="btn btn-default btn-block" 
                            (click)="addZoneBranch(branch?.id)"
                            style="border:2px solid black !important">
                            {{branch?.name}}
                            </a>
                        </div>
                    </div>
                
                </div>

            </div>

        </my-content>
    `
})

export class ZoneBranchesComponent implements OnInit, OnDestroy {

    private _selectedZoneId;

    private _zone;

    private _branches;

    private _zones;

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    };

    constructor(
        private _branchService: BranchService,
        private _zoneService: ZoneService,
        private activeRoute: ActivatedRoute,
        private _notification: NotificationsService){}

    ngOnInit() {

        this.activeRoute.params.subscribe(params => this._selectedZoneId = params['zoneId'] );

        this.getZones();

        this._branchService.getBranches().subscribe(
                result => this._branches = result.branches,
                error => console.log(error)
        );
    
    }

    addZoneBranch(branchId){
        this._zoneService.addZoneBranch(branchId, this._selectedZoneId).subscribe(
                result => {
                    this._notification.success('Success', result.success)
                    this.getZones();
                },
                error => console.log(error)
        );
    }

    getZones(){
        this._zoneService.getZones().subscribe(
                result => {
                    this._zones = result.zones;
                    for(let zone of this._zones){
                        if(zone.id == this._selectedZoneId) this._zone = zone;
                    }
                },
                error => console.log(error)
        );
    }

    removeBranch(branchId){
        this._zoneService.removeZoneBranch(branchId, this._selectedZoneId).subscribe(
                result => {
                    this._notification.success('Success', result.success);
                    this.getZones();
                },
                error => console.log(error)
        );
    }

    ngOnDestroy(){
      
    }
 }
