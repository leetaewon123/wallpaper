# 사용법: powershell -ExecutionPolicy Bypass -File scripts\resize-photos.ps1
# photos-original/ 안의 사진을 가로 최대 1600px jpg로 줄여 public/works/ 에 같은 경로로 저장합니다.
# 휴대폰 사진의 회전 정보(EXIF)를 반영해 똑바로 세워서 저장합니다.
param(
  [string]$Source = "photos-original",
  [string]$Dest = "public/works",
  [int]$MaxSize = 1600,
  [int]$Quality = 82
)

Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root $Source
$dst = Join-Path $root $Dest
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

Get-ChildItem $src -Recurse -File -Include *.jpg, *.jpeg, *.png | ForEach-Object {
  $rel = $_.FullName.Substring($src.Length).TrimStart('\')
  $out = Join-Path $dst ([System.IO.Path]::ChangeExtension($rel, '.jpg').ToLower())
  New-Item -ItemType Directory -Force (Split-Path $out) | Out-Null

  $img = [System.Drawing.Image]::FromFile($_.FullName)
  try {
    # EXIF 회전 반영
    if ($img.PropertyIdList -contains 0x0112) {
      $o = $img.GetPropertyItem(0x0112).Value[0]
      $flip = @{ 2 = 'RotateNoneFlipX'; 3 = 'Rotate180FlipNone'; 4 = 'Rotate180FlipX'; 5 = 'Rotate90FlipX'; 6 = 'Rotate90FlipNone'; 7 = 'Rotate270FlipX'; 8 = 'Rotate270FlipNone' }[[int]$o]
      if ($flip) { $img.RotateFlip([System.Drawing.RotateFlipType]::$flip) }
    }
    $scale = [Math]::Min([double]1, [double]$MaxSize / [Math]::Max($img.Width, $img.Height))
    $w = [int]($img.Width * $scale); $h = [int]($img.Height * $scale)
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.DrawImage($img, 0, 0, $w, $h)
    $g.Dispose()
    $bmp.Save($out, $codec, $params)
    $bmp.Dispose()
    "{0} -> {1} ({2}x{3}, {4:N0} KB)" -f $rel, $out.Substring($root.Length + 1), $w, $h, ((Get-Item $out).Length / 1KB)
  } finally {
    $img.Dispose()
  }
}
