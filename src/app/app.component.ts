import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unit-test-example';
  showComponent = false;
  buttonLabel = "Load Component";

  toggleComponent() {
    this.showComponent = !this.showComponent;
    this.buttonLabel = this.showComponent ? "Unload Component" : "Load Component";
  }
}
