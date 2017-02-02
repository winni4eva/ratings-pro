import { Component } from '@angular/core';

@Component({
    selector: 'my-add-branch',
    template: `
         <!-- Main row -->
      <div class="row">
        <!-- Left col -->
        <section class="col-lg-12 connectedSortable">
          <my-tabs [title]="_tabTitle" [header]="_tabHeader" [footer]="_tabFooter">
              <form role="form">
                <div class="box-body">

                    <div class="form-group">
                        <label for="name">Branch Name</label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="Enter Branch Name">
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Branch Admin First Name</label>
                        <input type="text" class="form-control" id="first_name" name="first_name" placeholder="Enter Branch Admin First Name">
                    </div>

                    <div class="form-group">
                        <label for="last_name">Branch Admin Last Name</label>
                        <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Enter Branch Admin Last Name">
                    </div>

                    <div class="form-group">
                        <label for="email">Branch Admin Email</label>
                        <input type="text" class="form-control" id="email" name="email" placeholder="Enter Branch Admin Email">
                    </div>

                    <div class="checkbox">
                        <label>
                            <input type="checkbox"> Admin
                        </label>
                    </div>

                </div>
    
                <div class="box-footer">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
          </my-tabs>
        </section>
      </div>
      <!-- /.row (main row) -->
    `
})

export class AddBranchComponent { 

    private _tabTitle: string = "Add Branch";

    private _tabHeader: string = "<p>Info</p>";

    private _tabFooter: string = "<p class='pull-right'>Footer</p>";
}
