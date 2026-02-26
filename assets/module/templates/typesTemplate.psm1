function typesTemplate {
    param (
        [string]$caminho
    )

    $templateInertia = @"

import { Inertia } from 'node-inertiajs';

declare module 'express-serve-static-core' {
    interface Response {
        inertia: Inertia;
    }
}

"@

    write-host  "Iniciando a criação do template Inertia.ts...`n" -ForegroundColor Yellow
}