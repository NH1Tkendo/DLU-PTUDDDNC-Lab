import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { TodoService, Todo } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  // Biến Observable (có dấu $ ở cuối theo quy ước)
  todos$!: Observable<Todo[]>;
  filteredTodos: Todo[] = [];
  allTodos: Todo[] = [];

  // Reactive Form
  todoForm: FormGroup;

  // Lưu trạng thái người dùng
  username: string = '';
  usernameControl = new FormControl('');

  // Tìm kiếm thông minh (RxJS Debounce)
  searchControl = new FormControl('');
  private searchSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private loadingCtrl: LoadingController,
    @Optional() private storage: Storage | null
  ) {
    // Định nghĩa Form với các luật (Validators)
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      completed: [false],
    });
  }

  ngOnInit() {
    // Gán Observable cho AsyncPipe
    this.todos$ = this.todoService.getTodos();

    // Lắng nghe tìm kiếm với debounce
    this.setupSearchControl();

    // Khởi tạo Storage nếu có
    if (this.storage) {
      this.initStorage();
    }
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

  // ====== Ionic Storage ======

  async initStorage() {
    if (this.storage) {
      await this.storage.create();
      await this.loadName();
    }
  }

  async saveName(name: string) {
    if (this.storage) {
      await this.storage.set('username', name);
      this.username = name;
    }
  }

  async loadName() {
    if (this.storage) {
      const name = await this.storage.get('username');
      if (name) {
        this.username = name;
      }
    }
  }

  onSaveName() {
    const name = this.usernameControl.value?.trim();
    if (name) {
      this.saveName(name);
    }
  }

  // ====== Tải danh sách Todos với Loading Indicator ======

  async loadTodos() {
    const loading = await this.loadingCtrl.create({ message: 'Đang tải dữ liệu...' });
    await loading.present();

    this.todoService
      .getTodos()
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe({
        next: (todos) => {
          this.allTodos = todos;
          this.filteredTodos = todos;
        },
        error: (err) => console.error('Lỗi khi tải todos:', err),
      });
  }

  // ====== Thêm Todo mới ======

  async onSubmit() {
    if (this.todoForm.valid) {
      const loading = await this.loadingCtrl.create({ message: 'Đang thêm...' });
      await loading.present();

      this.todoService
        .addTodo(this.todoForm.value)
        .pipe(
          finalize(() => {
            loading.dismiss();
          })
        )
        .subscribe({
          next: (res) => {
            alert('Đã thêm thành công (Simulation): ' + res.title);
            this.todoForm.reset();
          },
          error: (err) => console.error('Lỗi:', err),
        });
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  // ====== Tìm kiếm thông minh ======

  setupSearchControl() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
    this.searchSub = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text) => {
        console.log('Đang tìm kiếm:', text);
        this.filterTodos(text ?? '');
      });
  }

  filterTodos(keyword: string) {
    const lowerKeyword = keyword.toLowerCase().trim();
    if (!lowerKeyword) {
      this.filteredTodos = [...this.allTodos];
    } else {
      this.filteredTodos = this.allTodos.filter((todo) =>
        todo.title.toLowerCase().includes(lowerKeyword)
      );
    }
  }
}
