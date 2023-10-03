// // instruction 1
// // const a ={};

// // await async api call

// // api.call.variable


// // const a = 10;
// // const b = 20;

// // const fun = (a, b) => {
// //     // const a = 1;
// //     // const b = 2;
// //     a = 100;
// //     b = 10000;
// //     console.log(a,b);
// // }
// // fun(a,b);
// // console.log(a,b);

// // const c = a;

// // const obj2 = {...obj};
// // console.log(obj);
// // console.log(obj2);
// // obj2.a = 100;
// // obj2.b.c = 2000;
// // console.log(obj2);
// // console.log(obj);


// const obj = {a: 1, b: {c: 2}};
// console.log(obj);
// function fun(obj) {
//     const replica = {};
//     const keys = Object.keys(obj);
//     for (let key of keys) {
//         // console.log(key, obj[key], typeof obj[key]);
//         if (typeof obj[key] == "object") {
//             // console.log('in if');
//             replica[key] = fun(obj[key]);
//         }
//         replica[key] = obj[key];
//     }
//     console.log(replica);
//     return replica;
// }
// const replica = fun(obj);
// console.log(replica === obj);
// replica.b.c = 100;

// console.log(replica);
// console.log(obj);


// .  Required ,  Partial ,  Omit ,  Record ,
// You4:19 PM
// Record<any,any>
// {}
// Ansuman Mohanty4:20 PM
// extends, keyof, infer
// Ansuman Mohanty4:22 PM
// // @ts-ignore
// // @ts-expect-error