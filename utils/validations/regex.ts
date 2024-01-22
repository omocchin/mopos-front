const alNumSymOnly: RegExp = /^[a-zA-Z0-9!@#$%^&*.?]+$/
const alNumSymSpaceOnly: RegExp = /^[a-zA-Z0-9!@#$%^&*.? ]+$/
const numOnly: RegExp = /^\d+$/
const containCapital: RegExp = /^(?=.*[A-Z])/
const containSymbol: RegExp = /^(?=.*[!@#$%^&*.?])/
const telFormat: RegExp = /^(?:\+\d{1,3}\s?)?(?:\(\d{1,4}\)\s?)?\d{1,15}$/
const emailFormat: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export {
  alNumSymOnly,
  numOnly,
  containCapital,
  containSymbol,
  telFormat,
  emailFormat,
  alNumSymSpaceOnly
}