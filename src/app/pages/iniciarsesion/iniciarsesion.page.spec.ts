import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IniciarsesionPage } from './iniciarsesion.page';

describe('IniciarsesionPage', () => {
  let component: IniciarsesionPage;
  let fixture: ComponentFixture<IniciarsesionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarsesionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IniciarsesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
