const trim = (s: string) => s.trim();
const capitalize = (s: string) => s.toUpperCase();

const compose = <T1, T2, T3>(f: (x: T2) => T3, g: (x: T1) => T2) => (x: T1) =>
  f(g(x));

// const trimAndCapitalize = (s: string) => capitalize(trim(s));
const trimAndCapitalize = compose(trim, capitalize);

const composeMany = <T>(...functions: Array<(args: T) => T>) => (arg: any) =>
  functions.reduce((prev, curr) => {
    return curr(prev);
  }, arg);

function curry3<T1, T2, T3, T4>(fn: (a: T1, b: T2, c: T3) => T4) {
  return (a: T1) => (b: T2) => (c: T3) => fn(a, b, c);
}

const replace = (s: string, f: string, r: string) => s.split(f).join(r);

const curriedReplace = curry3(replace);

const replaceForwardSlashWithDash = replace.bind(replace, "/", "-");

const trimCapitalizeAndReplaceByCurry = compose(
  trimAndCapitalize,
  curriedReplace("/")("-")
);

const trimCapitalizeAndReplaceByBind = compose(
  trimAndCapitalize,
  replaceForwardSlashWithDash
);

console.log(trimCapitalizeAndReplaceByCurry("  13/feb/1989 "));
console.log(trimCapitalizeAndReplaceByBind("  13/feb/1989 "));
