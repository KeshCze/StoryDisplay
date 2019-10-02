import {Component, NgModule,Input,ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {AlertComponent} from './alert.component';
import JSONStory from '../assets/story.json';

@Component({
  selector: 'app-root',
  template: `
    <template #alertContainer></template>
    <button (click)="beginBegin()">Create success alert</button>
  `,
})
export class App {
 @ViewChild("alertContainer", {static:false, read: ViewContainerRef }) container;
 componentRef: ComponentRef<AlertComponent>;
 private start = "46cb00d8-fd07-4b07-942d-7b0604cd53d1";


  constructor(private resolver: ComponentFactoryResolver) {}

  beginBegin(){
    this.begin(this.findRoot());
  }

  begin(elementicek){
    if(elementicek)
    {
      this.createComponent(elementicek);
      elementicek.options.forEach(x => {
        if(x){
          this.begin(this.findNode(x));
        }
      });
    }
    console.log(elementicek);
  }

  createComponent(element) {
    //this.container.clear();
    const factory: ComponentFactory<AlertComponent> = this.resolver.resolveComponentFactory(AlertComponent);

    this.componentRef = this.container.createComponent(factory);
    //console.log(element);
    this.componentRef.instance.ID = element.id;

    //this.componentRef.instance.output.subscribe(event => console.log(event));

  }
  
  ngOnDestroy() {
    this.componentRef.destroy();    
  }

  findRoot(){
    return JSONStory.find(elmnt => elmnt.id === this.start)
  }

  findNode(nodeToCompare){
    return JSONStory.find(elmnt => elmnt.id === nodeToCompare)
  }
}
