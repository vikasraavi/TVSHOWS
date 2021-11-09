import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { CommonService } from './common.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CommonService', () => {
  let commonservice: CommonService;
  let httpTestCtrl: HttpTestingController;
  let showList = {};
  let baseUrl = "https://api.tvmaze.com/";
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports :[HttpClientTestingModule]
    });
    showList = {
      "id": 1,
      "url": "https://www.tvmaze.com/shows/1/under-the-dome",
      "name": "Under the Dome",
      "type": "Scripted",
      "language": "English",
      "genres": [
        "Drama",
        "Science-Fiction",
        "Thriller"
      ],
      "status": "Ended",
      "runtime": 60,
      "averageRuntime": 60,
      "premiered": "2013-06-24",
      "ended": "2015-09-10",
      "officialSite": "http://www.cbs.com/shows/under-the-dome/",
      "schedule": {
        "time": "22:00",
        "days": [
          "Thursday"
        ]
      },
      "rating": {
        "average": 6.5
      },
      "weight": 98,
      "network": {
        "id": 2,
        "name": "CBS",
        "country": {
          "name": "United States",
          "code": "US",
          "timezone": "America/New_York"
        }
      },
      "webChannel": null,
      "dvdCountry": null,
      "externals": {
        "tvrage": 25988,
        "thetvdb": 264492,
        "imdb": "tt1553656"
      },
      "image": {
        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
        "original": "https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
      },
      "summary": "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
      "updated": 1631010933,
      "_links": {
        "self": {
          "href": "https://api.tvmaze.com/shows/1"
        },
        "previousepisode": {
          "href": "https://api.tvmaze.com/episodes/185054"
        }
      }
    };
    httpTestCtrl = TestBed.inject(HttpTestingController);
    commonservice = TestBed.inject(CommonService);
  });
  it('should be created', () => {
    expect(commonservice).toBeTruthy();
  });
  it('Testing Get All Shows API', inject([CommonService], fakeAsync((commonservice: CommonService) => {
   
    commonservice.getallShowsList().then((res) => {
      expect(res).toEqual(showList);
    });
    const req = httpTestCtrl.expectOne({
      method: "GET",
      url: baseUrl + "shows"
    });
    expect(req.request.method).toEqual("GET");
    expect(req.request.url.endsWith("/shows")).toEqual(true);
    req.flush(showList);
    httpTestCtrl.verify();
    tick();
  })));
});
