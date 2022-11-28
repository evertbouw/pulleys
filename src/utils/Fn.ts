/** just a generic function type */
export type Fn<In extends unknown[], Out> = (...data: In) => Out;
