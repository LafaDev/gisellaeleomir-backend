"use strict";
// import AccompanyService from "./services/AccompanyService";
// import GuestSevice from "./services/GuestService";
// import UserService from "./services/UserService";
// async function main(): Promise<void>{
//     const guestCreated = await GuestSevice.create({
//         name: "Leoncio",
//         tag: "Leoncio e Familia"
//     })
//     console.log(guestCreated)
//     const accompanyCreated = await AccompanyService.create({
//         name: 'Lucio Teste',
//         guestId: guestCreated.id,
//     })
//     console.log(accompanyCreated);
//     const userFound = await AccompanyService.findById(accompanyCreated.id);
//     console.log(userFound);
//     const userCreated = await UserService.create({
//         email: 'Leomir e Gisella',
//         password: 'cubomagico'
//     })
//     console.log(userCreated);
//     const guests = await GuestSevice.findAll();
//     console.log(guests)
// }
// // main();
