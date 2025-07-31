import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'purePipe',
  standalone: true,
  pure: true // This is the default, but explicitly showing it
})
export class PurePipePipe implements PipeTransform {

  transform(value: string): string {
    console.log('Pure pipe executed');
    if (!value) return '';
    return `Pure: ${value.toUpperCase()}`;
  }

}
