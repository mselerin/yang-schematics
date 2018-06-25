import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const <%=classify(name)%>Routes: Routes = [
];


@NgModule({
  providers: [],
  imports: [ RouterModule.forChild(<%=classify(name)%>Routes) ]
})
export class <%=classify(name)%>RoutingModule {}
