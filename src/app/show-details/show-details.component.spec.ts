import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ShowDetailsComponent } from './show-details.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

describe('ShowDetailsComponent', () => {
  let component: ShowDetailsComponent;
  let fixture: ComponentFixture<ShowDetailsComponent>;
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
      imports : [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ShowDetailsComponent ],
      providers: [CommonService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    commonservice = TestBed.inject(CommonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Testing Back button function', () => {
    const fixture = TestBed.createComponent(ShowDetailsComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'back').and.callThrough();
    app.back();
    expect(app.back).toHaveBeenCalled();
  });

  it('Testing searchShows routing function calling', async(inject([Router], (router) => {
    const fixture = TestBed.createComponent(ShowDetailsComponent);
    const app = fixture.componentInstance;
    spyOn(router, 'navigate').and.stub();
    const compiled = fixture.debugElement.nativeElement;
    app.search('id');
    expect(router.navigate).toHaveBeenCalledWith(['search', 'id']);
  })));

  it('Testing gotoshow redirecting function calling', async(inject([Router], (router) => {
    const fixture = TestBed.createComponent(ShowDetailsComponent);
    const app = fixture.componentInstance;
    spyOn(router, 'navigate').and.stub();
    const compiled = fixture.debugElement.nativeElement;
    app.gotoShows();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  })));

  it('It Should call getShowsDetails from searchdetails component ', () => {
    const fixture = TestBed.createComponent(ShowDetailsComponent);
    const app = fixture.componentInstance;
    spyOn(commonservice, 'getShowDetails').and.callThrough().and.returnValues(Promise.resolve(showList[0]));
    component.gettingShowDetails();
    expect(component.isShow).toBeFalsy();
  });
});
