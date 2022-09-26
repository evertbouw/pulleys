import matchers from '@testing-library/jest-dom/matchers';
import { expect } from "vitest";

expect.extend(matchers);

// gets rid of warnings about act
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
