$path = "c:\Portfolio\index.html"
$lines = Get-Content $path -Encoding UTF8
$part1 = $lines[0..27]
$cssLink = '<link rel="stylesheet" href="assets/css/styles.css">'
$part2 = $lines[489..795]
$jsScripts = @('<script src="assets/js/data.js"></script>', '<script src="assets/js/script.js"></script>')
$part3 = $lines[1742..($lines.Count-1)]

$newLines = $part1 + $cssLink + $part2 + $jsScripts + $part3
$newLines | Set-Content $path -Encoding UTF8
