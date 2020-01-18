const either = <T1>(funcA: (a: T1) => boolean, funcB: (a: T1) => boolean) => (
  arg: T1
) => funcA(arg) || funcB(arg);

const both = <T1>(funcA: (a: T1) => boolean, funcB: (a: T1) => boolean) => (
  arg: T1
) => funcA(arg) && funcB(arg);

interface Person {
  age: number;
  birthCountry: string;
  naturalizarionDate: Date;
}

const OUR_COUNTRY = "Ireland";
const wasBornInCountry = (person: Person) =>
  person.birthCountry === OUR_COUNTRY;
const wasNaturalized = (person: Person) => Boolean(person.naturalizarionDate);
const isOver18 = (person: Person) => person.age >= 18;

// Point-free style
const isCitizen = either(wasBornInCountry, wasNaturalized);
const isEligibleToVote = both(isOver18, isCitizen);

console.log(
  isEligibleToVote({
    age: 27,
    birthCountry: "Ireland",
    naturalizarionDate: new Date()
  })
);
