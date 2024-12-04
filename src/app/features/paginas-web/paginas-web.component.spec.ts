import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginasWebComponent } from './paginas-web.component';

describe('PaginasWebComponent', () => {
  let component: PaginasWebComponent;
  let fixture: ComponentFixture<PaginasWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginasWebComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginasWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
