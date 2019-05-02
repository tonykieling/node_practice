myFunc = (argm) => {
  return new Promise((res, rej) => {
    console.log('Inside promise');
    if (argm) res("It's true")
      rej("FALSE");
  });
}

secFunc = (argm) => {
  return new Promise((res, rej) => {
    console.log('Inside 2nd promise');
    if (argm) res("Second true")
      rej("2ndFALSE");
  });
}

async function otherF() {
  try {
    let msg = await myFunc(true);
    console.log("msg= " + msg);
    console.log("XYZ");
    let second = await secFunc(false);
    console.log(second);
  } catch (err) {
    console.log("err= " + err)
  }
}
otherF()
// myFunc(true)
//   .then((message) => {
//     console.log("Message is " + message)
//     return ('hi')
//   })
//   .then((om) => {
//     console.log("Another message: " + om)
//     return("new hi")
//   })
//   .catch((err) => console.log("Error: " + err))
