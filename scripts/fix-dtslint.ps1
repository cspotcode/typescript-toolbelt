#!/usr/bin/env pwsh

# dtslint uses typescript@next to traverse ASTs, but 3.0's traversal appears to be incompatible with 2.9.

# Fix is to make dtslint use the same Typescript version as everything else

rm -r $PSScriptRoot/../node_modules/dtslint/node_modules/typescript
