import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OnemaxGaComponent } from './onemax-ga.component'

describe('OnemaxComponent', () => {
  let component: OnemaxGaComponent
  let fixture: ComponentFixture<OnemaxGaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnemaxGaComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(OnemaxGaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
