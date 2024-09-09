import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndDeveloperComponent } from './front-end-developer.component';

describe('FrontEndDeveloperComponent', () => {
  let component: FrontEndDeveloperComponent;
  let fixture: ComponentFixture<FrontEndDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontEndDeveloperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontEndDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
