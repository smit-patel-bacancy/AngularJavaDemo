import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parameterizedCustomPipe',
  standalone: true
})
export class ParameterizedCustomPipePipe implements PipeTransform {

  transform(value: string, prefix: string = 'Default', suffix: string = ''): string {
    if (!value) return '';
    return `${prefix}: ${value.toUpperCase()}${suffix}`;
  }

}
