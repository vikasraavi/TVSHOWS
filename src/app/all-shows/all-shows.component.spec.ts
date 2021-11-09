import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { AllShowsComponent } from './all-shows.component';
import { CommonService } from '../service/common.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AllShowsComponent', () => {
  let commonservice: CommonService;
  let component: AllShowsComponent;
  let fixture: ComponentFixture<AllShowsComponent>;
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
      declarations: [ AllShowsComponent ],
      providers: [CommonService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllShowsComponent);
    component = fixture.componentInstance;
    commonservice = TestBed.inject(CommonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Testing show details routing function calling', async(inject([Router], (router) => {
    const fixture = TestBed.createComponent(AllShowsComponent);
    const app = fixture.componentInstance;
    spyOn(router, 'navigate').and.stub();
    const compiled = fixture.debugElement.nativeElement;
    app.gotoShowDetails('id');
    expect(router.navigate).toHaveBeenCalledWith(['showdetails', 'id']);
  })));

  it('Testing searchShows routing function calling', async(inject([Router], (router) => {
    const fixture = TestBed.createComponent(AllShowsComponent);
    const app = fixture.componentInstance;
    spyOn(router, 'navigate').and.stub();
    const compiled = fixture.debugElement.nativeElement;
    app.search('id');
    expect(router.navigate).toHaveBeenCalledWith(['search', 'id']);
  })));

  it('Testing getAllGeneres Array', () => {
    const fixture = TestBed.createComponent(AllShowsComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'getAllGeneres').and.callThrough();
    app.getAllGeneres();
    expect(app.getAllGeneres).toHaveBeenCalled();
    expect(app.allGenres.length).toEqual(0);
  });

  it('Testing popular Shows Array', () => {
    const fixture = TestBed.createComponent(AllShowsComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'getPopularShows').and.callThrough();
    app.getPopularShows();
    expect(app.getPopularShows).toHaveBeenCalled();
  });

  it('It Should call getAllShowsList from allshowscomponent ', () => {
    const fixture = TestBed.createComponent(AllShowsComponent);
    const app = fixture.componentInstance;
    spyOn(commonservice, 'getallShowsList').and.callThrough().and.returnValues(Promise.resolve(showList));
    component.getAllShows();
    expect(component.showList.length).toEqual(0);
  });
});
