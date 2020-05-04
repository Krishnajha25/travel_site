import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

  transform(oldUrl: string, newUrl: string): string {
    //const newUrl = 'https://place-hold.it/300x500'
    if(oldUrl == null){
      return newUrl
    }
  }

}
