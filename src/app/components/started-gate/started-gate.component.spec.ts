import { TestBed , ComponentFixture} from "@angular/core/testing";
import { StartedGateComponent } from "./started-gate.component";

describe('started gate component ', () =>{

  let fixture: ComponentFixture<StartedGateComponent>;

  let component: StartedGateComponent;
  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations:[StartedGateComponent],

    }).compileComponents();
  });

  beforeEach(()=> {
    fixture = TestBed.createComponent(StartedGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })
});