import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PlaceDetailPage } from './place-detail.page';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../services/places.service';
import { By } from '@angular/platform-browser';

class MockPlacesService {
  getPlaceById(id: string) {
    return { id: '1', title: 'Đà Lạt', images: ['img1.jpg', 'img2.jpg'], rating: 5, price: 1500000 };
  }
}

describe('PlaceDetailPage - Chi tiết (4.0 điểm)', () => {
  let component: PlaceDetailPage;
  let fixture: ComponentFixture<PlaceDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceDetailPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: PlacesService, useClass: MockPlacesService },
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: { get: () => '1' } } } 
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Nắm bắt được ID từ URL (ActivatedRoute) và lấy dữ liệu chi tiết [1.0 điểm]', () => {
    expect(component).toBeTruthy();
    expect(component.place).toBeDefined('Chưa gán dữ liệu cho biến place');
    expect(component.place.title).toEqual('Đà Lạt');
  });

  it('Giao diện phải có ion-back-button ở header và hiệu ứng condense [1.0 điểm]', () => {
    const backBtn = fixture.debugElement.query(By.css('ion-back-button'));
    expect(backBtn).toBeTruthy('Thiếu thẻ <ion-back-button> để quay lại');
    
    const headers = fixture.debugElement.queryAll(By.css('ion-header'));
    const hasCondense = headers.some(h => h.attributes['collapse'] === 'condense');
    expect(hasCondense).toBeTrue();
  });

  it('Phải tích hợp Swiper (slider) để hiển thị mảng hình ảnh [1.0 điểm]', () => {
    const swiper = fixture.debugElement.query(By.css('swiper-container, ion-slides'));
    expect(swiper).toBeTruthy('Thiếu swiper-container (Swiper) hoặc ion-slides để hiển thị ảnh');
  });

  it('Phải có ion-footer chứa nút "Đặt ngay" cố định cuối trang [1.0 điểm]', () => {
    const footer = fixture.debugElement.query(By.css('ion-footer'));
    expect(footer).toBeTruthy('Thiếu thẻ <ion-footer>');
    
    const button = footer?.query(By.css('ion-button'));
    expect(button).toBeTruthy('Thiếu <ion-button> bên trong footer');
  });
});