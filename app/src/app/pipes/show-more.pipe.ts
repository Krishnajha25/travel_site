import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class ShowMorePipe implements PipeTransform {

  transform(value: string, limit: number): string {
    return value.slice(0, limit) + "..."
  }

}
