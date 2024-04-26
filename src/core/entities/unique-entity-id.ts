import { randomUUID } from "node:crypto";

export class UniqueEntityID {
  private value: string;

  get toString() {
    return this.value;
  }

  get toValue() {
    return this.value;
  }

  constructor() {
    this.value = randomUUID();
  }
}
