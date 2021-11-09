import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {

  constructor(private service: CommonService, private _location: Location, private route: Router, private activate: ActivatedRoute) { }
  showDetails: any = {};
  searchText = '';
  isShow = false;
  ngOnInit(): void {
    this.gettingShowDetails();
  }
  back() {
    this._location.back();
  }
  // Below Function is used to get the Show details by hitting the below API
  async gettingShowDetails() {
    try {
      this.showDetails = await this.service.getShowDetails(this.activate.snapshot.params.id);
      if (this.showDetails !== undefined) {
        this.isShow = true;
      }
    } catch (err) {
    }
  }
  // Below Code is to search TVShows
  search(name) {
    if (name != null && name != '') {
    this.route.navigate(['search', name]);
    }
  }
  gotoShows() {
    this.route.navigate(['']);
  }

}
