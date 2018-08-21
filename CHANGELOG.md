# v0.0.5

* Fixes `/// <reference types="typescript-toolbelt/namespace" />` and `/// <reference types="typescript-toolbelt/global" />`.  They should now work as described in the README.
* Upgrades to TypeScript 3.0

# v0.0.4

* Adds MapKeys<T>, which Maps all keys of a type verbatim.  This preserves all keys/properties, strips invocation signatures, and merges intersections.
* Adds `ArgumentTypes` and `ConstructorArgumentTypes`; deprecates `ArgumentNType` and `ConstructorArgumentNType`.
* Adds MIT license.
* Adds `StringKeyOf<T>`, like `keyof` but returns only the strings.

# v0.0.3 ,v0.0.2, v0.0.1

* Initial releases
