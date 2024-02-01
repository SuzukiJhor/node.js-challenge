import { EventEmitter } from "events";

export default class User {
  constructor({ onCreate, service }) {
    this.service = service;
    this.source = new EventEmitter();
    this.source.on("create", onCreate);
  }

  #isValid(data) {
    if (data.cpf.length < 11) {
      throw new Error('the CPF number must be greater than 10 digits');
    }
  }

  #upperCaseStrings(data) {
    const finalObject = Reflect.ownKeys(data)
      .map((key) => {
        const item = data[key];
        return {
          [key]: typeof item === "string" ? item.toUpperCase() : item,
        };
      })
      .reduce((prev, next) => {
        return {
          ...prev,
          ...next,
        };
      }, {});

    return finalObject;
  }

  async create(data) {
    this.#isValid(data);
    const mappedObj = this.#upperCaseStrings(data);
    console.log({ mappedObj });
    const message = await this.service.save(mappedObj);
    this.source.emit("create", mappedObj);
    return message.toUpperCase();
  }
}
