import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LectorQrPage } from './lector-qr.page';

describe('LectorQrPage', () => {
  let component: LectorQrPage;
  let fixture: ComponentFixture<LectorQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorQrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LectorQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
