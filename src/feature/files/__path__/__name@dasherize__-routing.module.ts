import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
<% if (component) {%>import {<%=classify(name)%>Component} from './<%=dasherize(name)%>.component';<% } %>


export const <%=classify(name)%>Routes: Routes = [
    <% if (component) {%>{ path: '', component: <%=classify(name)%>Component }<% } %>
];


@NgModule({
    providers: [],
    imports: [ RouterModule.forChild(<%=classify(name)%>Routes) ]
})
export class <%=classify(name)%>RoutingModule {}
