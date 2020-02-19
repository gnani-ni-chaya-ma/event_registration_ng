import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './dataService.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private dataService: DataService) {

  }

  async fetchEvents() {
    var eventList: any;
    console.log("IN SERVICE");
    
    return this.http.get(environment.apiUrl + "/events/?category=" + this.dataService.category.id + "&active=true").toPromise();

  }

  fetchEvent(eventId: number) {
    return this.http.get(environment.apiUrl + "/events/" + eventId).toPromise();
  }

  async fetchEventCategories() {
    return this.http.get(environment.apiUrl + '/events/event-categories/').toPromise();
  }

  fetchCategories(): Observable<any> {
    return this.http.get(environment.apiUrl + '/events/event-categories/');
  }


  //  fetchActiveCenters(){
  //   return this.http.get(environment.apiUrl + '/base/centers?is_displayed=true').toPromise();
  // }

  //  fetchAllCenters(){
  //   return this.http.get(environment.apiUrl + '/base/centers/').toPromise();
  // }


  async submitForm(formDetails: any) {

    let body = {
      "participant": {
        "first_name": formDetails.firstName,
        "last_name": formDetails.lastName,
        "date_of_birth": formDetails.birthday._i.year + "-" + (formDetails.birthday._i.month + 1) + "-" + formDetails.birthday._i.date,
        "mobile": formDetails.phone,
        "gender": 'male',
        "other_center": formDetails.other_center,
        "father_name": "hgsh",
        "father_mobile": "1234567890",
        "email": formDetails.email,
        "mother_name": "",
        "mother_mobile": "",
        "center": formDetails.ymhtLocationGroup.id
      },
      "accommodation": formDetails.accommodation === "true",
      "payment_status": false,
      "amount_paid": 0,
      "cashier": "",
      "big_buddy": "",
      "goal_achievement": "",
      "role": formDetails.role,
      "registration_status": 0,
      "skill": "",
      "event": this.dataService.event.id,
      "home_center": formDetails.ymhtLocationGroup.id,
      "event_center": this.dataService.event.center
    }

    // console.log(body);

    let response = await this.http.post(environment.apiUrl + '/events/event-participants/', JSON.stringify(body), { headers: { 'content-type': 'application/json' } });
    return response.toPromise();
  }

}
