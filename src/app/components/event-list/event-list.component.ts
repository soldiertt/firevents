import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';
import FireEvent from '../../class/fire-event.class';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html'
})
export class EventListComponent implements OnInit {

  events: FireEvent[];
  private filteredEvents: FireEvent[];
  eventsFilterForm: FormGroup;
  private allYears: number[] = [];

  constructor(private eventService: EventService,
              private formBuilder: FormBuilder) {
    const year = (new Date()).getFullYear();
    const minYear = year - 80;
    for (let pushYear = year; pushYear > minYear; pushYear--) {
      this.allYears.push(pushYear);
    }
  }

  ngOnInit() {
    this.eventsFilterForm = this.formBuilder.group({
      titleFilter : this.formBuilder.control(''),
      descFilter : this.formBuilder.control(''),
      typeFilter : this.formBuilder.control('ALL'),
      yearFilter : this.formBuilder.control('ALL'),
      participantFilter : this.formBuilder.control('ALL')
    });
    this.eventService.getEvents().subscribe(eventsDto => {
      this.events = this.eventService.fromDtoList(eventsDto);
      this.filterEvents();
    });
    this.eventsFilterForm.valueChanges.subscribe(control => {
        this.filterEvents();
      }
    );
  }

  deleteEvent(id: string) {
    this.eventService.delete(id);
  }

  filterEvents() {
    this.filteredEvents = this.events.filter(event =>
      (!this.eventsFilterForm.controls['titleFilter'].value ||
      (event.title.toLowerCase().indexOf(this.eventsFilterForm.controls['titleFilter'].value.toLowerCase()) !== -1))
      && (!this.eventsFilterForm.controls['descFilter'].value ||
      (event.description && event.description.toLowerCase().indexOf(this.eventsFilterForm.controls['descFilter'].value.toLowerCase()) !== -1))
      && (this.eventsFilterForm.controls['typeFilter'].value === 'ALL' ||
      (event.type === this.eventsFilterForm.controls['typeFilter'].value))
      && (this.eventsFilterForm.controls['yearFilter'].value === 'ALL' ||
      (event.date.substr(0, 4) === this.eventsFilterForm.controls['yearFilter'].value))
      && (this.eventsFilterForm.controls['participantFilter'].value === 'ALL' ||
      (event.participants.some(participant => (participant.firstname + ' ' + participant.lastname) === this.eventsFilterForm.controls['participantFilter'].value)))
    );
  }
}
