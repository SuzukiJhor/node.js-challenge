import assert, { deepStrictEqual } from "assert";
import  User  from "./src/entities/User.js";
import Service from "./service.js";


const callTracker = new assert.CallTracker()

//quanto o programa terminar valdia todas as chamadas
process.on('exit', ()=> callTracker.verify())

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
      id: 1,
      name: "Alex",
      lastname: "Poatan",
      cpf: "55555555555",
      cnpj: "55555555555",
      email: "alex@email.com",
      password: "123456",
      businessman: false,
    };

    //serviceStub = impedir que seja ONLINE
    const spy = callTracker.calls(1)
    const serviceStub = {
      async save(params) {
        //espiona a função
        spy(params)
        return `${params.id} saved with success!`
      }
    }

    const spyOnCreate = callTracker.calls(1)
    const onCreate= (msg)=>{
      spyOnCreate(msg)
      assert.deepStrictEqual(msg.id, params.id, 'id should be the same')
    }

    const user = new User({
      onCreate: onCreate,
      service: serviceStub
    });

    const result = await user.create(params);
    
    assert.deepStrictEqual(result, `${params.id} SAVED WITH SUCCESS!`)
  })();
}
