import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localTime',
})
export class LocalTimePipe implements PipeTransform {
  transform(date: string) {
    return date.replace('T00', 'T05');
  }
}
