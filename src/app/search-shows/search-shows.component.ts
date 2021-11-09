import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-search-shows',
  templateUrl: './search-shows.component.html',
  styleUrls: ['./search-shows.component.scss']
})
export class SearchShowsComponent implements OnInit {
  searchText = '';
  searchDetails = [];
  searchName = '';
  constructor(private service: CommonService, private _location: Location, private route: Router, private activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchName = this.activate.snapshot.params.id;
    this.getSearchShows();
  }
  back() {
    this._location.back();
  }
  // Below Function is used to get all searched Name form API response and also sorting descending order
  async getSearchShows() {
    try {
      this.searchDetails = await this.service.showSearch(this.searchName);
      this.searchDetails.sort((a, b) => b.show.rating.average - a.show.rating.average); 
    } catch (err) {
    }
  }
  // Below Function is used redirect to showdetails when click on particular show.
  gotoShowDetails(id) {
    this.route.navigate(['showdetails', id]);
  }
  // Below Function is used to search show in same component.
  search(name) {
    if (name != null && name != '') {
        this.searchName = name;
        this.getSearchShows();
    }
  }

}
