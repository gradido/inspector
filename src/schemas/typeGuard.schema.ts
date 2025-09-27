import * as v from 'valibot'


/**
 * type guard for hex string of length 64 (binary size = 32)
 * create with `v.parse(hex32Schema, '39568d7e148a0afee7f27a67dbf7d4e87d1fdec958e2680df98a469690ffc1a2')`
 * or `v.parse(hex32Schema, MemoryBlock.fromHex('39568d7e148a0afee7f27a67dbf7d4e87d1fdec958e2680df98a469690ffc1a2'))`
 * hex32 is a hex string of length 64 (binary size = 32)
 */
declare const validHex32: unique symbol
export type Hex32 = string & { [validHex32]: true }

export const hex32Schema = v.pipe(
  v.pipe(
    v.string('expect string type'),
    v.hexadecimal('expect hexadecimal string'),
    v.length(64, 'expect string length = 64'),
  ),
  v.transform<string, Hex32>((input: string) => input as Hex32),
)

declare const validHex64: unique symbol
export type Hex64 = string & { [validHex64]: true }

export const hex64Schema = v.pipe(
  v.pipe(
    v.string('expect string type'),
    v.hexadecimal('expect hexadecimal string'),
    v.length(128, 'expect string length = 128'),
  ),
  v.transform<string, Hex64>((input: string) => input as Hex64),
)