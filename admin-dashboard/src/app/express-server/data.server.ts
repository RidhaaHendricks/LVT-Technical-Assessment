import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataService {
    private url = "http://localhost:3000/api/tempNumbers";

    constructor(private http: HttpClient) {
        
    }

    getData(): Observable<any> {
        return this.http.get(this.url);
    }
}