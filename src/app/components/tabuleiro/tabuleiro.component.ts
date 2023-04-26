import { Component, OnInit } from '@angular/core';
import { Celula } from 'src/app/models/interfaces.mode';
import { JogoService } from 'src/app/services/jogo.service';

@Component({
  selector: 'app-tabuleiro',
  templateUrl: './tabuleiro.component.html',
  styleUrls: ['./tabuleiro.component.scss'],
})
export class TabuleiroComponent implements OnInit {
  celulas!: Celula[][];
  private qtdMinas: number = 10; // quantidade de minas no tabuleiro

  constructor(private jogoService: JogoService) { }

  ngOnInit(): void {
    this.inicializarTabuleiro();
    this.adicionarMinas();
    this.calcularMinasAdjacentes();
  }

  private inicializarTabuleiro(): void {
    this.celulas = [];
    for (let i = 0; i < 8; i++) {
      const linha: Celula[] = [];
      for (let j = 0; j < 8; j++) {
        linha.push({
          linha: i,
          coluna: j,
          temMina: false,
          revelada: false,
          marcada: false,
          minasAdjacentes: 0,
        });
      }
      this.celulas.push(linha);
    }
  }

  private adicionarMinas(): void {
    let minasAdicionadas = 0;
    while (minasAdicionadas < this.qtdMinas) {
      const linha = Math.floor(Math.random() * 8);
      const coluna = Math.floor(Math.random() * 8);
      if (!this.celulas[linha][coluna].temMina) {
        this.celulas[linha][coluna].temMina = true;

        minasAdicionadas++;
      }
    }
  }

  private calcularMinasAdjacentes(): void {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (!this.celulas[i][j].temMina) {
          let minasAdjacentes = 0;
          for (let k = i - 1; k <= i + 1; k++) {
            for (let l = j - 1; l <= j + 1; l++) {
              if (
                k >= 0 &&
                l >= 0 &&
                k < 8 &&
                l < 8 &&
                this.celulas[k][l].temMina
              ) {
                minasAdjacentes++;
              }
            }
          }
          this.celulas[i][j].minasAdjacentes = minasAdjacentes;
        }
      }
    }
  }

  revelarCelula(celula: Celula): void {
    if (!celula.revelada) {
      if (celula.temMina) {
        this.revelarTodasCelulas();
        this.jogadorPerdeu();

      } else {
        this.revelarCelulaERecursivas(celula);
      if (this.verificarVitoria()) {
        this.jogadorVenceu();
      }
      }
    }
  }

  private jogadorPerdeu(): void {
    this.jogoService.jogadorPerdeu();
  }

  private jogadorVenceu(): void {
    this.jogoService.jogadorWin();
  }

  private revelarCelulaERecursivas(celula: Celula): void {
    celula.revelada = true;
    if (celula.minasAdjacentes === 0) {
      for (let i = celula.linha - 1; i <= celula.linha + 1; i++) {
        for (let j = celula.coluna - 1; j <= celula.coluna + 1; j++) {
          if (
            i >= 0 &&
            j >= 0 &&
            i < this.celulas.length &&
            j < this.celulas[i].length &&
            !this.celulas[i][j].temMina &&
            !this.celulas[i][j].revelada
          ) {
            this.revelarCelulaERecursivas(this.celulas[i][j]);
          }
        }
      }
    }
  }

  private verificarVitoria(): boolean {
    let celulasComMinasNaoMarcadas = 0;
    let celulasSemMinasNaoReveladas = 0;

    for (let i = 0; i < this.celulas.length; i++) {
      for (let j = 0; j < this.celulas[i].length; j++) {
        const celula = this.celulas[i][j];
        if (celula.temMina && !celula.marcada) {
          celulasComMinasNaoMarcadas++;
        }
        if (!celula.temMina && !celula.revelada) {
          celulasSemMinasNaoReveladas++;
        }
      }
    }

    return celulasComMinasNaoMarcadas === 0 && celulasSemMinasNaoReveladas === 0;
  }

  marcarCelula(celula: Celula): void {
    console.log(celula)
    if (!this.jogoService.jogoEmAndamento || celula.revelada) {
      return;
    }

    this.celulas[celula.linha][celula.coluna].marcada = celula.marcada;
  }

  private revelarTodasCelulas(): void {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.celulas[i][j].revelada = true;
      }
    }
  }
}
