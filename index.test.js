import assert from "assert";
import { User } from "./src/entities/User.js";
import Service from "./service.js";

// should throw an error when cpf is less than 11 characters long
{
  const params = {
    name: "Ax",
    lastname: "Poatan",
    cpf: "55555555555",
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
    { message: "user must be higher than 3 " },
    "it should throw an error with wrong user name"
  );


}

// should save user successfully
{
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
      onCreate: () => {},
      service: new Service(),
    });
  
    assert.rejects(
      () => user.create(params),
      { message: "user must be higher than 3 " },
      "it should throw an error with wrong user name"
    );
  
    
  }
