import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnemaxFsComponent } from './onemax-fs.component';

describe('OnemaxFsComponent', () => {
  let component: OnemaxFsComponent;
  let fixture: ComponentFixture<OnemaxFsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnemaxFsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnemaxFsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
