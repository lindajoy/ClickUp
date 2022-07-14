import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { pluck } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { RestApiService } from '../shared/rest-api.service';
import { RickMortyLocations } from '../shared/rick-morty-locations';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, AfterViewInit {

  // allows you to unsubscribe from observables gracefully!
  private subs = new SubSink();

  displayedColumns: string[] = ['name', 'type', 'dimension'];

  dataSource: MatTableDataSource<RickMortyLocations>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  constructor(private _dataService: RestApiService) {
    this.dataSource = new MatTableDataSource();
   
   }

  ngOnInit(): void {
    /* pluck method allows you to read a particular property in an object */
    this.subs.sink = this._dataService.getLocations()
                         .pipe(pluck('results'))
                            .subscribe((data) => {
                                this.setData(data)
                                
                                this.dataSource.data = data as RickMortyLocations[];

                          });
    
  }
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  private setData(data: unknown)
  {
    this.dataSource.data = data as RickMortyLocations[]
  }
  

  applyFilter(evt: Event)
  {
    this.dataSource.filter = (evt.target as HTMLInputElement).value.trim().toLowerCase();
  }

}
