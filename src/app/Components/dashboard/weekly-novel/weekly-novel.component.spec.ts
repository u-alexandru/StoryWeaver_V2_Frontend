import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyNovelComponent } from './weekly-novel.component';

describe('WeeklyNovelComponent', () => {
  let component: WeeklyNovelComponent;
  let fixture: ComponentFixture<WeeklyNovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyNovelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklyNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
