#!/usr/bin/env pwsh
$ErrorActionPreference = 'Stop'
try {
    pushd "$PSScriptRoot/.."

    # Clean
    rm -r "./out"

    # Build
    ./node_modules/.bin/tsc --project .
    ./node_modules/.bin/ts-node --transpile-only ./scripts/preprocess.ts

    # Test
    ./node_modules/.bin/tslint --project .

} finally {
    popd
}
