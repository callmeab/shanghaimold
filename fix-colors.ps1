$files = Get-ChildItem -Path .\src\app -Recurse -Include *.scss
foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw

    $c = $c -replace '\$primary:\s*#[0-9a-fA-F]+;', '$primary:      #1E40AF;'
    $c = $c -replace '\$secondary:\s*#[0-9a-fA-F]+;', '$secondary:    #374151;'
    $c = $c -replace '\$accent:\s*#[0-9a-fA-F]+;', '$accent:       #F59E0B;'
    $c = $c -replace '\$text:\s*#[0-9a-fA-F]+;', '$text:         #F3F4F6;'
    $c = $c -replace '\$text-muted:\s*#[0-9a-fA-F]+;', '$text-muted:   #9CA3AF;'

    # Inject bg-dark if not present
    if ($c -notmatch '\$bg-dark:') {
        $c = $c -replace '\$primary:\s*#1E40AF;', "`$primary:      #1E40AF;`r`n`$bg-dark:       #0F172A;"
    }

    # Replace host backgrounds correctly
    $c = $c -replace 'background:\s*\$primary;', 'background: $bg-dark;'
    $c = $c -replace 'background:\s*#0f172a;', 'background: $bg-dark;'

    # Gradients
    $c = $c -replace 'radial-gradient\(circle at 50% 0%,.*transparent 70%\)', 'linear-gradient(135deg, #1E40AF 0%, #0F172A 100%)'
    
    # Card glow hover
    $c = $c -replace 'box-shadow:\s*0\s+20px\s+40px\s+rgba\(0,0,0,0\.4\);', 'box-shadow: 0 0 20px rgba(245,158,11,0.2);'
    $c = $c -replace 'box-shadow: 0 0 20px rgba\(0, 0, 0, 0\.3\);', 'box-shadow: 0 0 20px rgba(245,158,11,0.2);'
    
    # Border hover replace explicitly
    $c = $c -replace 'border-color:\s*rgba\(\$accent,\s*0\.3\);', 'border-color: $accent;'
    $c = $c -replace 'border-color:\s*rgba\(255, 255, 255, 0\.3\);', 'border-color: $accent;'

    Set-Content -Path $f.FullName -Value $c
}

$htmlFiles = Get-ChildItem -Path .\src\app -Recurse -Include *.html
foreach ($html in $htmlFiles) {
    $c = Get-Content $html.FullName -Raw

    # Buttons using blue or slate -> amber
    $c = $c -replace 'bg-blue-600', 'bg-amber-500'
    $c = $c -replace 'hover:bg-blue-700', 'hover:bg-amber-600'
    $c = $c -replace 'bg-slate-900', 'bg-[#0F172A]'
    $c = $c -replace 'bg-slate-800/40', 'bg-[#374151]'
    $c = $c -replace 'text-slate-900', 'text-white'
    $c = $c -replace 'text-slate-800', 'text-white'

    Set-Content -Path $html.FullName -Value $c
}
