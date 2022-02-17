#!/bin/bash

endpoint=kanyakumari.strandls.com

microservices=("cca")

for m in "${microservices[@]}"; do
    npx dtsgen -o "src/interfaces/$m.ts" --url "https://$endpoint/$m-api/api/swagger.json" -c dtsgen.json

    # this will remove unnecessary namespaces in Paths
    sed -i '/declare namespace Paths/,$d' "src/interfaces/$m.ts"
    sed -i 's|declare interface|export interface|g' "src/interfaces/$m.ts"
done

npx prettier --write "src/interfaces/*.ts"
