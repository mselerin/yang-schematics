import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: '<%=dasherize(name)%>' })
export class <%=classify(name)%>Pipe implements PipeTransform {
    transform(input: string|any): string|any {
        return input;
    }
}
