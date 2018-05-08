import {Component, OnInit} from '@angular/core';

@Component({
   selector: '<%=dasherize(name)%>',
   <% if (template) {%>templateUrl: './<%=dasherize(name)%>.component.html'<% }else{ %>template: `<div><%=dasherize(name)%></div>`<% } %><% if (styles) {%>,
   styleUrls: ['./<%=dasherize(name)%>.component.scss']<% } %>
})
export class <%=classify(name)%>Component implements OnInit
{
   constructor() {}
   ngOnInit() {}
}
