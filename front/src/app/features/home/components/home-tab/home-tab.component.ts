import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "pitz-home-tab",
  templateUrl: "./home-tab.component.html",
  styleUrls: ["./home-tab.component.scss"],
})
export class HomeTabComponent implements OnInit {
  @Input() background: string;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() infoTitle: string;
  @Input() infoDescription: string;

  constructor() {}

  ngOnInit() {}
}
