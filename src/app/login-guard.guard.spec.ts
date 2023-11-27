import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginGuardGuard } from './login-guard.guard';

describe('LoginGuardGuard', () => {
  let guard: LoginGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
    });
    guard = TestBed.inject(LoginGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
