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
  profile: ProfileType | undefined;

  token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IjZvWldrZjM5Qm96TlVldnpNRnZuVWhWNWtHUkh6aXlkVTRLdVYwcXg5T3ciLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xZTRmOTE5Zi01NGYzLTRlOGQtYWQ0Zi03YjZjN2JiZDgzODkvIiwiaWF0IjoxNzE0NjMzMjM1LCJuYmYiOjE3MTQ2MzMyMzUsImV4cCI6MTcxNDYzODY3MywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQUYvUWx0SFc0V2pXb1hvYnp0ZTl3R2laVS9FendBay9UeGlUa2ptbDdoeG9VbnFOaVB0TVVmVjFSdk84YnVTbk8iLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkFuZ3VsYXItU1BBLWF1dGgtY29kZSIsImFwcGlkIjoiNzIxMmRiNzktMjY1OS00NzczLTk2YTEtNDYxOTA1YmRhOWVhIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJUaHVhbiIsImdpdmVuX25hbWUiOiJOZ3V5ZW4gTmluaCIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjI0MDI6OWQ4MDo0MWU6ZGIzNTo4Y2JlOmE1Zjg6NWM3OTpiYTkxIiwibmFtZSI6Ik5ndXllbiBOaW5oIFRodWFuIiwib2lkIjoiNzBiYzZmYzctZDJkYy00ZTk3LTg5MWItMTExYWU0M2NmYmVkIiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMwMDAwQUU5RTQzQTciLCJyaCI6IjAuQVZRQW41RlBIdk5ValU2dFQzdHNlNzJEaVFNQUFBQUFBQUFBd0FBQUFBQUFBQUNpQU5nLiIsInNjcCI6Im9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCBlbWFpbCIsInN1YiI6IkJMMlN3dlZuYldVanViX3E0ZU96bU94UjdTZmpkdUZuM190dC01ek1TbzQiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiQVMiLCJ0aWQiOiIxZTRmOTE5Zi01NGYzLTRlOGQtYWQ0Zi03YjZjN2JiZDgzODkiLCJ1bmlxdWVfbmFtZSI6IjMxMjA0MTgwMDhAdWVkLnVkbi52biIsInVwbiI6IjMxMjA0MTgwMDhAdWVkLnVkbi52biIsInV0aSI6IjNSMUF0QWk0ZWtHWVluNGFBUkYtQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfc3QiOnsic3ViIjoiR3RyTU1UNWF6LUlWYjlLcUJrWmh4cGlMS0E2V05DemlLZVpZUXBIVWFXUSJ9LCJ4bXNfdGNkdCI6MTM3MDc2NTEzM30.myo9eaGpBA0sE2NfMy7JcaIIjsF8CG8rL9Dj2K5E3G0MKpcfYpFEMf209eIL_epRVblVwKbg_msWHzJbPtub99OQEo88a_SQ4SFvkBItNaLFsCrE3eTR4lW6eaiNH2Raj1sPntD2ropcL5sZKcQTNEu5qLdNlwMaew6UtGtpnIj9IKUj58xxuBbOkcGj2H4yR-VCIL6VCD592HqVEZKMQqZ-3dpcvxAU7lfuS5U3t13Lneskb8IfhsqrglQQaD28cHzZlmHKTc1MANoTeHpvZtZ08YXaC9kCJodoHk6Ks6oa4kEop6oIMTvSU1yzzIXLam7OQ-8A4u-YvYFyUuTh4Q';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT, {headers: {'Authorization': 'Bearer' + this.token}}).subscribe((profile) => {
      this.profile = profile;
    });
  }
}
