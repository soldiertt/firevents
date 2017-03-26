import {EventType} from './eventtype.enum';
import {Participant} from './participant.class';

export default class FireEvent {
  $key: string;
  title: string;
  description?: string;
  type: EventType;
  date: string;
  participants: Participant[];

  constructor() {
    this.participants = [];
  }
}
