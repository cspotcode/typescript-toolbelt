#!/usr/bin/env pwsh
$ErrorActionPreference = 'Stop'
function main() {
    # Clean
    if(test-path out) {rm -r "./out"}

    # Build
    exec { ./node_modules/.bin/tsc --project . }
    exec { ./node_modules/.bin/ts-node --transpile-only ./scripts/preprocess.ts }

    # Test
    exec { ./node_modules/.bin/tslint --project . }
    exec { ./node_modules/.bin/mocha -r ts-node/register  ./src/__test__/main.spec.ts }

    # Generate docs
    # NOTE this one does not support TS 2.8 or 2.9
    # exec { ./node_modules/.bin/typedoc --project . --out docs }
    # NOTE this one requires a pure-JSON tsconfig
    # exec { ./node_modules/.bin/ts-docs-gen --config ./docs-gen.json }
    # NOTE this one is broken on windows and emits ugly output
    # exec { ./node_modules/.bin/tygen generate . --out docs --with @tygen/html }
}
function exec($block) {
    & $block
    if($LASTEXITCODE -ne 0) { throw "Non-zero exit code $LASTEXITCODE" }
}
try {
    pushd "$PSScriptRoot/.."
    main
} finally {
    popd
}
