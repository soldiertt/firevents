import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {ParticipantDto} from '../class/participant.dto';
import {Participant} from '../class/participant.class';

@Injectable()
export class ParticipantService {

  participantDtoObs: FirebaseObjectObservable<ParticipantDto>;
  participantsDtoObs: FirebaseListObservable<ParticipantDto[]>;

  constructor(private af: AngularFire) {
    this.participantsDtoObs = this.af.database.list('/participants');
  }

  getParticipants(): FirebaseListObservable<ParticipantDto[]> {
    return this.participantsDtoObs;
  }

  getParticipant(id: string): FirebaseObjectObservable<ParticipantDto> {
    this.participantDtoObs = this.af.database.object('/participants/' + id);
    return this.participantDtoObs;
  }

  fromDto(dto: ParticipantDto): Participant {
    const participant: Participant = new Participant();
    participant.username = dto.$key;
    participant.firstname = dto.firstname;
    participant.lastname = dto.lastname;
    return participant;
  }

  fromDtoList(dtoList: ParticipantDto[]): Participant[] {
    return dtoList.map(participantDto => this.fromDto(participantDto));
  }
}
