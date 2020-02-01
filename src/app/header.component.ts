import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageServices } from '../shared/data-storage.service';
import { Response } from '@angular/http';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent
{
    // @Output() featureSelected = new EventEmitter<string>();
    // onSelect(feature: string)
    // {
    //     this.featureSelected.emit(feature);
    // }
    constructor(private datastorageservice: DataStorageServices) { }
    onSave()
    {
        this.datastorageservice.storerecipes()
            .subscribe((response: Response) =>
            {
                console.log(response);
            });
    }
    onFetch()
    {
        this.datastorageservice.getrecipes();
    }
}