System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var AddBranchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AddBranchComponent = (function () {
                function AddBranchComponent() {
                    this._tabTitle = "Add Branch";
                    this._tabHeader = "<p>Info</p>";
                    this._tabFooter = "<p class='pull-right'>Footer</p>";
                }
                AddBranchComponent = __decorate([
                    core_1.Component({
                        selector: 'my-add-branch',
                        template: "\n         <!-- Main row -->\n      <div class=\"row\">\n        <!-- Left col -->\n        <section class=\"col-lg-12 connectedSortable\">\n          <my-tabs [title]=\"_tabTitle\" [header]=\"_tabHeader\" [footer]=\"_tabFooter\">\n              <form role=\"form\">\n                <div class=\"box-body\">\n\n                    <div class=\"form-group\">\n                        <label for=\"name\">Branch Name</label>\n                        <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" placeholder=\"Enter Branch Name\">\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"exampleInputEmail1\">Branch Admin First Name</label>\n                        <input type=\"text\" class=\"form-control\" id=\"first_name\" name=\"first_name\" placeholder=\"Enter Branch Admin First Name\">\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"last_name\">Branch Admin Last Name</label>\n                        <input type=\"text\" class=\"form-control\" id=\"last_name\" name=\"last_name\" placeholder=\"Enter Branch Admin Last Name\">\n                    </div>\n\n                    <div class=\"form-group\">\n                        <label for=\"email\">Branch Admin Email</label>\n                        <input type=\"text\" class=\"form-control\" id=\"email\" name=\"email\" placeholder=\"Enter Branch Admin Email\">\n                    </div>\n\n                    <div class=\"checkbox\">\n                        <label>\n                            <input type=\"checkbox\"> Admin\n                        </label>\n                    </div>\n\n                </div>\n    \n                <div class=\"box-footer\">\n                    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n                </div>\n            </form>\n          </my-tabs>\n        </section>\n      </div>\n      <!-- /.row (main row) -->\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AddBranchComponent);
                return AddBranchComponent;
            }());
            exports_1("AddBranchComponent", AddBranchComponent);
        }
    }
});

//# sourceMappingURL=add-branch.component.js.map
