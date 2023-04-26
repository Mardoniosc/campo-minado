import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Celula } from 'src/app/models/interfaces.mode';

@Component({
  selector: 'app-celula-tabuleiro',
  templateUrl: './celula-tabuleiro.component.html',
  styleUrls: ['./celula-tabuleiro.component.scss'],
})
export class CelulaTabuleiroComponent {
  @Input() celula!: Celula;
  @Output() revelar: EventEmitter<Celula> = new EventEmitter<Celula>();
  @Output() marcar: EventEmitter<Celula> = new EventEmitter<Celula>();

  onClick(): void {
    if (!this.celula.revelada && !this.celula.marcada) {
      this.revelar.emit(this.celula);
    }
  }

  onRightClick(event: MouseEvent): void {
    event.preventDefault(); // Evite que o menu de contexto padrão seja exibido
    if (!this.celula.revelada) {
      this.celula.marcada = !this.celula.marcada;
      this.marcar.emit(this.celula);
    }
  }

  getCssClasses(): { [key: string]: boolean } {
    return {
      celula: true,
      marcada: this.celula.marcada,
      revelada: this.celula.revelada,
      mina: this.celula.temMina,
      [`adj-${this.celula.minasAdjacentes}`]:
        !this.celula.temMina && this.celula.minasAdjacentes > 0,
    };
  }
}
