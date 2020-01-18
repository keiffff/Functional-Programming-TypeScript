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

const replace = (f: string, r: string) => (s: string) => s.split(f).join(r);

const trimCapitalizeAndReplace = compose(trimAndCapitalize, replace("/", "-"));

console.log(trimCapitalizeAndReplace("  13/feb/1989 "));
