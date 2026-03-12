import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root',
})
export class Places {

  private places: Place[] = [
    {
      id: '1',
      title: 'Vịnh Hạ Long',
      images: [
        'https://images.unsplash.com/photo-1573270689103-d7a4e42b609a?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
      ],
      description: 'Vịnh Hạ Long là kỳ quan thiên nhiên thế giới với hàng ngàn hòn đảo đá vôi đẹp đữ hiện ra tử bẩy kiến tạo của nước bích.',
      rating: 5,
      price: 1200000,
      location: 'Quảng Ninh'
    },
    {
      id: '2',
      title: 'Thành phố Đà Lạt',
      images: [
        'https://images.unsplash.com/photo-1571022828576-e4b3ccdc3010?w=800',
        'https://images.unsplash.com/photo-1587139223877-04538dc58381?w=800',
        'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800'
      ],
      description: 'Đà Lạt – thành phố ngàn hoa, khí hậu mát mẻ quanh năm, lý tưởng cho nghỉ dưỡng và khám phá.',
      rating: 4,
      price: 800000,
      location: 'Lâm Đồng'
    },
    {
      id: '3',
      title: 'Phố cổ Hội An',
      images: [
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
        'https://images.unsplash.com/photo-1555217851-6141535cce46?w=800',
        'https://images.unsplash.com/photo-1548013146-72479768bada?w=800'
      ],
      description: 'Phố cổ Hội An – di sản văn hóa thế giới UNESCO với kiến trúc độc đáo và văn hóa giao thương lâu đời.',
      rating: 5,
      price: 900000,
      location: 'Quảng Nam'
    },
    {
      id: '4',
      title: 'Bãi biển Mũi Né',
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
      ],
      description: 'Mũi Né nổi tiếng với đồi cát vàng, cát trắng và bãi biển tuyệt đẹp.',
      rating: 4,
      price: 700000,
      location: 'Bình Thuận'
    },
    {
      id: '5',
      title: 'Cố đô Huế',
      images: [
        'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
        'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=800',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
      ],
      description: 'Huế – cố đô của triều Nguyễn, nổi bật với đại nội, lăng tẩm và nền ẩm thực đặc sắc.',
      rating: 4,
      price: 750000,
      location: 'Thừa Thiên Huế'
    },
    {
      id: '6',
      title: 'Sapa - Lào Cai',
      images: [
        'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800',
        'https://images.unsplash.com/photo-1552751753-0fc84ae5b6c8?w=800',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
      ],
      description: 'Sapa – thị trấn sương mù với ruộng bậc thang huyền ảo và văn hóa các dân tộc miền núi đa dạng.',
      rating: 5,
      price: 1000000,
      location: 'Lào Cai'
    }
  ];

  constructor() { }

  getAllPlaces(): Place[] {
    return this.places;
  }

  getPlaceById(id: string): Place | undefined {
    return this.places.find(p => p.id === id);
  }
}
