import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { SearchShowsComponent } from './search-shows.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
describe('SearchShowsComponent', () => {
  let component: SearchShowsComponent;
  let fixture: ComponentFixture<SearchShowsComponent>;
  let commonservice: CommonService;
  let showList = [{
    "name": "Under the Dome",
    "type": "Scripted",
    "genres": [
      "Drama",
      "Science-Fiction",
      "Thriller"
    ],
    "status": "Ended",
    "image": {
      "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      "original": "https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
    }
  }, {
    "name": "Under the Dome",
    "type": "Scripted",
    "genres": [
      "Family",
      "Science-Fiction",
      "Thriller"
    ],
    "status": "Ended",
    "image": {
      "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      "original": "https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
    }
  }];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports :[HttpClientTestingModule, RouterTestingModule],
      declarations: [ SearchShowsComponent ],
      providers: [CommonService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchShowsComponent);
    component = fixture.componentInstance;
    commonservice = TestBed.inject(CommonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing Back button function', () => {
    const fixture = TestBed.createComponent(SearchShowsComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'back').and.callThrough();
    app.back();
    expect(app.back).toHaveBeenCalled();
  });

  it('Testing show details function calling', async(inject([Router], (router) => {
    const fixture = TestBed.createComponent(SearchShowsComponent);
    const app = fixture.componentInstance;
    spyOn(router, 'navigate').and.stub();
    const compiled = fixture.debugElement.nativeElement;
    app.gotoShowDetails('id');
    expect(router.navigate).toHaveBeenCalledWith(['showdetails', 'id']);
  })));

  it('Testing search TVShows', () => {
    const fixture = TestBed.createComponent(SearchShowsComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'search').and.callThrough();
    app.search('');
    expect(app.search).toHaveBeenCalled();
  });

  it('Testing getSearchShows function', () => {
    const fixture = TestBed.createComponent(SearchShowsComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'getSearchShows').and.callThrough();
    app.search('text');
    expect(app.getSearchShows).toHaveBeenCalled();
  });

  it('It Should call getAllShowsList from allshowscomponent ', () => {
    const fixture = TestBed.createComponent(SearchShowsComponent);
    const app = fixture.componentInstance;
    spyOn(commonservice, 'showSearch').and.callThrough().and.returnValues(Promise.resolve(showList));
    component.getSearchShows();
    expect(component.searchDetails.length).toEqual(0);
  });
});
