import { Location } from '@angular/common';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { ROUTES } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';
import { NgModuleFactoryLoader } from '@angular/core';
import { HomeModule } from './features/home/home.module';


describe('Router: App', () => {

  let router: any;
  let location: Location;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        FeaturesModule,
        RouterTestingModule.withRoutes(ROUTES)
      ],
      declarations: [
        AppComponent
      ]
    });

    router = TestBed.get(Router);
    const loader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = {lazyModule: HomeModule};

    router.resetConfig([
      {path: 'home', loadChildren: 'lazyModule'},
    ]);

    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
  });


  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it('should navigate to home path', fakeAsync(() => {
    router.navigateByUrl('/home');

    tick();
    fixture.detectChanges();

    expect(location.path()).toBe('/home');
  }));
});
