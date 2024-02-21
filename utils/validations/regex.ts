const alOnly: RegExp = /^[a-zA-Z]+$/
const alNum: RegExp = /^[a-zA-Z0-9]+$/
const alNumSymOnly: RegExp = /^[a-zA-Z0-9!@#$%^&*.?]+$/
const alNumSymSpaceOnly: RegExp = /^[a-zA-Z0-9!@#$%^&*.? ]+$/
const numOnly: RegExp = /^\d+$/
const containCapital: RegExp = /^(?=.*[A-Z])/
const containSymbol: RegExp = /^(?=.*[!@#$%^&*.?])/
const telFormat: RegExp = /^(?:\+\d{1,3}\s?)?(?:\(\d{1,4}\)\s?)?\d{1,15}$/
const emailFormat: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const numDecimal: RegExp = /^\d+(\.\d{1,2})?$/

export {
  alOnly,
  alNum,
  alNumSymOnly,
  numOnly,
  containCapital,
  containSymbol,
  telFormat,
  emailFormat,
  alNumSymSpaceOnly,
  numDecimal
}