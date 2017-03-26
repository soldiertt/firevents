import {Pipe, PipeTransform} from '@angular/core';
import {Participant} from '../class/participant.class';
@Pipe({
  name: 'userFullname',
  pure: true
})
export class ParticipantFullnamePipe implements PipeTransform {

  transform(participant: Participant, ...args: any[]): any {
    if (participant.username !== '') {
      return participant.firstname + ' ' + participant.lastname;
    } else {
      return '[Select a participant]';
    }
  }

}
