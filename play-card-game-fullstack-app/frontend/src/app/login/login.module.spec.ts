import { LoginModule } from './login.module';

describe('LoginPageModule', () => {
  let loginPageModule: LoginModule;

  beforeEach(() => {
    loginPageModule = new LoginModule();
  });

  it('should create an instance', () => {
    expect(loginPageModule).toBeTruthy();
  });
});
