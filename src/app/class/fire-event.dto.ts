export default class FireEventDto {
  $key?: string;
  title: string;
  description?: string;
  type: string;
  date: string;
  participants: any;

  constructor() {
    this.participants = [];
  }

}
