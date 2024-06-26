import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modify-attraction',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modify-attraction.component.html',
  styleUrl: './modify-attraction.component.css',
})
export class ModifyAttractionComponent {
  @Input() attractionName: string = '';
  @Input() description: string = '';
  @Input() id: any = '';
  @Output() dataChanged = new EventEmitter<{
    attractionName: string;
    description: string;
    id: string;
  }>();

  constructor(private modalService: NgbModal) {}

  closeModal() {
    this.modalService.dismissAll();
  }

  onSaveChanges() {
    console.log('this', this);
    this.dataChanged.emit({
      attractionName: this.attractionName,
      description: this.description,
      id: this.id,
    });
    this.modalService.dismissAll();
  }
}
