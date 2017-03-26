import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import FireEvent from '../../class/fire-event.class';
import {Participant} from '../../class/participant.class';
import {EventType} from '../../class/eventtype.enum';
import EnumUtil from '../../class/util/enum-util.class';
import DateObject from '../../class/date-object.class';
import * as moment from 'moment';
import {ParticipantService} from '../../services/participant.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html'
})
export class EventFormComponent implements OnInit {

  id: string;
  mode: string;
  event: FireEvent;
  newParticipant: Participant = new Participant();
  eventTypes: string[];
  persons: Participant[];
  _dt: DateObject = new DateObject();

  constructor(private eventService: EventService,
              private participantService: ParticipantService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.eventTypes = EnumUtil.getNames(EventType);
    this.mode = this.router.url.startsWith('/edit-event') ? 'edit' : 'create';
    if (this.mode === 'edit') {
      this.id = this.route.snapshot.params['id'];
      this.eventService.getEvent(this.id).subscribe(eventDto => {
        this.event = this.eventService.fromDto(eventDto);
      });
    } else {
      this.event = new FireEvent();
    }
    this.participantService.getParticipants().subscribe(participantsDto => {
      this.persons = this.participantService.fromDtoList(participantsDto);
    });
  }

  saveEvent(valid: boolean) {
    if (valid) {
      if (this.mode === 'edit') {
        this.eventService.updateEvent(this.event.$key, this.event);
      } else if (this.mode === 'create') {
        this.eventService.addEvent(this.event);
      }
      this.router.navigate(['event-list']);
    }
  }

  addParticipant() {
    const index = this.event.participants.findIndex(part => part.username === this.newParticipant.username);
    if (this.newParticipant.username && index === -1) {
      this.event.participants.push(this.newParticipant);
      this.newParticipant = new Participant(); // Trigger change detection
    }
  }

  deleteParticipant(participant, $event) {
    $event.preventDefault();
    const objIndex = this.event.participants.indexOf(participant);
    this.event.participants.splice(objIndex, 1);
    this.newParticipant = new Participant(); // Trigger change detection
  }

  cancel() {
    this.router.navigate(['event-list']);
  }

  reset() {
    this.event = new FireEvent();
    this.newParticipant = new Participant();
  }

  set dt(dateObject: DateObject) {
    this._dt = dateObject;
    const dtMoment = moment(new Date(dateObject.year, dateObject.month, dateObject.day));
    this.event.date = dtMoment.format('YYYY-MM-DD');
  }
}
