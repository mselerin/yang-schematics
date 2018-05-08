import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%=classify(name)%>Component } from './<%=dasherize(name)%>.component';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';

describe('<%=classify(name)%>Component', () => {
    let component: <%=classify(name)%>Component;
    let fixture: ComponentFixture<<%=classify(name)%>Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ CoreModule, SharedModule ],
            declarations: [ <%=classify(name)%>Component ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(<%=classify(name)%>Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
