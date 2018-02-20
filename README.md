# JSON to TypeScript interface

With this package a JSON string can be converted to a TypeScript interface definition.

## Usage

```typescript
const result: Node = parse(json, 'root');
const structures: StructureResult = structure(result);
const output: string = compile(structures.structures);

```
 