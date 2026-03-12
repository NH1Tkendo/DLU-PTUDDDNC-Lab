import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Tab1Page } from './tab1.page';
import { PlacesService } from '../services/places.service';
import { IonicModule } from '@ionic/angular';

class StrictMockPlacesService {
  getAllPlaces() { return []; } // Trả về rỗng để ép sinh viên xử lý lỗi
}

describe('Test 5: OOP & Code Quality (2.0 điểm)', () => {
  let tab1Component: Tab1Page;
  let tab1Fixture: ComponentFixture<Tab1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot()],
      providers: [ { provide: PlacesService, useClass: StrictMockPlacesService } ]
    }).compileComponents();

    tab1Fixture = TestBed.createComponent(Tab1Page);
    tab1Component = tab1Fixture.componentInstance;
    tab1Fixture.detectChanges();
  }));

  it('Tab1Page KHÔNG ĐƯỢC chứa dữ liệu rác (Hard-coded array) mà phải phụ thuộc hoàn toàn vào Service (Dependency Injection) [1.0 điểm]', () => {
    // Vì StrictMockPlacesService trả về [], component của SV bắt buộc phải có mảng places là []
    expect(tab1Component.places).toBeDefined('Biến places chưa được khai báo');
    expect(tab1Component.places.length).toEqual(0, 'Phát hiện Hard-code! Component không được gán cứng mảng mà phải gọi từ Service.');
  });
});