import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NavComponent } from './nav.component';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { RouterTestingModule} from '@angular/router/testing';
import { By } from '@angular/platform-browser';


describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  const mockedAuthService = jasmine.createSpyObj('AuthentificationService',
  ['createUser','logout'],{
    isAuthenticated$: of(true),
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      imports:[RouterTestingModule],
      providers: [
       { provide:AuthentificationService,
        useValue: mockedAuthService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 /*  it('should logout', () =>{
    const logoutLink = fixture.debugElement.query(By.css(
      'li:nth-child(5) a'
    ))

    expect(logoutLink).withContext("No loggeado").toBeTruthy();
    logoutLink.triggerEventHandler('click');

    const service = TestBed.inject(AuthentificationService);

    expect(service.logout).withContext("No ha evento click").toHaveBeenCalledTimes(1);
  }) */
});
