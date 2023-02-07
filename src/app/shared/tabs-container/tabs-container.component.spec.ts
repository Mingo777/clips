import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TabsContainerComponent } from './tabs-container.component';
import { TabsComponent } from '../tabs/tabs.component';
import { By } from '@angular/platform-browser';



@Component({
  template: `
  <app-tabs-container>
    <app-tabs tabTitle="Tab 1">Tab 1</app-tabs>
    <app-tabs tabTitle="Tab 2">Tab 2</app-tabs>
  </app-tabs-container>
  `
})
class TestHostComponent{

}



describe('TabsContainerComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsContainerComponent,TabsComponent,TestHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two tabs', () => {
    const tabs = fixture.debugElement.queryAll(By.css('li'));
    const containerComponent = fixture.debugElement.query(
      By.directive(TabsContainerComponent));
    const tabsProp = containerComponent.componentInstance.tabs  
    expect(tabs.length).withContext("Tabs did not render").toBe(2);
    expect(tabsProp.length).withContext("Tabs deberia tener 2 tabs").toBe(2);
  })
});
