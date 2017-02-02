System.register(['@angular/core', './modal.service'], function(exports_1, context_1) {
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
    var core_1, modal_service_1;
    var Modal;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            }],
        execute: function() {
            Modal = (function () {
                function Modal(modalService) {
                    this.modalService = modalService;
                    this.blocking = false;
                    this.isOpen = false;
                }
                Modal.prototype.ngOnInit = function () {
                    this.modalService.registerModal(this);
                };
                Modal.prototype.close = function (checkBlocking) {
                    if (checkBlocking === void 0) { checkBlocking = false; }
                    this.modalService.close(this.modalId, checkBlocking);
                };
                Modal.prototype.keyup = function (event) {
                    if (event.keyCode === 27) {
                        this.modalService.close(this.modalId, true);
                    }
                };
                __decorate([
                    core_1.Input('modal-id'), 
                    __metadata('design:type', String)
                ], Modal.prototype, "modalId", void 0);
                __decorate([
                    core_1.Input('modal-title'), 
                    __metadata('design:type', String)
                ], Modal.prototype, "modalTitle", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Modal.prototype, "blocking", void 0);
                Modal = __decorate([
                    core_1.Component({
                        selector: 'tb-modal',
                        template: "\n        <style>\n            .modal-overlay {\n            background-color: rgba(0, 0, 0, .4);\n            bottom: 0;\n            left: 0;\n            position: fixed;\n            right: 0;\n            top: 0;\n            z-index: 1000;\n        }\n\n        .modal {\n            @include shadow-float();\n\n            background-color: $white;\n            left: calc(50% - 200px);\n            max-height: calc(100% - 10em);\n            min-height: 10em;\n            overflow-y: auto;\n            position: fixed;\n            top: 5em;\n            width: 400px;\n            z-index: 1100;\n\n            .title {\n                background-color: $color-heading-bg;\n\n                .right {\n                    color: $color-text;\n                    cursor: pointer;\n                }\n\n                .right:hover {\n                    color: lighten($color-text, 10%);\n                }\n            }\n\n            .title,\n            .body {\n                padding: .75em;\n            }\n\n            input,\n            select {\n                height: auto;\n                margin-bottom: 7px;\n            }\n\n            .buttons {\n                float: right;\n                margin: 1em;\n                margin-right: 0;\n\n                .flat {\n                    background-color: $white;\n                    color: $color-text;\n                    line-height: 1.1em;\n                }\n            }\n        }\n        \n        </style>\n        \n        <div *ngIf=\"isOpen\">\n            <div class=\"modal-overlay\" (click)=\"close(true)\"></div>\n\n            <div class=\"modal\">\n                <div class=\"title\" *ngIf=\"modalTitle\">\n                    <h2>\n                        {{ modalTitle }}\n                        <span class=\"right\" (click)=\"close()\">\n                            <i class=\"icon icon-cancel\"></i>\n                        </span>\n                    </h2>\n                </div>\n\n                <div class=\"body\">\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </div>\n    ",
                        host: { '(document:keyup)': 'keyup($event)' }
                    }), 
                    __metadata('design:paramtypes', [modal_service_1.ModalService])
                ], Modal);
                return Modal;
            }());
            exports_1("Modal", Modal);
        }
    }
});

//# sourceMappingURL=modal.component.js.map
