import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  private _jogoEmAndamento: boolean;
  private _jogadorVenceu: boolean;
  private _mensagemStatus: BehaviorSubject<string>;

  constructor() {
    this._jogoEmAndamento = false;
    this._jogadorVenceu = false;
    this._mensagemStatus = new BehaviorSubject<string>('Jogo em andamento');
  }

  get jogoEmAndamento(): boolean {
    return this._jogoEmAndamento;
  }

  set jogoEmAndamento(value: boolean) {
    this._jogoEmAndamento = value;
  }

  get jogadorVenceu(): boolean {
    return this._jogadorVenceu;
  }

  set jogadorVenceu(value: boolean) {
    this._jogadorVenceu = value;
  }

  get mensagemStatus(): BehaviorSubject<string> {
    return this._mensagemStatus;
  }

  reiniciarJogo(): void {
    this._jogoEmAndamento = true;
    this._jogadorVenceu = false;
    this._mensagemStatus.next('Jogo em andamento');
  }

  jogadorPerdeu(): void {
    this._jogoEmAndamento = false;
    this._mensagemStatus.next('Você perdeu');
  }

  jogadorWin(): void {
    this._jogoEmAndamento = false;
    this._jogadorVenceu = true;
    this._mensagemStatus.next('Você venceu!');
  }
}
