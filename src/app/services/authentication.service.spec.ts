import { TestBed, inject, fakeAsync} from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule,  HttpTestingController} from '@angular/common/http/testing';
const testConfig ={
  addUser :{
      positive:{
          Name:'Adithya',
          email:'adithyak858@gmail.com',
          password:'Adithya123',
          renterpassword:'Adithya123'
      }
  },
  loginUser:{
      positive:{           
          email:'adithyak858@gmail.com',
          password:'Adithya123'
      }
  }
}
describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,  HttpClientTestingModule
      ],
      providers:[AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
    httpMock= TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should register user', ()=>{
    let newData:any =testConfig.addUser.positive;
    AuthenticationService.registerUser(newData).subscribe((res)=>{  
    expect(res).toBeDefined;
    expect(res).toBe(JSON.stringify(newData));
    });
    const mockReq =httpMock.expectOne(`${AuthenticationService.authEndpoint}registerUser`);
    expect(mockReq.request.method).toEqual('POST');
    mockReq.flush(newData);
    httpMock.verify;
    });
    it('should login user', ()=>{
        let newData:any = testConfig.loginUser.positive;
        AuthenticationService.loginUser(newData).subscribe((res)=>{  
        expect(res).toBeDefined;
        expect(res).toBe('as3dfre.fsferfd.adfgfgssf');
        });
        const mockReq =httpMock.expectOne(`${AuthenticationService.authEndpoint}login`);
        expect(mockReq.request.method).toEqual('POST');
        mockReq.flush('as3dfre.fsferfd.adfgfgssf');
        httpMock.verify;
        });
    })