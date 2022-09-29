import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "pitz-home-title",
  templateUrl: "./home-title.component.html",
  styleUrls: ["./home-title.component.scss"],
})
export class HomeTitleComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;

  constructor() {}

  ngOnInit() {}
}
