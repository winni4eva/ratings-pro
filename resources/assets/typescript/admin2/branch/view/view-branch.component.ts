import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { BranchService } from '../branch.service';
//import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal'
import { ModalService } from '../../../shared/modal/modal.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-view-branch',
    template:
   `
        <my-content title="Branches">
            <div class="content table-responsive table-full-width">
                <pagination-controls (pageChange)="page = $event" id="1"
                      maxSize="5"
                      directionLinks="true"
                      autoHide="true"
                      class="pull-right"
                      style="pointer:cursor">
                </pagination-controls>
                <table class="table table-hover table-striped">
                    <thead>
                        <th>Name</th>
                        <th>Number Of Surveys</th>
                        <th>Add/Remove Survey</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        
                        <tr *ngFor="let branch of _branches | paginate: {itemsPerPage: 5, currentPage:page, id: '1'};let i = index">
                            
                            <td>{{branch?.name}}</td>
                            <td>{{branch?.surveys.length}}</td>
                            <td><a class="btn btn-default" style="pointer:cursor" (click)="addSurveys(branch?.id)">surveys</a></td>
                            <td>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <select class="form-control" [(ngModel)]="_action[i]" (click)="action($event,i,branch?.id)">
                                            <option [value]="">Select Action</option>
                                            <option [value]="'edit'">Edit</option>
                                            <option [value]="'delete'">Delete</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                <pagination-controls (pageChange)="page = $event" id="1"
                      maxSize="5"
                      directionLinks="true"
                      autoHide="true"
                      class="pull-right"
                      style="pointer:cursor">
                </pagination-controls>
            </div>
        </my-content>

        <!--
        <button (click)="modalService.open(MODAL_DEMO_ID)">
            Open Modal
        </button>

        <tb-modal modal-title="Catchy Title Here" blocking="true" modal-id="{{ MODAL_DEMO_ID }}">

            <div class="center">Are you sure about this ?</div>

            <div class="buttons">
                <button class="flat" (click)="doTheThing()">Yes</button>
                <button (click)="modalService.close(MODAL_DEMO_ID)">No</button>
            </div>
        </tb-modal>
        -->
    `
})
export class ViewBranchComponent implements OnInit, OnDestroy {

    private _branches;

    private _action: Array<any> = [];

    private MODAL_DEMO_ID: string;

    //private _branchList;
    
    //private _company;

    //@ViewChild('modal1') modal1: ModalComponent;

    //@ViewChild('modal2') modal2: ModalComponent;

    constructor(
        private _branchService: BranchService, 
        private modalService: ModalService,
        private router: Router){
            this.MODAL_DEMO_ID = 'mod1';
        }

    ngOnInit(){
        this._branchService.getBranches().subscribe(
            result => this._branches = result.branches,
            error => console.log(error)
        );
    }

    doTheThing(): void {
        // ...
    }

    action(event, index, branchId){
        //console.log(this._action[index]);
        //console.log(event);
        //this.selectedBookId = bookId;
        //if(this._action[index]=='delete') this.modal1.open('lg');
        //if(this._action[index]=='edit') this.modal2.open('lg');
        //if(this._action[index]=='surveys') this.router.navigate([ `/admin/branch-surveys/${branchId}` ]);
    }

    addSurveys(branchId){
        this.router.navigate([ `/admin/branch-surveys/${branchId}` ]);
    }

    ngOnDestroy(){
        //
    }
 }
