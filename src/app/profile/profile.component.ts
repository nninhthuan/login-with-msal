import { HttpClient } from '@angular/common/http';
import { Component, type OnInit } from '@angular/core';

interface ProfileType {
  givenName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
};

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me'; //create enum

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  providers: [HttpClient],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT).subscribe((profile) => {
      this.profile = profile;
      console.log(this.profile)

    });
  }
}
