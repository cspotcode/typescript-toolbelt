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
