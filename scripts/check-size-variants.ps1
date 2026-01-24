# Size Variant Checker - Automated Script
# Checks all components for missing or broken medium size classes
# Usage: .\check-size-variants.ps1

$componentPath = "packages\dyn-ui-react\src\components"
$results = @()

Write-Host "Checking Size Variants in Components..." -ForegroundColor Cyan
Write-Host ""

# Find all components with size prop
$componentsWithSize = Get-ChildItem -Path $componentPath -Recurse -Filter "*.types.ts" |
    Select-String -Pattern "size\?:" |
    Select-Object -ExpandProperty Path -Unique

foreach ($typesFile in $componentsWithSize) {
    $componentName = Split-Path (Split-Path $typesFile -Parent) -Leaf
    $cssFile = Join-Path (Split-Path $typesFile -Parent) "$componentName.module.css"
    
    if (-not (Test-Path $cssFile)) {
        continue
    }
    
    $cssContent = Get-Content $cssFile -Raw
    
    # Check for medium size variants
    $hasSizeMedium = $cssContent -match '\.sizeMedium\s*\{'
    $hasSizeMd = $cssContent -match '\.sizeMd\s*\{'
    $hasSizeM = $cssContent -match '\.sizeM\s*\{'
    $hasInputMedium = $cssContent -match '\.input--medium\s*\{'
    $hasBadgeMd = $cssContent -match '\.badgeMd\s*\{'
    
    $hasMedium = $hasSizeMedium -or $hasSizeMd -or $hasSizeM -or $hasInputMedium -or $hasBadgeMd
    
    # Check for circular references
    $hasCircular = $cssContent -match '--[\w-]+:\s*var\(--[\w-]+,\s*var\(--[\w-]+'
    
    # Determine status
    $status = "[OK]"
    $message = "All size variants OK"
    
    if (-not $hasMedium) {
        $status = "[WARN]"
        $message = "Missing medium size class"
    }
    elseif ($hasCircular) {
        $status = "[ERROR]"
        $message = "Potential circular reference detected"
    }
    
    # Check if medium class is empty (only has color: inherit or similar)
    if ($hasMedium) {
        if ($cssContent -match '\.size(Medium|Md|M)\s*\{\s*(color:\s*inherit;\s*)?\}') {
            $status = "[ERROR]"
            $message = "Empty medium class (no size properties)"
        }
    }
    
    $results += [PSCustomObject]@{
        Component = $componentName
        Status = $status
        Message = $message
    }
}

# Display results
$results | Sort-Object Status, Component | ForEach-Object {
    $color = switch ($_.Status) {
        "[OK]" { "Green" }
        "[WARN]" { "Yellow" }
        "[ERROR]" { "Red" }
        default { "White" }
    }
    
    Write-Host "$($_.Status) $($_.Component) - $($_.Message)" -ForegroundColor $color
}

Write-Host ""

# Summary
$totalComponents = $results.Count
$okComponents = ($results | Where-Object { $_.Status -eq "[OK]" }).Count
$warningComponents = ($results | Where-Object { $_.Status -eq "[WARN]" }).Count
$errorComponents = ($results | Where-Object { $_.Status -eq "[ERROR]" }).Count

Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Total components checked: $totalComponents"
Write-Host "  [OK]: $okComponents" -ForegroundColor Green
Write-Host "  [WARN]: $warningComponents" -ForegroundColor Yellow
Write-Host "  [ERROR]: $errorComponents" -ForegroundColor Red

# Exit code
if ($errorComponents -gt 0) {
    Write-Host ""
    Write-Host "Size variant check FAILED - Please fix errors above" -ForegroundColor Red
    exit 1
}
elseif ($warningComponents -gt 0) {
    Write-Host ""
    Write-Host "Size variant check completed with warnings" -ForegroundColor Yellow
    exit 0
}
else {
    Write-Host ""
    Write-Host "All size variants OK!" -ForegroundColor Green
    exit 0
}
