import { APP_ID, Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-shows',
  templateUrl: './all-shows.component.html',
  styleUrls: ['./all-shows.component.scss']
})
export class AllShowsComponent implements OnInit {

  constructor(private service: CommonService, private route: Router) { }
  showList = [];
  searchText = '';
  showFilteredList = [];
  allGenres = [];
  popularShow: any;
  ngOnInit(): void {
    this.getAllShows();
  };
// Below Method is used to call getAllshow API and checking with genres present in api response based on that preparing object.
  async getAllShows() {
    try {
      this.showList = await this.service.getallShowsList();
      this.getAllGeneres();
      if (this.showList !== undefined) {
        for (let i = 0; i < this.allGenres.length; i++) {
          this.showFilteredList.push({});
          this.showFilteredList[i].genreData = [];
          this.showList.forEach((val, key) => {
          if (val.genres.includes(this.allGenres[i])) {
              this.showFilteredList[i].genreName = this.allGenres[i];
              this.showFilteredList[i].genreData.push(val);
              this.showFilteredList[i].genreData.sort((a, b) => b.rating.average - a.rating.average);
          }
        });
      this.getPopularShows();
      }
      } else {
      }
    } catch (err) {
    }
  }
// Below Method is used to get all popular shows based on rating in each section. 
  getPopularShows() {
    this.popularShow = this.showList.sort((a, b) => b.rating.average - a.rating.average).slice(0, 12);
  }
// Below Method is used to get all Genres from all shows
  getAllGeneres() {
    this.showList.forEach((val, key) => {
      val.genres.forEach((gval, gky) => {
        this.allGenres.push(gval);
      });
      this.allGenres = this.allGenres.filter((c, index) => {
        return this.allGenres.indexOf(c) === index;
      });
    });
  }
  // Below Code is to redirect form shows to show details.
  gotoShowDetails(id) {
    this.route.navigate(['showdetails', id]);
  }
  // Below Code is to search TVShows By Name
   search(name) {
    if (name != null && name != '') {
    this.route.navigate(['search', name]);
    }
  }
}
