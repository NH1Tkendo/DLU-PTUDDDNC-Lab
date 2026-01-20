import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem,
  IonLabel, IonButton, IonIcon, IonInput, IonButtons,
  AlertController, IonItemSliding, IonItemOptions, IonItemOption,
  IonCheckbox
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

// Interface Product
export interface Product {
  name: string;
  isBought: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonInput,
    IonButtons,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonCheckbox
  ]
})
export class HomePage {
  items: Product[] = [
    { name: "Sữa tươi", isBought: false },
    { name: "Bánh mì sandwich", isBought: false }
  ];
  newItem: string = ""; // Biến lưu giá trị nhập

  constructor(private alertController: AlertController) {}

  // Hàm xử lý sự kiện click nút Thêm
  async addItem() {
    // Kiểm tra nếu newItem không rỗng thì thêm vào danh sách
    if (this.newItem.trim().length > 0) {
      this.items.push({ name: this.newItem, isBought: false }); // Thêm vào mảng
      this.newItem = ""; // Reset ô nhập về rỗng
    } else {
      // Hiển thị alert khi ô nhập rỗng
      const alert = await this.alertController.create({
        header: 'Lỗi',
        message: 'Vui lòng nhập tên sản phẩm!',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Hàm xóa item
  deleteItem(index: number) {
    this.items.splice(index, 1);
  }
}
