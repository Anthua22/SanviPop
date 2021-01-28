import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mtokm'
})
export class MtokmPipe implements PipeTransform {

  transform(meter:any): string {
    let m = parseFloat(meter);
    return (m/1000).toString();
  }

}
