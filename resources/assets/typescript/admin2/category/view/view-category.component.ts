import { Component, OnInit, OnDestroy  } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
    selector: 'my-view-category',
    template:
   `
        <my-content title="Categories">
            <div class="content table-responsive table-full-width">
                <table class="table table-hover table-striped">
                    <thead>
                        <th>Category</th>
                    </thead>
                    <tbody>
                        <tr *ngFor="let category of _categories; let i = index">
                            <td>{{category.name}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </my-content>
    `
})

export class ViewCategoryComponent implements OnInit, OnDestroy {

    private _categories;

    //private _branchList;
    
    //private _company;

    constructor(private _catService: CategoryService){}

    ngOnInit(){
        this._catService.getCategories().subscribe(
            result => {
                this._categories = result.categories;
            },
            error => console.log(error)
        );
    }

    ngOnDestroy(){
        //
    }
 }
