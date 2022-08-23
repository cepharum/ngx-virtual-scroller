import {Component, Input} from '@angular/core';
import { ListItem, ListItemComponent } from './list-item.component';
import { Chance } from 'chance';

@Component({
  selector: 'app-base-list',
  template: '',
})
// tslint:disable-next-line:component-class-suffix
export abstract class BaseList {

  @Input()
  public get items(): ListItem[]
  {
	  return this._items;
  }
  public set items(value: ListItem[])
  {
	  this._items = value;
	  this.setToFullList();
  }

  constructor() {
    this.setToFullList();
  }

  public static index = 0;
  public static chance = new Chance(0); // 0 = seed for repeatability
  protected _items: ListItem[];

  public ListItemComponent = ListItemComponent;
  public randomSize = false;

  public filteredList: ListItem[];
  public static generateRandomItem(): ListItem {
	  return {
		  id: BaseList.chance.guid(),
		  index: BaseList.index++,
		  name: BaseList.chance.name(),
		  gender: BaseList.chance.gender(),
		  age: BaseList.chance.age(),
		  email: BaseList.chance.email(),
		  phone: BaseList.chance.phone(),
		  address: BaseList.chance.address() + ', ' + BaseList.chance.city() + ', ' + BaseList.chance.state() + ', ' + BaseList.chance.zip(),
		  company: BaseList.chance.company()
	  };
  }

  public static generateMultipleRandomItems(count: number): ListItem[] {
	  const result = Array(count);
  	  for (let i = 0; i < count; ++i) {
		  result[i] = BaseList.generateRandomItem();
	  }

	  return result;
  }

  public prependItems(): void {
	  this.filteredList.unshift.apply(this.filteredList, BaseList.generateMultipleRandomItems(10));
  }

  public appendItems(): void {
	  this.filteredList.push.apply(this.filteredList, BaseList.generateMultipleRandomItems(10));
  }

  public reduceListToEmpty() {
    this.filteredList = [];
  }

  public reduceList() {
    this.filteredList = this.filteredList.slice(0, 100);
  }

  public sortByName() {
    this.filteredList.sort((a, b) => -(a.name < b.name) || +(a.name !== b.name));
  }

  public sortByIndex() {
    this.filteredList.sort((a, b) => -(a.index < b.index) || +(a.index !== b.index));
  }

  public setToFullList() {
    this.filteredList = [].concat(this.items || []) || [];
  }
}
