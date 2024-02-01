import assert, { deepStrictEqual } from "assert";
import  User  from "./src/entities/User.js";
import Service from "./service.js";

//should throw an error when cpf is less than 11 characters long
{
  const params = {
    name: "alex",
    lastname: "Poatan",
    cpf: "5555555555",
    cnpj: "55555555555",
    email: "alex@email.com",
    password: "123456",
    businessman: false,
  };

  const user = new User({
    onCreate: () => {},
    service: new Service(),
  });

  assert.rejects(
    () => user.create(params),
    { message: "the CPF number must be greater than 10 digits" },
    "it should throw an error with wrong cpf number"
  );

}

// should save user successfully
{
  (async () => {
    const params = {
      name: "Alex",
      lastname: "Poatan",
      cpf: "55555555555",
      cnpj: "55555555555",
      email: "alex@email.com",
      password: "123456",
      businessman: false,
    };

    const user = new User({
      onCreate: (msg) => console.log("chamou onCreate", msg),
      service: new Service(),
    });

    const result = await user.create(params);
  })();
}
