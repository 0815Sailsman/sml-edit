import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'sml-edit-textual-condition-builder',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './textual-condition-builder.component.html',
  styleUrl: './textual-condition-builder.component.css'
})
export class TextualConditionBuilderComponent {

  conditionString: string = "";

  isSyntacticallyCorrect(conditionString: string): boolean {
    return true;
  }

}
