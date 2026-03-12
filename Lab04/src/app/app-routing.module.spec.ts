import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module'; 

describe('AppRoutingModule (1.0 điểm)', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)]
    });
    router = TestBed.inject(Router);
  });

  it('Phải định nghĩa tham số trên đường dẫn (Routing with Params) [1.0 điểm]', () => {
    const routeConfigText = JSON.stringify(router.config);
    expect(routeConfigText.includes('/:id')).toBeTrue();
  });
});