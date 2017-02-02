import { Component } from '@angular/core';

@Component({
    selector: 'my-misc',
    template: `
        <!-- Main row -->
      <div class="row">
        <!-- Left col -->
        <section class="col-lg-12 connectedSortable">
          <my-tabs [title]="_tabTitle" [header]="_tabHeader" [footer]="_tabFooter">
              <div class="col-md-6">
                    <!-- Custom Tabs (Pulled to the right) -->
                    <div class="nav-tabs-custom">
                        <ul class="nav nav-tabs pull-right">
                            <li class="active"><a href="#tab_1-1" data-toggle="tab">Tab 4</a></li>
                            <li><a href="#tab_2-2" data-toggle="tab">Add Images</a></li>
                            <li><a href="#tab_3-2" data-toggle="tab">Add Image Category</a></li>
                            <li><a href="#tab_4-2" data-toggle="tab">Add Survey Category</a></li>
                        </ul>
                        <div class="tab-content">
                        <div class="tab-pane active" id="tab_1-1">
                            <b>How to use:</b>
                            <p>Exactly like the original bootstrap tabs except you should use
                            the custom wrapper <code>.nav-tabs-custom</code> to achieve this style.</p>
                            A wonderful serenity has taken possession of my entire soul,
                            like these sweet mornings of spring which I enjoy with my whole heart.
                            I am alone, and feel the charm of existence in this spot,
                            which was created for the bliss of souls like mine. I am so happy,
                            my dear friend, so absorbed in the exquisite sense of mere tranquil existence,
                            that I neglect my talents. I should be incapable of drawing a single stroke
                            at the present moment; and yet I feel that I never was a greater artist than now.
                        </div>
                        <div class="tab-pane" id="tab_2-2">
                            The European languages are members of the same family. Their separate existence is a myth.
                            For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ
                            in their grammar, their pronunciation and their most common words. Everyone realizes why a
                            new common language would be desirable: one could refuse to pay expensive translators. To
                            achieve this, it would be necessary to have uniform grammar, pronunciation and more common
                            words. If several languages coalesce, the grammar of the resulting language is more simple
                            and regular than that of the individual languages.
                        </div>
                        <div class="tab-pane" id="tab_3-2">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                            like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
                        <div class="tab-pane" id="tab_4-2">
                            <my-add-category></my-add-category>
                        </div>
                        </div>
                        <!-- /.tab-content -->
                    </div>
                    <!-- nav-tabs-custom -->
                    </div>
          </my-tabs>
        </section>
        <!-- /.Left col -->

        <!-- right col (We are only adding the ID to make the widgets sortable)-->
        <!-- right col -->
      </div>
      <!-- /.row (main row) -->
    `
})

export class MiscComponent { 

    private _tabTitle: string = "Miscellaneous";

    private _tabHeader: string = "<p>Info</p>";

    private _tabFooter: string = "<p class='pull-right'>Footer</p>";
}
