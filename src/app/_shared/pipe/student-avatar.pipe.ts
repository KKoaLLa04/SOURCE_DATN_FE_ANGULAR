import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'student_avatar',
    standalone: true
})
export class StudentAvatarPipe implements PipeTransform {

    transform(value?: string, gender?: string): any {
      return value ?? gender === 'male' ? '/assets/images/png/students/default_male.png' : '/assets/images/png/students/default_female.png';
    }

}
