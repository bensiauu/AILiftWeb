import { Component, OnInit } from '@angular/core';
import {CustomDialogService} from '@dis/services/message/custom-dialog.service';
import {data} from '@dis/services/mocks/sampleDataForGrid';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {MenuService} from "@dis/services/menu/menu.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  styleUrls: ['./input-fields.component.scss']
})
export class InputFieldsComponent implements OnInit {

  constructor(private customDialog: CustomDialogService, private translate: TranslateService, private menu: MenuService) { }

  listItems: Array<string> = [
    'Baseball',
    'Basketball',
    'Cricket',
    `Field Hockey`,
    'Football',
    'Table Tennis',
    'Tennis',
    'Volleyball',
  ];
  autoCorrect = false;
  value = 5;
  dateValue: Date = new Date(2019, 5, 1, 22);
  format = 'MM/dd/yyyy HH:mm';
  terms: any;
  gender: any;
  textAreaWithColsValue: any;
  view: any[];
  myGroup: UntypedFormGroup;


  ngOnInit(): void {
    this.view = data;
    this.myGroup = new UntypedFormGroup({
      textbox: new UntypedFormControl(),
      combobox: new UntypedFormControl(),
      numerictextbox: new UntypedFormControl(),
      datetime: new UntypedFormControl(new Date()),
      checkbox: new UntypedFormControl(),
      gender: new UntypedFormControl(),
      textarea: new UntypedFormControl(),
    });
  }

  dialog(): void{
    this.customDialog.message('My Title', 'this is a good luck message',
      [{text: 'Yes', primary: true}, {text: 'No', primary: false}], 'error').subscribe(res => {
      console.log(res);
    });
  }

}
