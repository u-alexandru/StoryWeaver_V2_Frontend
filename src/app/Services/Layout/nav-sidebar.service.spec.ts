import { TestBed } from '@angular/core/testing';

import { NavSidebarService } from './nav-sidebar.service';

describe('NavSidebarService', () => {
  let service: NavSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
