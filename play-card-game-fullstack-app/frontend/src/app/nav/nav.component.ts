import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    if (confirm('Are you sure want to logout ?')) {
      this.commonService.logout();
      this.router.navigateByUrl('/login');
    }
  }
}
