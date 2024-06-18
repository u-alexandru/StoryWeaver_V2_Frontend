import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNovelsComponent } from './top-novels.component';

describe('TopNovelsComponent', () => {
  let component: TopNovelsComponent;
  let fixture: ComponentFixture<TopNovelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNovelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopNovelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
