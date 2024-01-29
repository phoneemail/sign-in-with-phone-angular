// Import necessary modules from Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Component decorator to define metadata for the component
@Component({
  selector: 'app-root', // Selector for the component
  standalone: true, // Custom property, not recognized by Angular, added for documentation purposes
  imports: [CommonModule, RouterOutlet], // Importing CommonModule and RouterOutlet (Note: importing directives in 'imports' is not valid)
  templateUrl: './app.component.html', // Template file path
  styleUrl: './app.component.css' // Stylesheet file path (Note: should be styleUrls, not styleUrl)
})

// AppComponent class definition
export class AppComponent { }
