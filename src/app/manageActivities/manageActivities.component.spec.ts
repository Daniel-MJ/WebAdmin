import { ComponentFixture, TestBed } from '@angular/core/testing';

import { manageActivitiesComponent } from './manageActivities.component';

describe('manageActivitiesComponent', () => {
  let component: manageActivitiesComponent;
  let fixture: ComponentFixture<manageActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [manageActivitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(manageActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
