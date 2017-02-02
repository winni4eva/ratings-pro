System.register(['@angular/core', '../branch.service', '../../../shared/modal/modal.service', '@angular/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, branch_service_1, modal_service_1, router_1;
    var ViewBranchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (branch_service_1_1) {
                branch_service_1 = branch_service_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ViewBranchComponent = (function () {
                //private _branchList;
                //private _company;
                //@ViewChild('modal1') modal1: ModalComponent;
                //@ViewChild('modal2') modal2: ModalComponent;
                function ViewBranchComponent(_branchService, modalService, router) {
                    this._branchService = _branchService;
                    this.modalService = modalService;
                    this.router = router;
                    this._action = [];
                    this.MODAL_DEMO_ID = 'mod1';
                }
                ViewBranchComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._branchService.getBranches().subscribe(function (result) { return _this._branches = result.branches; }, function (error) { return console.log(error); });
                };
                ViewBranchComponent.prototype.doTheThing = function () {
                    // ...
                };
                ViewBranchComponent.prototype.action = function (event, index, branchId) {
                    //console.log(this._action[index]);
                    //console.log(event);
                    //this.selectedBookId = bookId;
                    //if(this._action[index]=='delete') this.modal1.open('lg');
                    //if(this._action[index]=='edit') this.modal2.open('lg');
                    if (this._action[index] == 'surveys')
                        this.router.navigate([("/admin/branch-surveys/" + branchId)]);
                };
                ViewBranchComponent.prototype.ngOnDestroy = function () {
                    //
                };
                ViewBranchComponent = __decorate([
                    core_1.Component({
                        selector: 'my-view-branch',
                        template: "\n        <my-content title=\"Branches\">\n            <div class=\"content table-responsive table-full-width\">\n                <table class=\"table table-hover table-striped\">\n                    <thead>\n                        <!--<th>Company</th>-->\n                        <th>Name</th>\n                        <th>Number Of Surveys</th>\n                        <th>Action</th>\n                        <!--<th>Admin First Name</th>-->\n                        <!--<th>Admin Last Name</th>-->\n                        <!--<th>Admin Email</th>-->\n                    </thead>\n                    <tbody>\n                        \n                        <tr *ngFor=\"let branch of _branches;let i = index\">\n                            <!--<td>{{_company}}</td>-->\n                            <td>{{branch?.name}}</td>\n                            <th>{{branch?.surveys.length}}</th>\n                            <td>\n                                <div class=\"col-md-3\">\n                                    <div class=\"form-group\">\n                                        <select class=\"form-control\" [(ngModel)]=\"_action[i]\" (click)=\"action($event,i,branch?.id)\">\n                                            <option [value]=\"\">Select Action</option>\n                                            <option [value]=\"'surveys'\">Surveys</option>\n                                            <option [value]=\"'edit'\">Edit</option>\n                                            <option [value]=\"'delete'\">Delete</option>\n                                        </select>\n                                    </div>\n                                </div>\n                            </td>\n                            <!--<td>{{branch.first_name}}</td>-->\n                            <!--<td>{{branch.last_name}}</td>-->\n                            <!--<td>{{branch.email}}</td>-->\n                        </tr>\n                        \n                    </tbody>\n                </table>\n            </div>\n        </my-content>\n\n        <!--\n        <button (click)=\"modalService.open(MODAL_DEMO_ID)\">\n            Open Modal\n        </button>\n\n        <tb-modal modal-title=\"Catchy Title Here\" blocking=\"true\" modal-id=\"{{ MODAL_DEMO_ID }}\">\n\n            <div class=\"center\">Are you sure about this ?</div>\n\n            <div class=\"buttons\">\n                <button class=\"flat\" (click)=\"doTheThing()\">Yes</button>\n                <button (click)=\"modalService.close(MODAL_DEMO_ID)\">No</button>\n            </div>\n        </tb-modal>\n        -->\n    "
                    }), 
                    __metadata('design:paramtypes', [branch_service_1.BranchService, modal_service_1.ModalService, router_1.Router])
                ], ViewBranchComponent);
                return ViewBranchComponent;
            }());
            exports_1("ViewBranchComponent", ViewBranchComponent);
        }
    }
});

//# sourceMappingURL=view-branch.component.js.map
