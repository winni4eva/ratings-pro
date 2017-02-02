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
    var ModalService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ModalService = (function () {
                function ModalService() {
                    this.modals = [];
                }
                ModalService.prototype.registerModal = function (newModal) {
                    var modal = this.findModal(newModal.modalId);
                    // Delete existing to replace the modal
                    if (modal) {
                        this.modals.splice(this.modals.indexOf(modal));
                    }
                    this.modals.push(newModal);
                };
                ModalService.prototype.open = function (modalId) {
                    var modal = this.findModal(modalId);
                    if (modal) {
                        console.log("Found modal");
                        modal.isOpen = true;
                    }
                    else {
                        console.log("Did not find modal");
                    }
                };
                ModalService.prototype.close = function (modalId, checkBlocking) {
                    if (checkBlocking === void 0) { checkBlocking = false; }
                    var modal = this.findModal(modalId);
                    if (modal) {
                        if (checkBlocking && modal.blocking) {
                            return;
                        }
                        modal.isOpen = false;
                    }
                };
                ModalService.prototype.findModal = function (modalId) {
                    for (var _i = 0, _a = this.modals; _i < _a.length; _i++) {
                        var modal = _a[_i];
                        if (modal.modalId === modalId) {
                            return modal;
                        }
                    }
                    return null;
                };
                ModalService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ModalService);
                return ModalService;
            }());
            exports_1("ModalService", ModalService);
        }
    }
});

//# sourceMappingURL=modal.service.js.map
