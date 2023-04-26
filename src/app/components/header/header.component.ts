import { Component, OnInit } from '@angular/core';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  jogoEmAndamento!: boolean;
  jogadorVenceu!: boolean;
  mensagemStatus!: string;

  constructor(private jogoService: JogoService) {}

  ngOnInit(): void {
    this.inicializarJogo();
    this.jogoService.mensagemStatus.subscribe((status) => {
      this.mensagemStatus = status;
      if (status !== 'Jogo em andamento') {
        this.jogoEmAndamento = false;
      }
    });
  }

  private inicializarJogo(): void {
    this.jogoService.reiniciarJogo();
    this.jogoEmAndamento = this.jogoService.jogoEmAndamento;
    this.jogadorVenceu = this.jogoService.jogadorVenceu;
    this.mensagemStatus = this.jogoService.mensagemStatus.getValue();
  }

  reiniciarJogo(): void {
    this.inicializarJogo();
  }

  onCelulaRevelada(): void {
    if (!this.jogoEmAndamento) {
      return;
    }

    if (this.jogadorVenceu) {
      this.mensagemStatus = this.jogoService.mensagemStatus.getValue();
    } else if (!this.jogoEmAndamento) {
      this.mensagemStatus = this.jogoService.mensagemStatus.getValue();
    }
  }
}
