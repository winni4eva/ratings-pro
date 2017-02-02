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
    var MiscComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MiscComponent = (function () {
                function MiscComponent() {
                    this._tabTitle = "Miscellaneous";
                    this._tabHeader = "<p>Info</p>";
                    this._tabFooter = "<p class='pull-right'>Footer</p>";
                }
                MiscComponent = __decorate([
                    core_1.Component({
                        selector: 'my-misc',
                        template: "\n        <!-- Main row -->\n      <div class=\"row\">\n        <!-- Left col -->\n        <section class=\"col-lg-12 connectedSortable\">\n          <my-tabs [title]=\"_tabTitle\" [header]=\"_tabHeader\" [footer]=\"_tabFooter\">\n              <div class=\"col-md-6\">\n                    <!-- Custom Tabs (Pulled to the right) -->\n                    <div class=\"nav-tabs-custom\">\n                        <ul class=\"nav nav-tabs pull-right\">\n                            <li class=\"active\"><a href=\"#tab_1-1\" data-toggle=\"tab\">Tab 4</a></li>\n                            <li><a href=\"#tab_2-2\" data-toggle=\"tab\">Add Images</a></li>\n                            <li><a href=\"#tab_3-2\" data-toggle=\"tab\">Add Image Category</a></li>\n                            <li><a href=\"#tab_4-2\" data-toggle=\"tab\">Add Survey Category</a></li>\n                        </ul>\n                        <div class=\"tab-content\">\n                        <div class=\"tab-pane active\" id=\"tab_1-1\">\n                            <b>How to use:</b>\n                            <p>Exactly like the original bootstrap tabs except you should use\n                            the custom wrapper <code>.nav-tabs-custom</code> to achieve this style.</p>\n                            A wonderful serenity has taken possession of my entire soul,\n                            like these sweet mornings of spring which I enjoy with my whole heart.\n                            I am alone, and feel the charm of existence in this spot,\n                            which was created for the bliss of souls like mine. I am so happy,\n                            my dear friend, so absorbed in the exquisite sense of mere tranquil existence,\n                            that I neglect my talents. I should be incapable of drawing a single stroke\n                            at the present moment; and yet I feel that I never was a greater artist than now.\n                        </div>\n                        <div class=\"tab-pane\" id=\"tab_2-2\">\n                            The European languages are members of the same family. Their separate existence is a myth.\n                            For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ\n                            in their grammar, their pronunciation and their most common words. Everyone realizes why a\n                            new common language would be desirable: one could refuse to pay expensive translators. To\n                            achieve this, it would be necessary to have uniform grammar, pronunciation and more common\n                            words. If several languages coalesce, the grammar of the resulting language is more simple\n                            and regular than that of the individual languages.\n                        </div>\n                        <div class=\"tab-pane\" id=\"tab_3-2\">\n                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\n                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n                            It has survived not only five centuries, but also the leap into electronic typesetting,\n                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset\n                            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software\n                            like Aldus PageMaker including versions of Lorem Ipsum.\n                        </div>\n                        <div class=\"tab-pane\" id=\"tab_4-2\">\n                            <my-add-category></my-add-category>\n                        </div>\n                        </div>\n                        <!-- /.tab-content -->\n                    </div>\n                    <!-- nav-tabs-custom -->\n                    </div>\n          </my-tabs>\n        </section>\n        <!-- /.Left col -->\n\n        <!-- right col (We are only adding the ID to make the widgets sortable)-->\n        <!-- right col -->\n      </div>\n      <!-- /.row (main row) -->\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], MiscComponent);
                return MiscComponent;
            }());
            exports_1("MiscComponent", MiscComponent);
        }
    }
});

//# sourceMappingURL=misc.component.js.map
