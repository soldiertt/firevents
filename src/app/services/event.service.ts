import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import FireEvent from '../class/fire-event.class';
import {database} from 'firebase';
import FireEventDto from '../class/fire-event.dto';
import {EventType} from '../class/eventtype.enum';
import {ParticipantService} from './participant.service';

@Injectable()
export class EventService {

  eventsDtoObs: FirebaseListObservable<FireEventDto[]>;
  eventDtoObs: FirebaseObjectObservable<FireEventDto>;

  constructor(private af: AngularFire, private participantService: ParticipantService) {
    this.eventsDtoObs = this.af.database.list('/events');
  }

  getEvents(): FirebaseListObservable<FireEventDto[]> {
    return this.eventsDtoObs;
  }

  getEvent(id: string): FirebaseObjectObservable<FireEventDto> {
    this.eventDtoObs = this.af.database.object('/events/' + id);
    return this.eventDtoObs;
  }

  addEvent(event: FireEvent): void {
    const eventDto = this._toDto(event);
    this.eventsDtoObs.push(eventDto);
  }

  updateEvent(id: string, event: FireEvent): void {
    this.eventsDtoObs.update(id, this._toDto(event));
  }

  delete(id: string) {
    this.eventsDtoObs.remove(id);
  }

  fromDto(dto: FireEventDto): FireEvent {
    const event: FireEvent = new FireEvent();
    event.$key = dto.$key;
    event.title = dto.title;
    event.description = dto.description;
    event.date = dto.date;
    event.type = EventType[dto.type];
    if (dto.participants) {
      Object.keys(dto.participants).forEach(username => {
        this.participantService.getParticipant(username).subscribe(participantDto => {
          event.participants.push(this.participantService.fromDto(participantDto));
        });
      });
    }
    return event;
  }

  fromDtoList(dtoList: FireEventDto[]): FireEvent[] {
    return dtoList.map(eventDto => this.fromDto(eventDto));
  }

  private _toDto(event: FireEvent): FireEventDto {
    const dto: FireEventDto = new FireEventDto();
    dto.title = event.title;
    if (event.description) {
      dto.description = event.description;
    }
    dto.date = event.date;
    dto.type = EventType[event.type];
    const results = event.participants.reduce((result, part) => {
      result[part.username] = true;
      return result;
    } , {});
    dto.participants = results;
    return dto;
  }

}
