import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replace_classname',
    standalone: true
})
export class ReplaceClassNamePipe implements PipeTransform {

    transform(value: string): string {
        return value.replace('Lớp', '').replace('LỚP', '').replace('lớp', '').replace('LOP', '').replace('lop', '').trim()
    }

}
