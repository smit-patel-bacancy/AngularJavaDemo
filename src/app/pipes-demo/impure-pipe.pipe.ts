import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'impurePipe',
  standalone: true,
  pure: false // This makes it impure - executes on every change detection
})
export class ImpurePipePipe implements PipeTransform {

  transform(value: string): string {
    console.log('Impure pipe executed');
    if (!value) return '';
    return `Impure: ${value.toUpperCase()} (${new Date().toLocaleTimeString()})`;
  }

}
