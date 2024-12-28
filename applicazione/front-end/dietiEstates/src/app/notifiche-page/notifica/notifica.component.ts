import { Component, Input } from '@angular/core';
import { Appuntamento } from '../../_services/backend/appuntamento.type';

@Component({
  selector: 'app-notifica',
  imports: [],
  templateUrl: './notifica.component.html',
  styleUrl: './notifica.component.scss'
})
export class NotificaComponent {
  @Input({ required: true }) notificaItem!: Appuntamento;
}
