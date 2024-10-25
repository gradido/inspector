import 'reflect-metadata'
import { Type } from 'class-transformer'
import { SignaturePair } from './SignaturePair'

export class SignatureMap {
  @Type(() => SignaturePair)
  public sigPair: SignaturePair[]

  constructor(sigPair: SignaturePair[]) {
    this.sigPair = sigPair
  }
}