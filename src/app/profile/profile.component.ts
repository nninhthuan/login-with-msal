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

  token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6ImdDblVHdG5DeEthVkpmWWZ1dk53ZFBNc3FJVXItZEVsNHA3RnhtNk8tQjAiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xZTRmOTE5Zi01NGYzLTRlOGQtYWQ0Zi03YjZjN2JiZDgzODkvIiwiaWF0IjoxNzE0NjQwMTIyLCJuYmYiOjE3MTQ2NDAxMjIsImV4cCI6MTcxNDY0NDk4NSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQVFQRU9pMDcwL0FYeEdHd3NoL2JlcXZRN1Q0Q3NkNlpHV2VVTE56SFU5dVhUQTNFcFIxVzRwd2hvWUR3bi9XbVgiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkFuZ3VsYXItU1BBLWF1dGgtY29kZSIsImFwcGlkIjoiNzIxMmRiNzktMjY1OS00NzczLTk2YTEtNDYxOTA1YmRhOWVhIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJUaHVhbiIsImdpdmVuX25hbWUiOiJOZ3V5ZW4gTmluaCIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjExMy4xNzYuMTk1LjkiLCJuYW1lIjoiTmd1eWVuIE5pbmggVGh1YW4iLCJvaWQiOiI3MGJjNmZjNy1kMmRjLTRlOTctODkxYi0xMTFhZTQzY2ZiZWQiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzAwMDBBRTlFNDNBNyIsInJoIjoiMC5BVlFBbjVGUEh2TlVqVTZ0VDN0c2U3MkRpUU1BQUFBQUFBQUF3QUFBQUFBQUFBQ2lBTmcuIiwic2NwIjoib3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIGVtYWlsIiwic3ViIjoiQkwyU3d2Vm5iV1VqdWJfcTRlT3ptT3hSN1NmamR1Rm4zX3R0LTV6TVNvNCIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6IjFlNGY5MTlmLTU0ZjMtNGU4ZC1hZDRmLTdiNmM3YmJkODM4OSIsInVuaXF1ZV9uYW1lIjoiMzEyMDQxODAwOEB1ZWQudWRuLnZuIiwidXBuIjoiMzEyMDQxODAwOEB1ZWQudWRuLnZuIiwidXRpIjoiUGs4aFRnNENaMGFWTUw3Z3phZEZBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJHdHJNTVQ1YXotSVZiOUtxQmtaaHhwaUxLQTZXTkN6aUtlWllRcEhVYVdRIn0sInhtc190Y2R0IjoxMzcwNzY1MTMzfQ.ba-Zy4yApciekMP6wC9ITP5TcHC_6LVklxtzh1VYSuzXzLYqThxy8UeDpzpWAM3pZMnRbK467dw0dyrlqbLzbzNflGH-zH_Ku-XpRQp08w2vwbryny1TN0UJmRcnxXtsXVMs5dJyrZdpMUNQ0uM7jd4jEMBv1Zzms06YxQ4e_6_plo2lEwoXD8yL7a-uy5XAexOkiJWRSvM-g85jsJ5H0eRRPF4EDZ5GH_EL_ts8s73JrxQMme-PUPsRG_3Db0mRRnBZAPhocwKFh0N20MRyyaX0N2gL9XtKvlfbXeNixyTwMmAbNux0Ukr42yolSnuJ7XCMzQgbUvyd7DtVdKAmCg";
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
