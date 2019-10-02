import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'propercase' })
export class PropercasePipe implements PipeTransform {
  transform(input: string|any): string|any {
    if (typeof input !== 'string') {
      return input;
    }

    return input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
}
